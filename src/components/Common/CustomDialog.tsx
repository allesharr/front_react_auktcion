import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface ICustomDialog {
  open: boolean,
  setOpen: (value: boolean) => void,
  content: React.ReactNode,
  maxWidth?: false | "sm" | "xs" | "md" | "lg" | "xl" | undefined,
  title?: string 
}

const CustomDialog: React.FC<ICustomDialog> = ({open, setOpen, content, maxWidth = "sm", title}) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {
              content
            } 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default CustomDialog