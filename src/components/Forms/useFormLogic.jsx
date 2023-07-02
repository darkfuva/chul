import { useEffect, useMemo, useState } from 'react';

let defaultProps = {
  validation: (value) => !!!value,
  helperText: 'Please enter value in mandatory fields',
};

// IUseFormsProp & {[key: string]: any},
export const useFormLogic = ({
  formConfig,
  // handleChange,
  validateForm,
  defaultValues,
  ...onChangeObject
}) => {
  //#region Default Configs

  // Get values for default configuration like default validation methods and default helper text.
  const getDefaultConfig = (formConfigP) => {
    let defaultConfig = formConfigP?.find((val) => val.defaultProps);
    return {
      ...defaultConfig?.defaultProps,
      validation:
        defaultConfig?.defaultProps?.validation || defaultProps.validation,
      helperText:
        defaultConfig?.defaultProps?.helperText || defaultProps.helperText,
    };
  };
  const defaultConfig = getDefaultConfig(formConfig);
  //#endregion

  //#region Initialize Form Logic

  const modifiedFormConfig = useMemo(() => {
    return formConfig?.map((ele) => {
      if (ele?.passedComponent) {
        return {
          ...ele,
          fieldProps: {
            ...defaultConfig,
            ...ele.fieldProps,
            ...ele.passedComponent({}).props,
          },
        };
      } else {
        return { ...ele, fieldProps: { ...defaultConfig, ...ele?.fieldProps } };
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formConfig]);
  // Initialize value state which contains all the values for the forms.
  // It also tries to merge default values if any which will be used by PUT calls.
  const initializeFormValueState = (
    ldefaultValues
  ) => {
    let { helperText, validation } = defaultConfig;
    let localErrorState = { ...errorState },
      localValueState = { ...valueState };
    modifiedFormConfig
      ?.filter((ele) => ele && !ele.defaultProps)
      .forEach((ele) => {
        if (ele && ele.fieldProps) {
          localErrorState[ele.fieldProps?.id] = {
            error: false,
            isModified: false,
            hiddenHelperText: ele.fieldProps.required
              ? ele.fieldProps.helperText || helperText
              : '',
            validation: ele.fieldProps.validation
              ? (value) =>
                  ele.fieldProps?.validation &&
                  ele.fieldProps?.validation?.(value)
              : (value) => validation?.(value),
            helperText: '',
          };
          localValueState[ele.fieldProps?.id] =
            ldefaultValues?.[ele.fieldProps?.id || ''] || '';
        }
      });
    setErrorState({ ...localErrorState });
    setValueState({ ...localValueState });
  };

  useEffect(() => {
    initializeFormValueState(valueState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formConfig]);

  const [errorState, setErrorState] = useState({});
  const [valueState, setValueState] = useState({});
  //#endregion

  //#region Validate Form

  // Function to handle validation for all fields.
  // Custom validations are defined at form config level and
  // the appropriate validation function is called (Custom/Default).
  // You can also pass a validateForm function to FormBuilder to use custom validation logic.
  validateForm =
    validateForm ||
    (() => {
      let localValueState = { ...valueState },
        localErrorState = { ...errorState };

      let errorFlag = 0;
      modifiedFormConfig.forEach((ele) => {
        if (ele) {
          let labelKey = ele.fieldProps?.id || '';
          if (labelKey && ele.fieldProps?.required) {
            let newErrorState = localErrorState[labelKey].validation(
              localValueState[labelKey]
            );
            localErrorState[labelKey].helperText = newErrorState
              ? localErrorState[labelKey].hiddenHelperText
              : '';
            localErrorState[labelKey].error = newErrorState;
            errorFlag = newErrorState ? errorFlag + 1 : errorFlag;
          }
        }
      });
      setErrorState(localErrorState);
      return errorFlag === 0;
    });
  //#endregion

  //#region Changes and updates

  // Function to modify styles of a field
  // Initialize additional props which will be used to modify props recieved from formConfig.
  const [additionalProps, setAdditionalProps] =
    useState({});
  let handleChangeProps = (id, props) => {
    if (typeof id === 'object') {
      let additionalPropsObject = {};
      id.forEach((val) => {
        additionalPropsObject[val] = props;
      });
      setAdditionalProps((additionalPropsPrev) => ({
        ...additionalPropsPrev,
        ...additionalPropsObject,
      }));
    } else
      setAdditionalProps((additionalPropsPrev) => ({
        ...additionalPropsPrev,
        [id]: props,
      }));
  };

  // Function to handle changes.
  // You can also pass a handleChange function to FormBuilder to use custom handleChange logic.
  // You can also run additional affects by adding onChange[ObservableName] function to FormBuilder
  const handleChange = (key, value) => {
    let onChangeFunc = onChangeObject?.[`onChange${key}`];
    if (onChangeFunc) {
      onChangeFunc?.(key, value);
    }
    setErrorState((prevState)=>{
      let localErrorState = { ...prevState };
      localErrorState[key].isModified = true;
      if (localErrorState?.[key]?.error) {
        localErrorState[key].error = localErrorState[key].validation(value);
        localErrorState[key].helperText = '';
      }
      return localErrorState
    })
    setValueState((prevState) => {
      let localValueState = { ...prevState };
      localValueState[key] = value;
      return localValueState;
    });
  };
  const isFormModified = useMemo(
    () => Object.values(errorState).some((val) => val.isModified),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [valueState]
  );
  //#endregion

  return {
    modifiedFormConfig: modifiedFormConfig,
    isFormModified,
    valueState,
    setValueState,
    errorState,
    setErrorState,
    defaultConfig,
    additionalProps,
    validateForm,
    handleChange,
    resetForm:()=>{initializeFormValueState({});setAdditionalProps({})},
    setDefaultValues: (defValues) =>
      initializeFormValueState(defValues),
    handleChangePropsById: (id, props) => {
      handleChangeProps(id, props);
    },
  };
};
