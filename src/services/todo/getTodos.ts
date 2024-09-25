import type { IApiResponse } from '@/types/api/common';
import apiClient from '@/utils/api/apiClient';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TodosResponse = {
  todos: Todo[];
};

/**
 * fetchTodos
 */
export const fetchTodos = async () => {
  // TODO 型
  const response = await apiClient.get<IApiResponse<TodosResponse>>(
    `${process.env.API_FRONT_URL}/api/todo`,
    // { cache: 'no-store' },
    // コメントアウトしている場合は.next/cache/fetch-cacheにキャッシュされる
  );
  return response.data;
};
