import React from 'react';

import useTodo from '../../hooks/useTodo';
import TaskLine from './taskLine';

export default function Tasks() {
  const { list } = useTodo();
  return (
    <table>
      {list?.map((props) => (
        <TaskLine {...props} />
      ))}
    </table>
  );
}
