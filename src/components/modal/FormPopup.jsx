import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import styles from './modal.module.css';
import ConfirmPopup from './ConfirmPopup';
import { Close } from '@mui/icons-material';

export default function FormPopup({
  open,
  title,
  onClose,
  isFormModified,
  children,
  classes,
}) {
  const [confirmationPopupFlag, setConfirmationPopupFlag] =
    useState(false);
  useEffect(() => {
    console.log(isFormModified);
  }, [isFormModified]);
  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      className={`${styles.dialogRoot}`}
    >
      <ConfirmPopup
        open={confirmationPopupFlag}
        onClose={() => setConfirmationPopupFlag(false)}
        onConfirm={() => {
          setConfirmationPopupFlag(false);
          onClose();
        }}
        title="Unsaved Changes"
        message1="Do you want to continue without saving the changes?"
        primaryBtnLabel="Yes"
        secondaryBtnLabel="No"
      />
      <IconButton
        aria-label="close"
        onClick={() => {
          if (isFormModified) setConfirmationPopupFlag(true);
          else onClose();
        }}
        sx={{
          position: 'absolute',
          right: 42,
          top: 48.5,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close></Close>
      </IconButton>
      <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
      <DialogContent
        className={`${styles.dialogContent} ${classes?.dialogContent}`}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
