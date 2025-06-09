import React, { useState } from 'react';
import { Form } from './styled';
import { Container } from '../../style/GlobalStyles';
import { useAppDispatch } from '../../store/modules/hooks';
import { loginUser } from '../../store/modules/thunks/userThunks';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Estudante');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async e => {
    e.preventDefault();

    const credentials = { email, password, role };

    const { success, token, userName } = await dispatch(loginUser(credentials));
    if (success && token) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
      toast.success(`Olá ${userName}, login realizado com sucesso, Ben-vindo.`);
    } else {
      toast.error('Erro ao logar');
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <p>Email:</p>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <p>Senha</p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
        <label>
          <input
            type="radio"
            name="role"
            checked={role === 'Estudante'}
            onChange={e => setRole(e.target.value)}
            value="Estudante"
          />
          Estudante:
        </label>
        <label>
          <input
            type="radio"
            name="role"
            checked={role === 'Professor'}
            onChange={e => setRole(e.target.value)}
            value="Professor"
          />
          Professor
        </label>
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
