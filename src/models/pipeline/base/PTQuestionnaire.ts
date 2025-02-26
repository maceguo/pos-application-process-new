import {
  cast,
  getSnapshot,
  Instance,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { validate } from 'validate.js';

import { UploadData } from '@/models/common/UploadFile';
import { PQOwnerData, SPQOwnerData } from './PQOwner';

import {
  PipelineQuestionnaire,
  PipelineQuestionnaireOwner,
  PipelineTaskItem,
  PipelineTaskItemStatus,
  PipelineTaskKey,
  PipelineTaskName,
} from '@/types/pipeline';

import { CreditScoreSchema } from '@/constants';
import { format } from 'date-fns';

export const PTQuestionnaire = types
  .model({
    taskId: types.maybe(types.string),
    taskName: PipelineTaskName[PipelineTaskKey.BQ],
    taskStatus: types.maybe(
      types.union(
        types.literal(PipelineTaskItemStatus.UNFINISHED),
        types.literal(PipelineTaskItemStatus.FINISHED),
        types.literal(PipelineTaskItemStatus.CONFIRMED),
      ),
    ),
    taskForm: types.model({
      documentFile: types.maybe(UploadData),
      licenses: types.array(PQOwnerData),
    }),
  })
  .views((self) => ({
    get checkTaskFormValid() {
      return !!self.taskForm.documentFile && !!this.checkLicensesValid;
    },
    get checkLicensesValid() {
      const {
        taskForm: { licenses },
      } = self;
      return (
        !!licenses.length &&
        licenses.some((item) => {
          const result = validate(
            { ssn: item.ssn, dateOfBirth: item.birthday },
            {
              ssn: CreditScoreSchema.selfInfo.ssn,
              dateOfBirth: CreditScoreSchema.selfInfo.dateOfBirth,
            },
          );
          return !result && Object.values(item).find((value) => !!value);
        })
      );
    },
    checkArrayIsValid(item: SPQOwnerData) {
      for (const [, value] of Object.entries(item)) {
        if (!value) {
          return false;
        }
      }
      return true;
    },
  }))
  .actions((self) => {
    return {
      injectPipelineTaskData(data: PipelineTaskItem<PipelineQuestionnaire>) {
        if (!data) {
          return;
        }
        const { taskName, taskId, taskStatus, taskForm } = data;
        self.taskName = taskName;
        self.taskId = taskId;
        self.taskStatus = taskStatus;
        if (!taskForm) {
          return;
        }
        const { documentFile } = taskForm;
        self.taskForm.documentFile = documentFile;
        if (taskForm?.licenses) {
          taskForm?.licenses.forEach((item) => {
            item.birthday = new Date(item.birthday);
          });
          self.taskForm.licenses = cast(
            taskForm?.licenses as unknown as SPQOwnerData[],
          );
        }
      },
      changeFieldValue<K extends keyof typeof self.taskForm>(
        key: K,
        value: (typeof self.taskForm)[K],
      ) {
        self.taskForm[key] = value;
      },
      changeLicensesFieldValue<K extends keyof SPQOwnerData>(
        key: keyof SPQOwnerData,
        value: SPQOwnerData[K],
        index: number,
      ) {
        self.taskForm.licenses[index][key] = value;
      },
      addLicenses(owner: SPQOwnerData) {
        self.taskForm.licenses.push(owner);
      },
      removeLicenses(index: number) {
        self.taskForm.licenses.splice(index, 1);
      },
      getGenerateFileData() {
        const {
          taskId,
          taskForm: { licenses },
        } = self;
        const newLicenses = JSON.parse(JSON.stringify(licenses));
        newLicenses.forEach((item: PipelineQuestionnaireOwner) => {
          item.birthday = format(item.birthday as Date, 'yyyy-MM-dd O');
        });

        return {
          taskId,
          licenses: newLicenses,
        };
      },
      getPostData() {
        const { taskId } = self;
        const licenses = JSON.parse(JSON.stringify(self.taskForm.licenses));
        licenses.forEach((item: PipelineQuestionnaireOwner) => {
          item.birthday = format(item.birthday as Date, 'yyyy-MM-dd O');
        });
        return {
          taskId,
          taskForm: {
            licenses: licenses,
            documentFile: self.taskForm.documentFile
              ? getSnapshot(self.taskForm.documentFile)
              : undefined,
          },
        };
      },
    };
  });

export type IPTQuestionnaire = Instance<typeof PTQuestionnaire>;
export type SPTQuestionnaire = SnapshotOut<typeof PTQuestionnaire>;
