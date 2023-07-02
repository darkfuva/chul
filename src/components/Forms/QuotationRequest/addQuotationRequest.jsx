import { ItemsList } from '@/app/dashboard/dummyData';
import Button from '@/components/Button/Button';
import FormPopup from '@/components/modal/FormPopup';
import { DialogActions } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormBuilder } from '../FormBuilder';
import styles from '../forms.module.css';
import { DatePickerComponent } from '../FormFields/DatePicker';

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
          label="Delivery Date"
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
    fieldProps: {
      id: 'item',
      label: 'Item',
      select: true,
      menuitems: ItemsList.map((val) => ({
        label: val.header,
        value: val.header,
      })),
    },
    gridProps: defaultGridProps,
  },
  {
    fieldProps: { id: 'additionalComments', label: 'Additional Comments' },
    gridProps: { lg: 12, sm: 12, xs: 12, md: 12 },
  },
];
export default function AddQuotationRequest({
  open,
  onClose,
  defaultValues,
}) {
  useEffect(() => {
    console.log(defaultValues);
    quoteBuilder.setDefaultValues(defaultValues);
  }, [defaultValues]);
  const [getAQuotePopupFlag, setGetAQuotePopupFlag] = useState(open);
  const quoteBuilder = useFormBuilder({ formConfig: quoteFormConfig });

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
