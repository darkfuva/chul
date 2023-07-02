import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { GridProps, TextFieldProps } from '@mui/material';

//#region Generic

export type ValidationParams = string | undefined | null;
export type Validation = (value: ValidationParams) => boolean | undefined;
export type IonChange = {
  [key: IonChangeKey]: (key1: string, value: any) => void;
};
export type IonChangeKey = `onChange${string}`;
export interface ValidatedValues {
  [key: string]: string;
}
interface AdditionalProps {
  validation?: Validation;
  helperText?: string;
  id?: string;
  menuitems?: any;
  repeatedCheckProp?: Function;
}
export type IFieldProps = TextFieldProps &
  AdditionalProps & { [key: string]: any };

export interface IAdditionalProps {
  [key: string]: IFieldProps;
}
interface IFormConfigItem {
  passedComponent?: (...props: any) => ReactJSXElement;
  defaultProps?: AdditionalProps & IFieldProps;
  fieldProps?: IFieldProps;
  gridProps?: GridProps;
}
export interface ValueState {
  [key: string]: {
    helperText: string;
    error: boolean | undefined;
    isModified: boolean | undefined;
    validation: Validation;
    hiddenHelperText: string;
  };
}

export interface IFormConfig extends Array<IFormConfigItem | null> {}
//#endregion

//#region Form Component
export interface IFormsProp {
  formConfig: IFormConfig;
  valueState: ValidatedValues;
  errorState: ValueState;
  formHandleChange: Function;
  additionalProps: IAdditionalProps;
  setValueState?: Function;
  defaultProps?: any;
}
//#endregion

//#region UseForms
export interface IUseFormsPropPre {
  formConfig: IFormConfig;
  defaultValues?: ValidatedValues;
  handleChange?: Function;
  validateForm?: Function;
  onChangeObject?: IonChange;
}
export type IUseFormsProp = IUseFormsPropPre & IonChange;
//#endregion

//#region FormBuilder
export type IFormBuilderPropsPre = {
  formConfig: IFormConfig;
  defaultValues?: ValidatedValues | undefined;
  validateForm?: Function;
  handleChange?: Function;
  useForms?: ({ params }: any) => any;
};
export type IFormBuilderProps = IFormBuilderPropsPre & IonChange;
//#endregion
