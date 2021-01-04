import React, { useState, useRef, useEffect } from 'react';

import { Text, IconButton } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import {
  MdSave, MdDone, MdEdit, MdDelete,
} from 'react-icons/md';

import useTodo from '../../hooks/useTodo';
import { ListItemProps } from '../../store/reducers/todo';

export default function TaskLine({
  id, task, date, completed,
}: ListItemProps) {
  const { remove, edit, complete } = useTodo();
  const [isEditing, setEdition] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  function handleEdition() {
    edit(id, descriptionRef.current?.innerText ?? 'Sem conteúdo');
    setEdition(false);
  }

  useEffect(() => {
    if (isEditing) {
      descriptionRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <tr key={id}>
      <td>
        <Text
          ref={descriptionRef}
          contentEditable={isEditing}
          textDecoration={completed ? 'line-through' : 'normal'}
        >
          {task}
        </Text>
      </td>
      <td>
        <Text>{DateTime.fromMillis(Date.parse(date)).toLocaleString()}</Text>
      </td>
      <td>
        {isEditing ? (
          <IconButton
            variant="ghost"
            boxSize={6}
            color="green.500"
            as={MdSave}
            onClick={() => handleEdition()}
            disabled={completed}
            aria-label="Save edition"
          />
        ) : (
          <IconButton
            variant="ghost"
            boxSize={6}
            color="green.500"
            as={MdDone}
            onClick={() => complete(id)}
            disabled={completed}
            aria-label="Task is done"
          />
        )}
        <IconButton
          variant="ghost"
          boxSize={6}
          color={isEditing ? 'gray.300' : 'yellow.500'}
          as={MdEdit}
          disabled={isEditing || completed}
          onClick={() => setEdition(true)}
          aria-label="Task is editing"
        />
        <IconButton
          variant="ghost"
          boxSize={6}
          color="red.800"
          onClick={() => remove(id)}
          as={MdDelete}
          disabled={completed}
          aria-label="Task got deleted"
        />
      </td>
    </tr>
  );
}
