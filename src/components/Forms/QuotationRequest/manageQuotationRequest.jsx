import { ItemsList } from '@/app/dashboard/dummyData';
import Button from '@/components/Button/Button';
import FormPopup from '@/components/modal/FormPopup';
import { DialogActions } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormBuilder } from '../FormBuilder';
import styles from '../forms.module.css';
import { DatePickerComponent } from '../FormFields/DatePicker';
import { getAllProducts } from '@/dummyData/Company';

let defaultGridProps = { lg: 6, md: 6, sm: 6, xs: 6 };
let quoteFormConfig = [
  {
    fieldProps: { id: 'company', label: 'Company Name' },
    gridProps: defaultGridProps,
  },
  {
    fieldProps: { id: 'quantity', label: 'Quantity', type: 'number' },
    gridProps: defaultGridProps,
  },
  {
    passedComponent: ({ ...props }) => {
      return (
        <DatePickerComponent
          {...props}
          id="requestedDeliveryDate"
          label="Requested Delivery Date"
          slotProps={{
            textField: {
              required: true,
              error: props.error,
              helperText: props.error
                ? 'Please enter value in mandatory fields'
                : '',
            },
          }}
        />
      );
    },
    gridProps: defaultGridProps,
  },
  {
    fieldProps: { id: 'deliveryAddress', label: 'Delivery Address' },
    gridProps: defaultGridProps,
  },
  {
    passedComponent: ({ ...props }) => {
      return (
        <DatePickerComponent
          {...props}
          id="proposedDeliveryDate"
          label="Proposed Delivery Date"
          slotProps={{
            textField: {
              required: true,
              error: props.error,
              helperText: props.error
                ? 'Please enter value in mandatory fields'
                : '',
            },
          }}
        />
      );
    },
    gridProps: defaultGridProps,
  },
  {
    fieldProps: { id: 'pricePerUnit', label: 'Quoted Price Per Unit' },
    gridProps: defaultGridProps,
  },
  {
    fieldProps: { id: 'totalPrice', label: 'Total Price' },
    gridProps: defaultGridProps,
  },
  {
    fieldProps: {
      id: 'item',
      label: 'Item',
      select: true,
      menuitems: getAllProducts().map(val=>({label:val.productName, value: val.id})),
    },
    gridProps: defaultGridProps,
  },
  {
    fieldProps: { id: 'additionalComments', label: 'Additional Comments' },
    gridProps: { lg: 12, sm: 12, xs: 12, md: 12 },
  },
];
export default function ManageQuotationRequest({
  open,
  onClose,
  defaultValues,
}) {
  useEffect(() => {
    console.log(defaultValues);
    if (defaultValues) {
      quoteBuilder.handleChangePropsById(
        [
          'company',
          'pricePerUnit',
          'requestedDeliveryDate',
          'proposedDeliveryDate',
          'deliveryAddress',
          'quantity',
          'item',
          'totalPrice',
        ],
        { disabled: false }
      );
      quoteBuilder.setDefaultValues({
        ...defaultValues,
        totalPrice: defaultValues.quantity * defaultValues.pricePerUnit,
      });
    }
  }, [defaultValues]);
  const [getAQuotePopupFlag, setGetAQuotePopupFlag] = useState(open);
  const onChangequantity = () => {
    quoteBuilder.setValueState({
      ...quoteBuilder.valueState,
      totalPrice:
        quoteBuilder.valueState.quantity * quoteBuilder.valueState.pricePerUnit,
    });
  };
  const onChangepricePerUnit = () => {
    quoteBuilder.setValueState({
      ...quoteBuilder.valueState,
      totalPrice:
        quoteBuilder.valueState.quantity * quoteBuilder.valueState.pricePerUnit,
    });
  };
  const quoteBuilder = useFormBuilder({
    formConfig: quoteFormConfig,
    onChangequantity,
    onChangepricePerUnit,
  });

  return (
    <FormPopup
      title={'Request a Quote'}
      open={open}
      isFormModified={quoteBuilder.isFormModified}
      onClose={() => {
        setGetAQuotePopupFlag(false);
        onClose();
      }}
    >
      {quoteBuilder.Component}
      <DialogActions className={styles.dialogActions}>
        <Button
          label={'Raise Quotation Request'}
          buttonstyle="orangeBtn"
          disabled={false}
          handleBtnClick={() => {}}
        />
      </DialogActions>
    </FormPopup>
  );
}
