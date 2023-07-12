import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const InfoDialog = ({
  open,
  onClose,
  task,
}) => {
  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>
        Task Details
        {onClose ? (
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          { task.task ? task.task.toString() : '' }
        </Typography>
        <Grid container>
          <Grid xs={6} item={true}>
            <Typography gutterBottom variant="caption">
              This task was created on: <br/>
            </Typography>
            <Typography gutterBottom variant="caption">
              { task.created_at ? new Date(task.created_at).toLocaleDateString() : '' }<br/>
            </Typography>
            <Typography gutterBottom variant="caption">
              { task.created_at ? new Date(task.created_at).toLocaleTimeString() : '' }<br/>
            </Typography>
          </Grid>
          {task.is_done && (
            <Grid xs={6} item={true}>
              <Typography gutterBottom variant="caption">
                This task was finished on: <br/>
              </Typography>
              <Typography gutterBottom variant="caption">
                { new Date(task.finished_at).toLocaleDateString() }<br/>
              </Typography>
              <Typography gutterBottom variant="caption">
                { new Date(task.finished_at).toLocaleTimeString() }<br/>
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default InfoDialog;