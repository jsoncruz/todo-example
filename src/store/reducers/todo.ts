import { DateTime } from 'luxon';
import { Reducer } from 'redux';

enum ActionTypes {
  add = 'todo/add',
  remove = 'todo/remove',
  edit = 'todo/edit',
  reset = 'todo/reset',
}

interface ListItemProps {
  id: string;
  task: string;
  date: string;
}

export interface TodoStateProps {
  list: Array<ListItemProps>;
}

export interface TodoActionProps {
  type: ActionTypes;
  value?: any;
}

const initialState = {
  list: [],
};

const todo: Reducer<TodoStateProps, TodoActionProps> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.add:
      return { ...state, list: [...state.list, action.value] };
    case ActionTypes.reset:
      return initialState;
    default:
      return state;
  }
};

export const todoActions = {
  add: (content: string) => ({
    type: ActionTypes.add,
    value: {
      id: DateTime.local().toMillis(),
      task: content,
      date: DateTime.local().toJSDate().toString(),
    },
  }),
  reset: () => ({ type: ActionTypes.reset }),
};

export default todo;
