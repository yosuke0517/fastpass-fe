import { NextResponse } from 'next/server';
import type { IApiResponse } from '@/types/api/common';
import { ErrorNames } from '@/types/api/common';

/**
 * test API
 */
export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const todos = [
      {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      },
    ];
    const response: IApiResponse<{ todos: typeof todos }> = {
      data: { todos },
      status: {
        errors: [],
        isSuccess: true,
        statusCode: 200,
      },
    };
    console.log(`[${new Date().toISOString()}] Todos fetched:`, todos);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error handling GET request:', error);

    const errorResponse: IApiResponse<null> = {
      data: null,
      status: {
        errors: [ErrorNames.E_SERVER_ERROR],
        isSuccess: false,
        statusCode: 500,
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
