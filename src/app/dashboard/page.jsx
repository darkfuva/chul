'use client';
import CardList from '@/components/renderers/cardsRenderer/cardList';
import { ItemsList, LiveOrders, QuotationsRequested } from './dummyData';
import styles from './dashboard.module.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import { ItemCards } from '@/components/cards/itemCards/cards';
import { DeliveryCards } from '@/components/cards/deliveryCards/cards';
import FormPopup from '@/components/modal/FormPopup';
import { useEffect, useState } from 'react';
import { useFormBuilder } from '@/components/Forms/FormBuilder';
import { DialogActions } from '@mui/material';
import Button from '@/components/Button/Button';
import AddQuotationRequest from '@/components/Forms/QuotationRequest/addQuotationRequest';
import ManageQuotationRequest from '@/components/Forms/QuotationRequest/manageQuotationRequest';
import { getAllProducts } from '@/dummyData/Company';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getProducts, increment } from '../store/slices/dummySlice';
import { getOrders } from '../store/slices/orderSlice';
import dayjs from 'dayjs';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(getProducts);
  const OrderSelector = useAppSelector(getOrders);

  useEffect(() => {
    console.log(selector);
  }, [selector]);
  let actionsObject = [
    {
      label: '',
      id: 'getAQuote',
      Icon: ({ label }) => (
        <>
          {' '}
          {label} <AddShoppingCartIcon />
        </>
      ),
    },
    {
      label: '',
      Icon: ShareIcon,
      id: 'share',
    },
  ];

  let actionsObjectQuotes = [
    {
      label: '',
      id: 'viewAQuote',
      Icon: () => <AddShoppingCartIcon />,
    },
    {
      label: '',
      Icon: ShareIcon,
      id: 'share',
    },
  ];
  const [getAQuotePopupFlag, setGetAQuotePopupFlag] = useState(false);
  const [manageQuotePopupFlag, setManageQuotePopupFlag] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

  const onshare = (card) => {
    console.log(card, 'Share');
  };
  const ongetAQuote = (card) => {
    setGetAQuotePopupFlag(true);
    setDefaultValues({ item: card.id, ...card });
    console.log(card, 'getAQuote');
  };
  const onviewAQuote = (card) => {
    setManageQuotePopupFlag(true);
    console.log(card, 'getAQuoteview');
    setDefaultValues({ ...card, item: card.header });
  };

  return (
    <div>
      {/* <div className={styles.sectionContainer}>
        <span className={styles.sectionTitle}>Quotations Recieved</span>
        <CardList
          onshare={(card) => onshare(card)}
          onviewAQuote={(card) => onviewAQuote(card)}
          actionsObject={actionsObjectQuotes}
          config={QuotationsRequested}
          CardsComponent={DeliveryCards}
          containerClass={styles.cardsListContainer}
        />
      </div> */}
      {OrderSelector.length>0 && <div className={styles.sectionContainer}>
        <span className={styles.sectionTitle}>Live Orders</span>
        <CardList
          onshare={(card) => onshare(card)}
          ongetAQuote={(card) => ongetAQuote(card)}
          actionsObject={actionsObject}
          config={OrderSelector.map((order) => ({
            header: selector.find((val) => val.id === order.item)?.productName,
            subheader: new Date(
              dayjs(order.requestedDeliveryDate).toString()
            ).toLocaleDateString(),
            pricePerUnit: order.pricePerUnit,
            borderColor: 'red',
          }))}
          CardsComponent={DeliveryCards}
          containerClass={styles.cardsListContainer}
        />
      </div>}
      <div className={styles.sectionContainer}>
        <span className={styles.sectionTitle}>
          Recommended Products For You
        </span>
        <CardList
          onshare={(card) => onshare(card)}
          ongetAQuote={(card) => ongetAQuote(card)}
          actionsObject={actionsObject}
          config={
            selector?.map((val) => ({
              header: val.productName,
              subheader: val.companyName,
              ...val,
            })) || []
          }
          CardsComponent={ItemCards}
        />
      </div>
      <ManageQuotationRequest
        open={manageQuotePopupFlag}
        defaultValues={defaultValues}
        onClose={() => setManageQuotePopupFlag(false)}
      ></ManageQuotationRequest>
      <AddQuotationRequest
        open={getAQuotePopupFlag}
        defaultValues={defaultValues}
        onClose={() => setGetAQuotePopupFlag(false)}
      ></AddQuotationRequest>
    </div>
  );
}
