import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

const notehubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes({
  page,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await notehubApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search.trim() !== '' && { search: search.trim() }),
      ...(tag && { tag }),
    },
  });

  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await notehubApi.get<Note>(`/notes/${noteId}`);

  return response.data;
}

export async function createNote(newNote: CreateNoteParams): Promise<Note> {
  const response = await notehubApi.post<Note>('/notes', newNote);

  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await notehubApi.delete<Note>(`/notes/${noteId}`);

  return response.data;
}
