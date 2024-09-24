'use client';
import type { Todo } from '@/services/todo/getTodos';

type Props = {
  todo: Todo;
};

/**
 * TodoItem Component
 */
export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <p>title: {todo.title}</p>
    </>
  );
};
