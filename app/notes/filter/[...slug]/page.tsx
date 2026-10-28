import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export const dynamic = 'force-dynamic';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, '', 1],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
