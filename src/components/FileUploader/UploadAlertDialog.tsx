import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

interface UploadAlertDialogProps {
    text: string;
    isOpened: boolean;
    handleClose: () => void;
}
 const UploadAlertDialog: React.FC<UploadAlertDialogProps> = ({ text, isOpened, handleClose }) => {
  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UploadAlertDialog;