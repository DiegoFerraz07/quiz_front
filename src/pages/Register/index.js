import React, { useState } from 'react';
import { Container } from '../../style/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/modules/hooks';

export default function Register() {
  const {
    id,
    name: nameUser,
    lastName: lastNameUser,
    email: emailUser,
    role: roleUser,
  } = useAppSelector(state => state.user.user);

  const [name, setName] = useState(nameUser || '');
  const [lastName, setLastName] = useState(lastNameUser || '');
  const [email, setEmail] = useState(emailUser || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(roleUser || '');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const dados = { name, lastName, email, password };
      const routes = {
        Professor: '/teachers',
        Estudante: '/students',
      };

      const route = routes[role];
      if (!route) {
        toast.warning('Precisa informar se você é Estudante ou Professor');
        return;
      }

      if (id) {
        await axios.put(route, dados);
        toast.success(`Olá ${role}, seu cadastro foi atualizado com sucesso.`);
      } else {
        await axios.post(route, dados);
        toast.success(`Olá ${role}, seu cadastro foi realizado com sucesso.`);
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data.errors || error.response.data;

        // Se for objeto, mostra cada mensagem separadamente
        if (typeof errors === 'object') {
          Object.values(errors).forEach(msg => toast.error(msg));
        } else {
          // Se for string só mostra direto
          toast.error(errors);
        }
      } else {
        toast.error('Erro desconhecido');
      }
    }
  };

  return (
    <Container>
      <h1>{id ? 'Editar dados' : 'Crie Sua Conta'}</h1>
      <Form onSubmit={handleSubmit}>
        <p>Nome:</p>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Digite seu nome"
        />
        <p>Sobrenome:</p>
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Digite seu sobrenome"
        />
        <p>Email:</p>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <p>Senha:</p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
        {!id && (
          <>
            <label>
              <input
                type="radio"
                name="role"
                checked={role === 'Estudante'}
                onChange={e => setRole(e.target.value)}
                value="Estudante"
              />
              Estudante
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
          </>
        )}
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
