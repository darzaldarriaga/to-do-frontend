import {
  Box,
  Button,
  TextField,
  Grid,
} from '@mui/material';

const CreateTask = ({
  task,
  setTask,
  handleSubmit,
  isTaskInvalid,
  handleKeyPress,
}) => {
  return (
    <Grid container columns={24}>
      <Grid xs={18} item={true}>
        <TextField
          size='small'
          fullWidth
          onInput={e => setTask(e.target.value)}
          onKeyUp={e => handleKeyPress(e)}
          error={isTaskInvalid}
          label={isTaskInvalid ? 'Invalid entry' : 'New Task'}
          value={task}
          margin='none'
        />
      </Grid>
      <Grid xs={6} item={true} paddingLeft='5px'>
        <Box display='flex' height='100%' alignItems='center'>
          <Button variant='contained' onClick={() => handleSubmit()}>Add</Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CreateTask;
