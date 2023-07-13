import './App.style.css';
import theme from '../../custom-theme';
import {
  Box,
  Paper,
  Button,
  Typography,
  OutlinedInput,
  Snackbar,
  Alert,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import TaskList from '../task/task-list';
import CreateTask from '../task/create-task';
import ConfirmDialog from '../dialog/confirm-dialog';
import InfoDialog from '../dialog/info-dialog';

export default function App() {

  const [ todo, setTodo ] = useState([]);
  const [ finishedTasks, setFinishedTasks ] = useState([]);
  const [ task, setTask ] = useState('');
  const [ term, setTerm ] = useState('');
  const [ searchInitiated, setsearchInitiated ] = useState(false);
  const [ isTaskInvalid, setIsTaskInvalid ] = useState(false);
  const [ openConfirmDialog, setOpenConfirmDialog ] = useState(false);
  const [ snackbarData, setSnackbarData ] = useState({
    autoHideDuration: 5000,
    severity: 'info',
    message: '',
    horizontal: 'center',
    vertical: 'bottom',
  });
  const [ openSnackbar, setOpenSnackbar ] = useState(false);
  const [ openInfoDialog, setOpenInfoDialog ] = useState(false);
  const [ longPressedTask, setLongPressedTask ] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  /**
   * Loads search result when user initiates search
   */
  useEffect(() => {
    if (!!term) {
      fetch(`https://darwin-to-do-api.onrender.com/api/v2/tasks/search/${true}/${term}`).then(
        response => response.json()
      ).then(
        data => setFinishedTasks(data)
      );
  
      fetch(`https://darwin-to-do-api.onrender.com/api/v2/tasks/search/${false}/${term}`).then(
        response => response.json()
      ).then(
        data => setTodo(data)
      );
  
      setsearchInitiated(true);
    } else if (searchInitiated) {
      loadData();
    }
  }, [searchInitiated, term]);

  useEffect(() => {
    if (!!task && isTaskInvalid) setIsTaskInvalid(false);
  }, [task, isTaskInvalid]);

  const loadData = () => {
    fetch("https://darwin-to-do-api.onrender.com/api/v2/tasks/todo").then(
      response => response.json()
    ).then(
      data => {
        setTodo(data)
      }
    );

    fetch("https://darwin-to-do-api.onrender.com/api/v2/tasks/finished").then(
      response => response.json()
    ).then(
      data => {
        setFinishedTasks  (data)
      }
    );
  }

  const handleSubmit = () => {
    if (!task) {
      setIsTaskInvalid(true);
      return;
    }

    fetch("https://darwin-to-do-api.onrender.com/api/v2/tasks/", {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ task })
    }).then(() => loadData());
    setTask('');
  }

  const handleUpdate = (id, is_done) => {
    fetch(`https://darwin-to-do-api.onrender.com/api/v2/tasks/${id}`, {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ is_done })
    }).then(() => loadData());
  }

  const handleDialogResult = (dialogResult) => {
    if (dialogResult) {
      fetch("https://darwin-to-do-api.onrender.com/api/v2/tasks", {
        method: 'DELETE'
      }).then(() => {
        loadData();
        setSnackbarData(data => ({ ...data, message: 'All tasks deleted successfully.' }));
        setOpenSnackbar(true);
      });
    }
    setOpenConfirmDialog(false);
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  const handleLongPress = (task) => {
    setLongPressedTask(task);
    setOpenInfoDialog(true);
  }
  
  const onInfoDialogClose = () => {
    setOpenInfoDialog(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          flexGrow: 1,
        }}
      >
        <Paper  
          elevation={4}
          sx={{
            minWidth: '40%',
            padding: '25px 50px 60px 50px',
          }}
        >
          <Grid
            container
            columns={24}
            rowSpacing={7}
          >
            <Grid xs={12}>
              <Typography variant='h4'>
                Marvelous v2.0
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'right'
              }}
            >
              <Button
                variant='text'
                onClick={() => setOpenConfirmDialog(true)}
              >
                Delete all tasks
              </Button>
            </Grid>
            <Grid xs={12}>
              <CreateTask
                task={task}
                setTask={setTask}
                isTaskInvalid={isTaskInvalid}
                handleSubmit={handleSubmit}
                handleKeyPress={handleKeyPress}
              />
            </Grid>
            <Grid
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'right'
              }}
            >
              <OutlinedInput
                size='small'
                placeholder='Search..'
                onInput={e => setTerm(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid
            container
            columnSpacing={10}
            marginTop={5}
          >
            <Grid xs={6}>
              <TaskList
                tasks={todo}
                handleUpdate={handleUpdate}
                listTitle={'To Do'}
                handleLongPress={handleLongPress}
              />
            </Grid>
            <Grid xs={6}>
              <TaskList
                tasks={finishedTasks}
                handleUpdate={handleUpdate}
                listTitle={'Done'}
                handleLongPress={handleLongPress}
              />
            </Grid>
          </Grid>
        </Paper>
        <ConfirmDialog 
          open={openConfirmDialog}
          onClose={handleDialogResult}
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={snackbarData.autoHideDuration}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: snackbarData.vertical, horizontal: snackbarData.horizontal  }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarData.severity}
            variant='filled'
            sx={{ width: '100%' }}
          >
            {snackbarData.message}
          </Alert>
        </Snackbar>
        <InfoDialog
          open={openInfoDialog}
          onClose={onInfoDialogClose}
          task={longPressedTask}
        />
      </Box>
    </ThemeProvider>
  );
}
