'use client';
import BaseCard from '@/components/cards/baseCards/cards';
import { Grid, IconButton } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ItemCards } from '@/components/cards/itemCards/cards';
import styles from "./cardList.module.scss"
export default function CardList({
  config,
  CardsComponent,
  actionsObject,
  containerClass,
  ...restProps
}) {
  const [cardsData, setCardsData] = useState(config);
  useEffect(()=>{
    setCardsData(config)
  },[config])

  const commonActions = useCallback(
    (card) =>
      actionsObject?.map((action, index) => (
        <IconButton key={index} onClick={() => restProps?.[`on${action.id}`]?.(card)}>
          {action.Icon ?<><action.Icon label = {`Rs.${card.pricePerUnit}`} /> </>: <span>{action.label}</span>}
        </IconButton>
      )),
    [cardsData]
  );
  return (
    <div className={styles.cardListWrapper}>
      <Grid container spacing={2} className={`${styles.baseContainerList} ${containerClass}`}>
        {cardsData.map((card,index) => (
          <Grid item key={index} lg={4} md={4} sm={4} xs={6}>
            <CardsComponent
              header={card.header}
              subheader={card.subheader}
              CardActionsFromProps={commonActions(card)}
              borderColor={card?.borderColor}
            ></CardsComponent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
