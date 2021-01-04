import { useDispatch, useSelector } from 'react-redux';

import { RootReducerProps } from '../store';
import { todoActions } from '../store/reducers/todo';

export default function useTodo() {
  const { list } = useSelector((state: RootReducerProps) => state.todo);
  const dispatch = useDispatch();

  const add = (content: string) => dispatch(todoActions.add(content));
  const edit = (id: string, content: string) => dispatch(todoActions.edit(id, content));
  const remove = (id: string) => dispatch(todoActions.remove(id));
  const complete = (id: string) => dispatch(todoActions.complete(id));
  const reset = () => dispatch(todoActions.reset());

  return {
    list,
    add,
    edit,
    remove,
    reset,
    complete,
  };
}
