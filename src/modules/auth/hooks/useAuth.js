import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';
import { LOGIN, REGISTRARME } from '@/infrastructure/graphql/operations';
import { useAuthStore } from './useAuthStore';

export function useLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [mutate, { loading, error }] = useMutation(LOGIN);
  const [formError, setFormError] = useState(null);

  async function submit({ email, password }) {
    setFormError(null);
    try {
      const { data } = await mutate({ variables: { email, password } });
      const { token, usuario } = data.login;
      login(token, usuario);
      const roleRoutes = {
        admin: '/admin',
        entrenador: '/entrenador',
        cliente: '/cliente',
      };
      navigate(roleRoutes[usuario.rol] ?? '/');
    } catch (err) {
      setFormError(err.message);
    }
  }

  return { submit, loading, error: formError ?? error?.message };
}

export function useRegister() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [mutate, { loading }] = useMutation(REGISTRARME);
  const [formError, setFormError] = useState(null);

  async function submit(input) {
    setFormError(null);
    try {
      const { data } = await mutate({ variables: { input } });
      const { token, usuario } = data.registrarme;
      login(token, usuario);
      navigate('/cliente');
    } catch (err) {
      setFormError(err.message);
    }
  }

  return { submit, loading, error: formError };
}
