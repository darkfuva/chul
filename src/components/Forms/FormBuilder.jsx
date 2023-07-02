import { useFormLogic as defaultUseForm } from './useFormLogic';
import { Forms } from './Forms';
import { useState } from 'react';
import { Grid } from '@mui/material';

export const useFormBuilder = ({
  formConfig,
  defaultValues,
  validateForm,
  handleChange,
  useForms = defaultUseForm,
  ...onChangeObject
}) => {
  // Calls the useForms hook to get the values to be passed to a basic Forms element
  //  and also values to be returned to ensure appropriate control at the Component Level.

  const [formConfigState, setFormConfigState] = useState(formConfig);
  const {
    modifiedFormConfig,
    valueState,
    additionalProps,
    setValueState,
    errorState,
    isFormModified,
    setErrorState,
    validateForm: validateFormRet,
    handleChange: handleChangeRet,
    setDefaultValues,
    handleChangePropsById,
    defaultConfig,
    resetForm
  } = defaultUseForm({
    formConfig: formConfigState,
    validateForm,
    handleChange,
    defaultValues,
    ...onChangeObject,
  });
  return {
    formConfigState,
    Component: (
      <Grid container spacing={2}>
      <Forms
        defaultProps={defaultConfig}
        formConfig={modifiedFormConfig}
        formHandleChange={handleChange || handleChangeRet}
        valueState={valueState}
        errorState={errorState}
        additionalProps={additionalProps}
        setValueState={setValueState}
      ></Forms>
      </Grid>
    ),
    resetForm,
    isFormModified,
    setFormConfigState,
    valueState,
    errorState,
    setValueState,
    setErrorState,
    additionalProps,
    validateForm: validateForm || validateFormRet,
    setDefaultValues,
    handleChangePropsById,
  };
};
