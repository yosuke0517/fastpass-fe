import { TodoItem } from '@/app/_components/TodoItem';
import { fetchTodos } from '@/services/todo/getTodos';

/**
 * TodoList Component
 */
export const TodoList2: React.FC = async () => {
  const { data } = await fetchTodos();
  return (
    <>
      <ul>
        {data.todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
};
