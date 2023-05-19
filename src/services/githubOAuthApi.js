import api from './api';

export async function githubOAuth(code) {
  const response = await api.post('/auth/oauth-github', { code });
  return response.data;
}
