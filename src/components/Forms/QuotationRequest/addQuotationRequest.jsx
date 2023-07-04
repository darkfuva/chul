import { ItemsList } from '@/app/dashboard/dummyData';
import Button from '@/components/Button/Button';
import FormPopup from '@/components/modal/FormPopup';
import { DialogActions } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormBuilder } from '../FormBuilder';
import styles from '../forms.module.css';
import { DatePickerComponent } from '../FormFields/DatePicker';
import { Company, getAllProducts } from '@/dummyData/Company';
import { getProducts } from '@/app/store/slices/dummySlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { addOrder, getOrders } from '@/app/store/slices/orderSlice';
import dayjs from 'dayjs';

let defaultGridProps = { lg: 6, md: 6, sm: 6, xs: 6 };
export default function AddQuotationRequest({ open, onClose, defaultValues }) {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(getProducts);
  const ordersSelector = useAppSelector(getOrders);
  useEffect(() => {
    console.log(ordersSelector);
  }, [ordersSelector.orders]);

  let quoteFormConfig = [
    {
      fieldProps: {
        id: 'company',
        label: 'Company Name',
        select: true,
        required: true,
        menuitems: Company.map((val) => ({
          label: val.company,
          value: val.id,
        })),
      },
      gridProps: defaultGridProps,
    },
    {
      fieldProps: {
        id: 'quantity',
        label: 'Quantity',
        required: true,
        type: 'number',
        validation: (value) => value < 100,
      },
      gridProps: defaultGridProps,
    },
    {
      passedComponent: ({ ...props }) => {
        return (
          <DatePickerComponent
            {...props}
            id="requestedDeliveryDate"
            label="Delivery Date"
            required={true}
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
      fieldProps: {
        id: 'deliveryAddress',
        required: true,
        label: 'Delivery Address',
      },
      gridProps: defaultGridProps,
    },
    {
      fieldProps: {
        id: 'item',
        label: 'Item',
        required: true,

        select: true,
        menuitems: selector.map((val) => ({
          label: val.productName,
          value: val.id,
        })),
      },
      gridProps: defaultGridProps,
    },
    {
      fieldProps: {
        id: 'pricePerUnit',
        label: 'Price per Unit',
        required: true,

        disabled: true,
      },
      gridProps: defaultGridProps,
    },
    {
      fieldProps: {
        id: 'totalPrice',
        label: 'Total Price',
        required: true,

        disabled: true,
      },
      gridProps: defaultGridProps,
    },
    {
      fieldProps: { id: 'additionalComments', label: 'Additional Comments' },
      gridProps: { lg: 12, sm: 12, xs: 12, md: 12 },
    },
  ];
  useEffect(() => {
    defaultValues.quantity = 100;
    defaultValues.totalPrice =
      defaultValues.quantity * defaultValues.pricePerUnit;
    quoteBuilder.setDefaultValues(defaultValues);
  }, [defaultValues]);
  const [getAQuotePopupFlag, setGetAQuotePopupFlag] = useState(open);
  const onChangequantity = (key, value) => {
    quoteBuilder.setValueState((prevValueState) => ({
      ...prevValueState,
      totalPrice: prevValueState.pricePerUnit * value,
    }));
  };
  const onChangeitem = (key, value) => {
    let selectedOrder = selector.find((val) => val.id === value);
    quoteBuilder.setValueState((prevValueState) => ({
      ...prevValueState,
      company: selectedOrder.company,
      pricePerUnit: selectedOrder.pricePerUnit,
      totalPrice: selectedOrder.pricePerUnit * prevValueState.quantity,
    }));
  };


  const onChangerequestedDeliveryDate = (key,value) => {
    console.log(new Date(dayjs(value).toISOString()).toLocaleDateString())
  }

  const quoteBuilder = useFormBuilder({
    formConfig: quoteFormConfig,
    onChangeitem,
    onChangequantity,
    onChangerequestedDeliveryDate
  });

  return (
    <FormPopup
      title={'Raise an order'}
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
          handleBtnClick={() => {
            if (quoteBuilder.validateForm()) {
              dispatch(addOrder({ valueState: quoteBuilder.valueState }));
              onClose();
            }
          }}
        />
      </DialogActions>
    </FormPopup>
  );
}
