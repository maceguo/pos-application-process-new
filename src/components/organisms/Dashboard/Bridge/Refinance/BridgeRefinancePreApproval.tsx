// import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
// import {
//   Box,
//   Dialog,
//   DialogContent,
//   FormControlLabel,
//   makeStyles,
// } from '@material-ui/core';
// import { useAsyncFn } from 'react-use';

// import { observer } from 'mobx-react-lite';
// import { useMst } from '@/models/Root';
// import { useAsyncEffect, useSwitch } from '@/hooks';

// import { utils } from '@/common/utils';
// import { Address, IAddress } from '@/models/modules';
// import { useBackBtnClasses, useNextBtnClasses } from '@/common/classes';
// import { POSFlex, POSFont, size } from '@/common/styles/global';
// import { PropertyOpt, UnitOpt } from '@/types/options';
// import { BREstimateRateData } from '@/types/variable';
// import {
//   PreApprovalLetterBRData,
//   RatesProductData,
// } from '@/types/dashboardData';
// import {
//   _fetchPreApprovedLetterCheck,
//   _fetchPreApprovedLetterInfo,
//   _updateRatesProductSelected,
// } from '@/requests/dashboard';
// import {
//   StyledButton,
//   StyledCheckbox,
//   StyledLoading,
//   StyledTextFieldNumber,
//   Transitions,
// } from '@/components/atoms';
// import { PreApprovalEdit, PreApprovalInfo } from '@/components/molecules';
// import { useRouter } from 'next/router';
// import { LoanStage, UserType } from '@/types/enum';

// const useStyles = makeStyles({
//   formRow: {
//     ...POSFlex('flex-start', 'space-between', 'row'),
//     gap: 50,
//     marginBlockEnd: 24,
//     '& > *': {
//       flex: 1,
//     },
//     '& > :last-child:nth-child(2)': {
//       flex: 0.4545,
//     },
//   },
//   checkbox: {
//     ...POSFlex('center', 'flex-start', 'row'),
//     ...POSFont(16, 400, 1.5, 'rgba(0,0,0,.87)'),
//     marginLeft: 0,
//     marginBottom: 24,
//     width: 400,
//     cursor: 'pointer',
//     userSelect: 'none',
//   },
//   resultBox: {
//     ...POSFont(16, 400, 1.5, '#3F51B5'),
//     marginBlockStart: 24,
//     marginBlockEnd: 48,
//     background: '#F5F8FA',
//     width: 904,
//     padding: 24,
//     borderRadius: 8,
//   },
//   dialogPaper: {
//     maxWidth: 500,
//     borderRadius: 8,
//   },
//   dialogContent: {
//     lineHeight: 1.5,
//     textAlign: 'center',
//     '&, &:first-child': {
//       padding: 48,
//     },
//   },
//   updatedImage: {
//     display: 'inline-block',
//     width: 192,
//     height: 160,
//     marginBlockEnd: 24,
//     background:
//       'url(/PreapprovalLetter/letter-1.png) no-repeat center / contain',
//   },
//   updatedTip: {
//     ...POSFont(16, 700, 1.5, 'rgba(0, 0, 0, 0.87)'),
//     paddingInline: 60,
//     fontSize: 24,
//   },
//   updatedActions: {
//     display: 'flex',
//     gap: 9,
//     marginBlockStart: 48,
//     '& > *': {
//       flex: 1,
//     },
//   },
//   secondButton: {
//     ...POSFont(16, 700, 1.5, '#ffffff'),
//     textTransform: 'none',
//     background: '#7B96B5',
//     minWidth: 200,
//     height: 50,
//     borderRadius: 8,
//     '&:hover': {
//       background: '#446B99',
//     },
//   },
// });

// export const BridgeRefinancePreApproval: FC = observer(() => {
//   const {
//     userSetting: {
//       setting: { lastSelectedProcessId },
//     },
//     userType,
//   } = useMst();

//   const router = useRouter();

//   const classes = useStyles();
//   const nextButtonClasses = useNextBtnClasses();
//   const backButtonClasses = useBackBtnClasses();

//   const { open, visible, close } = useSwitch(false);

//   const [loanStage, setLoanStage] = useState<LoanStage>(LoanStage.PreApproved);
//   const [loanAmount, setLoanAmount] = useState<number>();
//   const [tableStatus, setTableStatus] = useState<'edit' | 'view'>('view');
//   const [propertyUnit, setPropertyUnit] = useState<UnitOpt>(UnitOpt.default);
//   const [propertyType, setPropertyType] = useState<PropertyOpt>(
//     PropertyOpt.default,
//   );
//   const [address, setAddress] = useState<IAddress>();
//   const [rateData, setRateData] = useState<BREstimateRateData>();

//   const [LTVError, setLTVError] = useState<string>('');
//   const [LTCError, setLTCError] = useState<string>('');

//   const [productData, setProductData] = useState<RatesProductData>();

//   const [checkResult, setCheckResult] = useState<unknown>();
//   const [checkLoading, setCheckLoading] = useState<boolean>(false);

//   const editLoanAmount = useMemo(() => {
//     let total = rateData?.balance || 0;
//     if (rateData?.isCor) {
//       total += rateData?.cor || 0;
//     }
//     if (rateData?.isCashOut) {
//       total += rateData?.cashOutAmount || 0;
//     }
//     return total;
//   }, [
//     rateData?.balance,
//     rateData?.isCor,
//     rateData?.isCashOut,
//     rateData?.cor,
//     rateData?.cashOutAmount,
//   ]);

//   const LTV = useMemo(() => {
//     let radio = 0.7;
//     if (!rateData?.homeValue) return 0;
//     if (rateData?.isCor) {
//       setLTVError('');
//       return;
//     }
//     let total = rateData?.balance;
//     if (rateData?.isCashOut) {
//       total += rateData?.cashOutAmount || 0;
//       radio = 0.7;
//     } else {
//       radio = 0.65;
//     }
//     setLTVError(
//       total / rateData?.homeValue <= radio
//         ? ''
//         : `Your LTV should be no more than ${radio * 100}%`,
//     );
//     if (editLoanAmount < 150000) {
//       setLTVError('Total loan amount must be at least $150,000');
//     }
//     return total / rateData?.homeValue;
//   }, [
//     editLoanAmount,
//     rateData?.balance,
//     rateData?.cashOutAmount,
//     rateData?.homeValue,
//     rateData?.isCashOut,
//     rateData?.isCor,
//   ]);

//   const LTC = useMemo(() => {
//     const result =
//       rateData?.cor === 0
//         ? 0
//         : loanAmount / (rateData?.cor + rateData?.homeValue);
//     setLTCError(
//       !rateData?.isCor
//         ? ''
//         : result > 0.75
//         ? 'Reduce your cash out amount or rehab cost. Your Loan-to-Cost should be no more than 75%'
//         : '',
//     );
//     return result;
//   }, [loanAmount, rateData?.cor, rateData?.homeValue, rateData?.isCor]);

//   const [initState, getInitData] = useAsyncFn(
//     async (lastSelectedProcessId: string) => {
//       return await _fetchPreApprovedLetterInfo<PreApprovalLetterBRData>(
//         lastSelectedProcessId,
//       )
//         .then((res) => {
//           const { data } = res;
//           setLoanStage(data.loanStage);
//           setLoanAmount(data.loanAmount);
//           setPropertyType(data.propertyType);
//           setPropertyUnit(data.propertyUnit);
//           setAddress(
//             Address.create({
//               formatAddress: data.propAddr.address,
//               state: data.propAddr?.state ?? '',
//               street: '',
//               city: data.propAddr?.city ?? '',
//               aptNumber: data.propAddr?.aptNumber ?? '',
//               postcode: data.propAddr?.postcode ?? '',
//               isValid: false,
//             }),
//           );
//           const {
//             cor,
//             isCor,
//             isCashOut,
//             cashOutAmount,
//             balance,
//             homeValue,
//             arv,
//             brokerPoints,
//             brokerProcessingFee,
//           } = data;
//           setRateData({
//             cor,
//             isCor,
//             isCashOut,
//             cashOutAmount,
//             balance,
//             homeValue,
//             arv,
//             brokerPoints,
//             brokerProcessingFee,
//           });
//         })
//         .catch((err) => console.log(err));
//     },
//     [],
//   );

//   useAsyncEffect(async () => {
//     await getInitData(lastSelectedProcessId);
//   }, [lastSelectedProcessId]);

//   const onDialogSendEmailClick = useCallback(() => {
//     close();
//     setTimeout(() => {
//       infoRef.current?.focus();
//     });
//   }, [close]);

//   const onChangeTableStatus = useCallback(() => {
//     setTableStatus(tableStatus === 'edit' ? 'view' : 'edit');
//     setCheckResult(undefined);
//   }, [tableStatus]);

//   const onClickCheck = useCallback(async () => {
//     setCheckLoading(true);
//     setCheckResult(true);
//     setProductData(undefined);
//     const postData = {
//       propAddr: address.getPostData(),
//       propertyUnit,
//       propertyType,
//       ...rateData,
//     };
//     const { data, status } =
//       await _fetchPreApprovedLetterCheck<PreApprovalLetterBRData>(
//         lastSelectedProcessId,
//         postData,
//       );
//     if (status === 200) {
//       setCheckResult(!!data);
//       setProductData(data);
//     }
//     setCheckLoading(false);
//   }, [address, lastSelectedProcessId, propertyType, propertyUnit, rateData]);

//   const onClickUpdate = useCallback(async () => {
//     const addressData = address.getPostData();
//     const postData = {
//       id: productData?.id,
//       queryParams: {
//         propAddr: addressData,
//         propertyType,
//         propertyUnit,
//         ...rateData,
//       },
//     };
//     const res = await _updateRatesProductSelected(
//       lastSelectedProcessId,
//       postData,
//     );
//     if (res.status === 200) {
//       open();
//       setCheckResult(undefined);
//       setTableStatus('view');
//       await getInitData(lastSelectedProcessId);
//     }
//   }, [
//     address,
//     getInitData,
//     lastSelectedProcessId,
//     open,
//     productData?.id,
//     propertyType,
//     propertyUnit,
//     rateData,
//   ]);

//   const brokerPointsError = useMemo(() => {
//     const { brokerPoints } = rateData || {};

//     if (!brokerPoints) return [''];
//     if (brokerPoints <= 5) return false;
//     return ['Broker origination fee must be lesser than or equal to 5%.'];
//   }, [rateData]);

//   const brokerFeeError = useMemo(() => {
//     const { brokerProcessingFee } = rateData || {};

//     if (!brokerProcessingFee || !editLoanAmount) return [''];
//     if (brokerProcessingFee <= editLoanAmount) return false;
//     return [
//       `Broker origination fee must be lesser than or equal to ${utils.formatDollar(
//         editLoanAmount,
//       )}.`,
//     ];
//   }, [rateData, editLoanAmount]);

//   const clickable = useMemo(() => {
//     const brokerCondition =
//       userType === UserType.BROKER
//         ? rateData?.brokerPoints &&
//           rateData?.brokerProcessingFee &&
//           !brokerPointsError &&
//           !brokerFeeError
//         : true;

//     if (
//       !propertyType ||
//       !address?.checkAddressValid ||
//       !!LTVError ||
//       !!LTCError ||
//       !brokerCondition
//     ) {
//       return false;
//     }
//     if (propertyType === PropertyOpt.twoToFourFamily) {
//       return !!propertyUnit;
//     }
//     if (rateData?.isCor) {
//       return !!(rateData.cor && rateData.arv);
//     }
//     if (rateData?.isCashOut) {
//       return !!rateData.cashOutAmount;
//     }
//     return true;
//   }, [
//     userType,
//     rateData?.brokerPoints,
//     rateData?.brokerProcessingFee,
//     rateData?.isCor,
//     rateData?.isCashOut,
//     rateData?.cor,
//     rateData?.arv,
//     rateData?.cashOutAmount,
//     brokerPointsError,
//     brokerFeeError,
//     propertyType,
//     address?.checkAddressValid,
//     LTVError,
//     LTCError,
//     propertyUnit,
//   ]);

//   const renderResultList = useMemo(() => {
//     return typeof checkResult !== 'undefined' ? (
//       <Box className={classes.resultBox}>
//         {checkLoading ? (
//           <StyledLoading
//             iconSize={size(24)}
//             style={{ justifyContent: 'flex-start' }}
//           />
//         ) : checkResult ? (
//           <Box>
//             <Box fontWeight={700}>Your updated loan product</Box>
//             <Box mt={1}>
//               Based on that new info, here&apos;s an updated rate and loan you
//               might like
//             </Box>
//             <Box fontWeight={700} mt={1}>
//               {utils.formatLocalPercent(productData?.interestRateOfYear)} Rate /{' '}
//               {productData?.loanTerm} months /{' '}
//               {utils.formatDollar(productData?.paymentOfMonth)} Monthly payment
//             </Box>
//             <StyledButton
//               classes={nextButtonClasses}
//               style={{ marginBlockStart: 24 }}
//               onClick={onClickUpdate}
//               disabled={!clickable}
//             >
//               Update
//             </StyledButton>
//           </Box>
//         ) : (
//           <Box>
//             Based on your information, we couldn't find any rate options. Please
//             try again.
//           </Box>
//         )}
//       </Box>
//     ) : null;
//   }, [
//     clickable,
//     checkLoading,
//     checkResult,
//     classes.resultBox,
//     nextButtonClasses,
//     onClickUpdate,
//     productData?.interestRateOfYear,
//     productData?.loanTerm,
//     productData?.paymentOfMonth,
//   ]);

//   const renderEditChildren = useMemo(() => {
//     return (
//       <>
//         <Box className={classes.formRow} style={{ width: '100%' }}>
//           <StyledTextFieldNumber
//             error={!!LTVError}
//             label="Estimated home value"
//             value={rateData?.homeValue}
//             disabled={checkLoading}
//             style={{ flex: 1 }}
//             onValueChange={({ floatValue }) =>
//               setRateData({
//                 ...rateData,
//                 homeValue: floatValue,
//               })
//             }
//           />
//           <StyledTextFieldNumber
//             error={!!LTVError}
//             label="Remaining loan balance"
//             value={rateData?.balance}
//             disabled={checkLoading}
//             style={{ flex: 1 }}
//             onValueChange={({ floatValue }) => {
//               setRateData({
//                 ...rateData,
//                 balance: floatValue,
//               });
//             }}
//           />
//           {!rateData?.isCor && (
//             <StyledTextFieldNumber
//               label="Loan-to-Value"
//               value={utils.formatPercent(LTV)}
//               prefix={''}
//               disabled
//               onValueChange={() => undefined}
//             />
//           )}
//         </Box>
//         <Transitions>
//           {LTVError && (
//             <Box className={classes.formRow} color={'#ef5350'}>
//               {LTVError}
//             </Box>
//           )}
//         </Transitions>
//         <FormControlLabel
//           className={classes.checkbox}
//           label={'Cash out'}
//           checked={rateData?.isCashOut}
//           disabled={checkLoading}
//           control={
//             <StyledCheckbox
//               style={{ margin: 0, marginRight: '.5em' }}
//               onChange={(e) => {
//                 setRateData({
//                   ...rateData,
//                   isCashOut: e.target.checked,
//                 });
//               }}
//             />
//           }
//         />

//         <Transitions>
//           {rateData?.isCashOut && (
//             <Box
//               className={classes.formRow}
//               style={{ marginBlockEnd: 24, width: '234px' }}
//             >
//               <StyledTextFieldNumber
//                 error={!!LTCError}
//                 label={'Cash out amount'}
//                 value={rateData?.cashOutAmount || undefined}
//                 disabled={checkLoading}
//                 onValueChange={({ floatValue }) => {
//                   setRateData({
//                     ...rateData,
//                     cashOutAmount: floatValue,
//                   });
//                 }}
//               />
//             </Box>
//           )}
//         </Transitions>
//         <FormControlLabel
//           className={classes.checkbox}
//           label={'Rehab loan amount'}
//           checked={rateData?.isCor}
//           disabled={checkLoading}
//           control={
//             <StyledCheckbox
//               style={{ margin: 0, marginRight: '.5em' }}
//               onChange={(e) => {
//                 setRateData({
//                   ...rateData,
//                   isCor: e.target.checked,
//                 });
//               }}
//             />
//           }
//         />
//         <Transitions>
//           {rateData?.isCor && (
//             <Box
//               className={classes.formRow}
//               style={{ marginBlockEnd: 24, width: '100%' }}
//             >
//               <StyledTextFieldNumber
//                 error={!!LTCError}
//                 label={'Estimated rehab loan amount'}
//                 value={rateData?.cor || undefined}
//                 disabled={checkLoading}
//                 onValueChange={({ floatValue }) => {
//                   setRateData({
//                     ...rateData,
//                     cor: floatValue,
//                   });
//                 }}
//               />
//               <StyledTextFieldNumber
//                 error={!!LTCError}
//                 label={'After repair value (ARV)'}
//                 value={rateData?.arv || undefined}
//                 disabled={checkLoading}
//                 onValueChange={({ floatValue }) => {
//                   setRateData({
//                     ...rateData,
//                     arv: floatValue,
//                   });
//                 }}
//               />
//               <StyledTextFieldNumber
//                 label={'Loan-to-Cost'}
//                 value={utils.formatPercent(LTC)}
//                 prefix={''}
//                 disabled
//                 onValueChange={() => undefined}
//               />
//             </Box>
//           )}
//         </Transitions>
//         <Transitions>
//           {LTCError && (
//             <Box className={classes.formRow} color={'#ef5350'} mt={'24px'}>
//               {LTCError}
//             </Box>
//           )}
//         </Transitions>
//         {userType === UserType.BROKER && (
//           <Box className={classes.formRow} style={{ width: '100%' }}>
//             <StyledTextFieldNumber
//               label="Broker origination fee "
//               value={rateData?.brokerPoints}
//               disabled={checkLoading}
//               style={{ flex: 1 }}
//               decimalScale={3}
//               thousandSeparator={false}
//               prefix={''}
//               suffix={'%'}
//               onValueChange={({ floatValue }) =>
//                 setRateData({
//                   ...rateData,
//                   brokerPoints: floatValue,
//                 })
//               }
//               error={brokerPointsError}
//             />
//             <StyledTextFieldNumber
//               label="Broker processing fee"
//               value={rateData?.brokerProcessingFee}
//               disabled={checkLoading}
//               style={{ flex: 1 }}
//               onValueChange={({ floatValue }) => {
//                 setRateData({
//                   ...rateData,
//                   brokerProcessingFee: floatValue,
//                 });
//               }}
//               error={brokerFeeError}
//             />
//           </Box>
//         )}
//       </>
//     );
//   }, [
//     classes.formRow,
//     classes.checkbox,
//     LTVError,
//     rateData,
//     checkLoading,
//     LTV,
//     LTCError,
//     LTC,
//     userType,
//     brokerPointsError,
//     brokerFeeError,
//   ]);

//   const infoRef = useRef<HTMLInputElement>();

//   return (
//     <>
//       {tableStatus === 'view' ? (
//         <PreApprovalInfo
//           ref={infoRef}
//           loanStage={loanStage}
//           loading={initState.loading}
//           loanAmount={loanAmount}
//           onClickEdit={onChangeTableStatus}
//           lastSelectedProcessId={lastSelectedProcessId}
//         />
//       ) : (
//         <>
//           <PreApprovalEdit
//             address={address}
//             propertyType={propertyType}
//             propertyUnit={propertyUnit}
//             onTypeChange={setPropertyType}
//             onUnitChange={setPropertyUnit}
//             onClickCancel={onChangeTableStatus}
//             onClickCheck={onClickCheck}
//             clickable={!clickable}
//             editable={checkLoading}
//             children={renderEditChildren}
//             resultList={renderResultList}
//           />
//         </>
//       )}
//       <Dialog
//         open={visible}
//         classes={{ paper: classes.dialogPaper }}
//         onClose={close}
//       >
//         <DialogContent classes={{ root: classes.dialogContent }}>
//           <Box className={classes.updatedImage} />
//           <Box className={classes.updatedTip}>
//             Your pre-approval letter has already been updated!
//           </Box>
//           <Box className={classes.updatedActions}>
//             <StyledButton
//               variant="outlined"
//               classes={backButtonClasses}
//               onClick={() => router.push('/dashboard/rates')}
//             >
//               Go to Rates
//             </StyledButton>
//             <StyledButton
//               variant="contained"
//               color="secondary"
//               disableElevation
//               className={classes.secondButton}
//               onClick={onDialogSendEmailClick}
//             >
//               Send Email
//             </StyledButton>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// });
