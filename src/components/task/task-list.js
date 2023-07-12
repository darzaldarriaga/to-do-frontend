import './task-list.style.css'
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useLongPress } from 'use-long-press';

const TaskList = ({
  tasks,
  handleUpdate,
  listTitle,
  handleLongPress
}) => {
  const bind = useLongPress((e, { context }) => {
    handleLongPress(context)
  });

  return (
    <>
      <Typography variant='h5' className='List-title'>{listTitle}</Typography>
      <List dense className='List'>
        {!!tasks.length && tasks.map((item, i) => {
          const { id, task, is_done } = item;

          return (
            <ListItem
              key={i}
              disablePadding
              { ...bind(item) }
            >
              <ListItemButton role='undefined'>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={is_done}
                    className='Task-checkbox'
                    onChange={(e) => handleUpdate(id, e.target.checked)}/>
                </ListItemIcon>
                <ListItemText
                  id={id}
                  primary={task}
                  sx={{ wordWrap: 'break-word' }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default TaskList;