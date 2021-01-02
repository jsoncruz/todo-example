import React, { useEffect } from 'react';

import {
  Flex,
  Grid,
  List,
  Icon,
  Text,
  Input,
  Stack,
  Button,
  Heading,
  useToast,
  ListItem,
  IconButton,
  InputGroup,
  FormControl,
  InputRightElement,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'luxon';
import { useForm } from 'react-hook-form';
import {
  MdAdd,
  MdDone,
  MdEdit,
  MdDelete,
} from 'react-icons/md';
import * as Yup from 'yup';

import useTodo from '../../hooks/useTodo';

interface FormProps {
  task: string;
}

const schema: any = Yup.object().shape({
  task: Yup
    .string()
    .required('Por favor, descreva a sua tarefa!')
    .min(10, 'Sua tarefa deve ter ao menos 10 digitos'),
});

export default function Home() {
  const { add, list } = useTodo();

  const {
    register, handleSubmit, errors, setValue,
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  function onSubmit({ task }: FormProps) {
    add(task);
    setValue('task', '');
  }

  useEffect(() => {
    if (errors.task) {
      toast({
        title: 'Um problema ocorreu',
        description: errors.task.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [errors.task, toast]);

  return (
    <Grid
      w="100vw"
      h="100vh"
      templateRows="60px 1fr"
      templateColumns="1fr"
      templateAreas="
        'topBar'
        'body'
      "
    >
      <Flex
        px={2}
        py={4}
        gridArea="topBar"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.50"
      >
        <Heading size="md">Todo - A fazer</Heading>
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)} w="500px">
          <InputGroup>
            <Input
              ref={register}
              name="task"
              variant="filled"
              placeholder="Digite a tarefa"
            />
            <InputRightElement>
              <Button size="sm" colorScheme="gray" type="submit">
                <Icon
                  as={MdAdd}
                  size="sm"
                  aria-label="add task"
                  color="gray.500"
                  cursor="pointer"
                />
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <div />
      </Flex>
      <Flex gridArea="body" justifyContent="center">
        <List>
          {list?.map(({ id, task, date }) => (
            <ListItem key={id}>
              <Stack alignItems="center" isInline>
                <Text>{task}</Text>
                <Text>{DateTime.fromISO(date).toLocaleString()}</Text>
                <IconButton boxSize={6} as={MdDone} aria-label="Task is done" />
                <IconButton boxSize={6} as={MdEdit} aria-label="Task is editing" />
                <IconButton boxSize={6} as={MdDelete} aria-label="Task got deleted" />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Grid>
  );
}
