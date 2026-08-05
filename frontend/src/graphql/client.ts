import { GraphQLClient } from 'graphql-request';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql';

export const graphqlClient = new GraphQLClient(API_URL, {
  headers: () => {
    const token = localStorage.getItem('accessToken');
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  },
  responseMiddleware: (response) => {
    if (response instanceof Error) {
      const message = response.message?.toLowerCase() || '';
      if (
        message.includes('não autenticado') ||
        message.includes('unauthorized') ||
        message.includes('jwt expired') ||
        message.includes('access denied')
      ) {
        window.dispatchEvent(new Event('unauthorized'));
      }
    }
  },
});
