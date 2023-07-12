import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

const ConfirmDialog = ({
  open,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  }

  const handleDialogAction = (value) => {
    onClose(value);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Delete all tasks</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to delete all tasks including all completed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDialogAction(true)}>Yes</Button>
        <Button onClick={() => handleDialogAction(false)} autoFocus>No</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;