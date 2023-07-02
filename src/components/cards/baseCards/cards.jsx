'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './cards.module.css';

export default function BaseCard({
  header,
  containerWidth = 250,
  subheader,
  CardActionsFromProps,
  CardMediaFromProps,
  avatar,
  Content,
  borderColor,
}) {
  return (
    <Card
      sx={{
        width: containerWidth,
        marginRight: '3px',
        borderTop: `5px solid ${borderColor? borderColor: "transparent"}`,
      }}
    >
      <CardHeader
        avatar={avatar}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={header}
        subheader={subheader}
      />
      {CardMediaFromProps}
      {Content && <CardContent>{Content}</CardContent>}
      <CardActions disableSpacing className={styles.cardActions}>
        {CardActionsFromProps}
      </CardActions>
    </Card>
  );
}
