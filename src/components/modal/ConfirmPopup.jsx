import Image from 'next/image';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import styles from './modal.module.css';
import Button from '../Button/Button';


export default function ConfirmPopup({
  open,
  onClose,
  onConfirm,
  title,
  message1,
  message2,
  messageKey,
  primaryBtnLabel,
  secondaryBtnLabel,
}) {
  const confirmationMessage = {};
  return (
    <Dialog maxWidth="md" fullWidth open={open} className={styles.dialogRoot}>
      <IconButton
        aria-label="close"
        onClick={() => {
          onClose();
        }}
        sx={{
          position: 'absolute',
          right: 42,
          top: 48.5,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Image src="/icons8-cancel 2.svg" alt="Logo" width={24} height={24} />
      </IconButton>
      <DialogTitle className={styles.dialogTitle}>{title || confirmationMessage?.title}</DialogTitle>
      {open && (
        <DialogContent className={styles.dialogContent}>
          <div className={styles.confirmationQuestion}>{message1 || confirmationMessage?.message1}</div>
          <div className={styles.confirmationDescription}>{message2 || confirmationMessage?.message2}</div>
        </DialogContent>
      )}
      <DialogActions className={styles.dialogActions}>
        <Button
          label={primaryBtnLabel || confirmationMessage?.primaryBtnLabel}
          buttonstyle="orangeBtn"
          disabled={false}
          handleBtnClick={onConfirm}
        />
        {(secondaryBtnLabel || confirmationMessage?.secondaryBtnLabel) && (
          <Button
            label={secondaryBtnLabel || confirmationMessage?.secondaryBtnLabel}
            buttonstyle="whiteBtn"
            disabled={false}
            handleBtnClick={onClose}
          />
        )}
      </DialogActions>
    </Dialog>
  );
}
