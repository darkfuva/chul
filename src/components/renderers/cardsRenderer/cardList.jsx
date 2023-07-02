'use client';
import BaseCard from '@/components/cards/baseCards/cards';
import { Grid, IconButton } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
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

  const commonActions = useCallback(
    (card) =>
      actionsObject?.map((action, index) => (
        <IconButton key={index} onClick={() => restProps?.[`on${action.id}`]?.(card)}>
          {action.Icon ? <action.Icon /> : <span>{action.label}</span>}
        </IconButton>
      )),
    [cardsData]
  );
  return (
    <div className={styles.cardListWrapper}>
      <Grid container spacing={2} className={`${styles.baseContainerList} ${containerClass}`}>
        {cardsData.map((card,index) => (
          <Grid item key={index}>
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
