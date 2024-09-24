import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { fetchTodos } from '@/services/todo/getTodos';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Piapass',
  description: 'Piapass',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { data } = await fetchTodos();
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main>
          {children}
          {/*{data.todos.map((todo) => (*/}
          {/*  <div key={todo.id}>layout todo title: {todo.title}</div>*/}
          {/*))}*/}
        </main>
      </body>
    </html>
  );
}
