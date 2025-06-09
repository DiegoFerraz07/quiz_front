import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/modules/hooks';
import { Container } from '../../style/GlobalStyles';
import axios from '../../services/axios';
import { Div } from './styled';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

export default function Ranking() {
  const token = useAppSelector(state => state.user.token);
  const [ranking, setRanking] = useState([]);
  useEffect(() => {
    async function getRanking() {
      try {
        const response = await axios.get('/ranking/');
        setRanking(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log('error:', error);
      }
    }
    getRanking();
  }, []);
  return (
    <Container>
      <h1>Ranking</h1>
      <Div>
        {!token && (
          <div className="auth-section">
            <Link to="/login">Faça seu login</Link>
            <p></p>
            <Link to="/register">Ainda não possui cadastro? Cadastrar-se</Link>
          </div>
        )}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Aluno</th>
              <th>Jogo</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((response, index) => (
              <tr key={`${response.students.id}-${response.games.id}`}>
                <td>{index + 1}</td>
                <td>
                  {response.students.name} {response.students.lastName}
                </td>
                <td>{response.games.title}</td>
                <td>{response.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Div>
    </Container>
  );
}
