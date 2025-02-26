import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { useMst } from '@/models/Root';

import { LoanApplication, POSLayout } from '@/components';

export const BridgePage: FC = observer(() => {
  const {
    applicationForm: { applicationType },
  } = useMst();

  return (
    <>
      <POSLayout scene={'application'}>
        <LoanApplication
          applicationType={applicationType}
          productCategory={'bridge'}
        />
      </POSLayout>
    </>
  );
});
