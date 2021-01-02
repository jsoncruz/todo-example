import { useDispatch, useSelector } from 'react-redux';

import { RootReducerProps } from '../store';
import { todoActions } from '../store/reducers/todo';

export default function useTodo() {
  const { list } = useSelector((state: RootReducerProps) => state.todo);
  const dispatch = useDispatch();

  const add = (content: string) => dispatch(todoActions.add(content));
  const reset = () => dispatch(todoActions.reset());

  return { list, add, reset };
}
