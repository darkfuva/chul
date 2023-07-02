import { Grid } from '@mui/material';
import { FormComponentRenderer } from './FormComponentRenderer';
import SingleSelectDropdown from './FormFields/SingleSelectDropdown';
import CustomTextField from './FormFields/CustomTextField';

export const Forms = ({
  formConfig,
  valueState,
  errorState,
  formHandleChange,
  additionalProps,
  setValueState,
  defaultProps,
}) => {
  const setProps = (props, id) => {
    let extraProps = {
      id: `${props.id}`,
      menuitems: props.menuitems,
      helperText: errorState[props.id]?.error
        ? errorState[props.id]?.hiddenHelperText
        : '',
      error: errorState[props.id]?.error,
      ismodified: errorState[props.id]?.isModified?.toString(),
      value: valueState[props.id] || '',
      // onBlur: () => runValidation(props.id),
      onChange: (e, val) =>
        handleChange(
          props?.id || '',
          e?.target ? e?.target?.value : e,
          props.maxLength
        ),
    };
    return { ...extraProps };
  };
  const handleChange = (
    fieldKey,
    value,
    maxLength
  ) => {
    if (!value || value?.trim?.().length !== 0)
      if ((maxLength && value.length <= maxLength) || !maxLength) {
        formHandleChange(fieldKey, value);
      }
  };
  const getValuesToObserve = (allProps) => {
    let values = Object.values({
      ...allProps,
      onChange: null,
      options: null,
      children: null,
      onBlur: null,
      slotProps: null,
    });
    values.length = 20;
    return values;
  };
  return (
    <>
      {formConfig?.map((ele) => {
        let extraProps = { id: '' },
          allProps,
          passedComponentProps;
        const repeatedCheckProp = ele?.fieldProps?.repeatedCheckProp;
        passedComponentProps = ele?.fieldProps;
        extraProps = setProps(ele?.fieldProps, ele?.fieldProps?.id);
        allProps = {
          ...defaultProps,
          ...passedComponentProps,
          ...repeatedCheckProp?.(valueState),
          ...additionalProps[extraProps?.id],
          ...extraProps,
        };

        const Component = ele?.fieldProps?.select
          ? SingleSelectDropdown
          : CustomTextField;
        if (!errorState[ele?.fieldProps?.id || '']?.hiddenHelperText) {
          delete allProps.error;
          delete allProps.helperText;
        }
        delete allProps?.repeatedCheckProp;
        delete allProps?.validation;
        return (
          ele &&
          ((ele.fieldProps && ele.fieldProps?.id) || ele.passedComponent) && (
            <Grid key={ele.fieldProps?.id} {...ele.gridProps} item>
              {/* Use FormComponentRenderer to avoid rerenders of fields when formConfig changes*/}
              <FormComponentRenderer
                ComponentToRender={
                  ele.passedComponent ? ele.passedComponent : Component
                }
                valuesToObserve={getValuesToObserve(allProps)}
                allProps={allProps}
              />
            </Grid>
          )
        );
      })}
    </>
  );
};
