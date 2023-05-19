import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label, GitHubButton } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import useGithubOAuth from '../../hooks/api/useGithubOAuth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const code = query.get('code');
  const { githubOAuthLoading, githubOAuth } = useGithubOAuth();

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  async function handleGitHubOauth(event) {
    event.preventDefault();

    try {
      const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
      const params = {
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        redirect_uri: 'http://localhost:3000/sign-in',
        scope: 'user',
        response_type: 'code',
      };

      const queryString = `client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&scope=${params.scope}&response_type=${params.response_type}`;

      window.location.href = `${GITHUB_URL}?${queryString}`;
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  useEffect(() => {
    if (code) {
      const postCode = async() => {
        try {
          const userData = await githubOAuth(code);
          setUserData(userData);
          toast('Login realizado com sucesso!');
          navigate('/dashboard');
        } catch (err) {
          toast('Não foi possível fazer o login!');
        }
      };
      postCode();
    };
  }, []);

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
        <br />
        <p>Or sign in with</p>
        <GitHubButton onClick={handleGitHubOauth} disabled={githubOAuthLoading}>Sign in with GitHub</GitHubButton>
      </Row>
    </AuthLayout>
  );
}
