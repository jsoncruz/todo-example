import { list } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Reducer } from 'redux';

enum ActionTypes {
  add = 'todo/add',
  remove = 'todo/remove',
  edit = 'todo/edit',
  reset = 'todo/reset',
  complete = 'todo/complete',
}

export interface ListItemProps {
  id: string;
  task: string;
  date: string;
  completed: boolean;
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
    case ActionTypes.edit:
      return {
        ...state,
        list: state.list.map((item) => {
          if (action.value.id === item.id) {
            return { ...item, task: action.value.content };
          }
          return item;
        }),
      };
    case ActionTypes.remove:
      return { ...state, list: state.list.filter(({ id }) => id !== action.value) };
    case ActionTypes.complete:
      return {
        ...state,
        list: state.list.map((item) => {
          if (action.value === item.id) {
            return { ...item, completed: true };
          }
          return item;
        }),
      };
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
      completed: false,
    },
  }),
  edit: (id: string, content: string) => ({ type: ActionTypes.edit, value: { id, content } }),
  remove: (id: string) => ({ type: ActionTypes.remove, value: id }),
  complete: (id: string) => ({ type: ActionTypes.complete, value: id }),
  reset: () => ({ type: ActionTypes.reset }),
};

export default todo;
