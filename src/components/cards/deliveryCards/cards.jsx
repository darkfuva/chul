import { Avatar, CardMedia } from '@mui/material';
import BaseCard from '../baseCards/cards';
import Bhujia from '../../../../public/Bhujia.jpg';

export function DeliveryCards({ header, subheader, CardActionsFromProps, containerWidth = 250, borderColor }) {
  return (
    <>
      <BaseCard
        avatar={
          header ? (
            <Avatar aria-label="recipe" sx={{width:'20px', height:'20px', fontSize:"var(--font-size-sm)"}}>{header.charAt(0)}</Avatar>
          ) : null
        }
        header={header}
        subheader={subheader}
        CardActionsFromProps={CardActionsFromProps}
        containerWidth={containerWidth}
        borderColor={borderColor}
      ></BaseCard>
    </>
  );
}
