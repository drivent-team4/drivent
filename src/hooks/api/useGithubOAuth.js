import useAsync from '../useAsync';

import * as githubOAuthApi from '../../services/githubOAuthApi';

export default function useGithubOAuth() {
  const {
    loading: githubOAuthLoading,
    error: githubOAuthError,
    act: githubOAuth
  } = useAsync(githubOAuthApi.githubOAuth, false);

  return {
    githubOAuthLoading,
    githubOAuthError,
    githubOAuth
  };
}
