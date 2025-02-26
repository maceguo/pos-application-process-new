import { get, post, put } from '../axios';
import { RatesProductData } from '@/types/dashboard';
import {
  BPEstimateRateData,
  BREstimateRateData,
  MortgagePropertyNewData,
  MortgageStartingData,
  MRStartingData,
} from '@/types/application';

export const _fetchRatesProduct = (processInsId = '') => {
  return get(`/dashboard/rate/${processInsId}/all`);
};

export const _fetchRatesProductSelected = (processInsId = '') => {
  return get<RatesProductData>(`/dashboard/rate/${processInsId}/my`);
};

type FetchProductMapPreviewQueryData =
  | MPQueryData
  | MRQueryData
  | BPQueryData
  | BRQueryData;

export type MPQueryData = MortgagePropertyNewData &
  Partial<
    Pick<MortgageStartingData, 'propertyOpt' | 'numberOfUnits' | 'propAddr'>
  >;

export type MRQueryData = Pick<MRStartingData, 'homeValue'> & {
  taxAndInsurance: string;
  upfrontCost: string;
};

export type BPQueryData = BPEstimateRateData;

export type BRQueryData = BREstimateRateData;

export const _fetchRatesProductPreview = (
  processInsId = '',
  postData: FetchProductMapPreviewQueryData,
) => {
  return post(`/dashboard/rate/${processInsId}/all/preview`, postData);
};

export type UpdateRatesPostData = Partial<
  Pick<RatesProductData, 'id'> & {
    queryParams: FetchProductMapPreviewQueryData;
  }
>;

export const _updateRatesProductSelected = (
  processInsId = '',
  postData: UpdateRatesPostData,
) => {
  return put(`/dashboard/rate/${processInsId}`, postData);
};

export const _fetchRatesLoanInfo = (processInsId = '') => {
  return get(`/dashboard/rate/${processInsId}/info`);
};
