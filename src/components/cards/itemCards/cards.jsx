import { Avatar, CardMedia } from '@mui/material';
import BaseCard from '../baseCards/cards';
import Bhujia from '../../../../public/Bhujia.jpg';

export function ItemCards({ header, subheader, CardActionsFromProps, containerWidth = 230 }) {
  return (
    <>
      <BaseCard
        avatar={
          header ? (
            <Avatar aria-label="recipe" sx={{width:'20px', height:'20px', fontSize:"var(--font-size-sm)"}}>{header.charAt(0)}</Avatar>
          ) : null
        }
        CardMediaFromProps={
          <CardMedia
            component="img"
            height="194"
            sx={{ width: 'auto', margin: '5px auto' }}
            image={Bhujia.src}
          ></CardMedia>
        }
        header={header}
        subheader={subheader}
        CardActionsFromProps={CardActionsFromProps}
        containerWidth={containerWidth}
      ></BaseCard>
    </>
  );
}
