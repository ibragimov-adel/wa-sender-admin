import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import IRecipient from '../models/IRecipient';
import IEvent from '../models/IEvent';
import ITemplate from '../models/ITemplate';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${
      window.location.hostname === 'localhost'
        ? `localhost:5000`
        : window.location.host
    }/api`,
  }),
  tagTypes: ['Recipients', 'Events', 'Templates'],
  endpoints: (builder) => ({
    // ============ RECIPIENTS ============
    getAllRecipients: builder.query<IRecipient[], void>({
      query: () => `/recipients`,
      providesTags: ['Recipients'],
    }),
    createRecipient: builder.mutation<void, Omit<IRecipient, 'id'>>({
      query: (recipient) => ({
        url: `/recipients`,
        method: 'POST',
        body: recipient,
      }),
      invalidatesTags: ['Recipients'],
    }),
    updateRecipientById: builder.mutation<void, IRecipient>({
      query: ({ id, ...data }) => ({
        url: `/recipients/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Recipients'],
    }),
    deleteRecipientById: builder.mutation<void, IRecipient>({
      query: ({ id }) => ({
        url: `/recipients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipients'],
    }),
    uploadFile: builder.mutation<void, FormData>({
      query: (body) => ({
        url: `/recipients/upload`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Recipients'],
    }),

    // ============ EVENTS ============
    getAllEvents: builder.query<IEvent[], void>({
      query: () => `/events`,
      providesTags: ['Events'],
    }),
    createEvent: builder.mutation<void, Omit<IEvent, 'id'>>({
      query: (event) => ({
        url: `/events`,
        method: 'POST',
        body: event,
      }),
      invalidatesTags: ['Events'],
    }),
    updateEventById: builder.mutation<void, IEvent>({
      query: ({ id, ...data }) => ({
        url: `/events/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Events', 'Recipients'],
    }),
    deleteEventById: builder.mutation<void, IEvent>({
      query: ({ id }) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Events', 'Recipients'],
    }),

    // ============ TEMPLATES ============
    getAllTemplates: builder.query<ITemplate[], void>({
      query: () => `/templates`,
      providesTags: ['Templates'],
    }),
    createTemplate: builder.mutation<void, Omit<ITemplate, 'id'>>({
      query: (template) => ({
        url: `/templates`,
        method: 'POST',
        body: template,
      }),
      invalidatesTags: ['Templates'],
    }),
    updateTemplateById: builder.mutation<void, ITemplate>({
      query: ({ id, ...data }) => ({
        url: `/templates/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Templates'],
    }),
    deleteTemplateById: builder.mutation<void, ITemplate>({
      query: ({ id }) => ({
        url: `/templates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Templates'],
    }),
  }),
});

export const {
  useGetAllRecipientsQuery,
  useCreateRecipientMutation,
  useUpdateRecipientByIdMutation,
  useDeleteRecipientByIdMutation,
  useUploadFileMutation,

  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventByIdMutation,
  useDeleteEventByIdMutation,

  useGetAllTemplatesQuery,
  useCreateTemplateMutation,
  useUpdateTemplateByIdMutation,
  useDeleteTemplateByIdMutation,
} = api;
