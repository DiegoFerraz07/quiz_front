import React from 'react';
import { Form } from './styled';
import { Container } from '../../style/GlobalStyles';

export default function Login() {
  return (
    <Container>
      <h1>Login</h1>
      <Form>
        <input type="email" placeholder="Digite seu email" />
        <input type="password" placeholder="Digite sua senha" />
        <label>
          <input type="radio" name="role" value="Estudante" />
          Estudante
        </label>
        <label>
          <input type="radio" name="role" value="Professor" />
          Professor
        </label>
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
