import React from 'react';
import { useAppSelector } from '../../store/modules/hooks';
import { Container } from '../../style/GlobalStyles';
import { Card, CardContainer } from './styled';
import { FaGamepad, FaMedal, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const role = useAppSelector(state => state.user.user.role);
  const navigate = useNavigate();
  console.log(role);
  return (
    <Container>
      <h1>
        {role === 'Professor' ? 'Painel do Professor' : 'Painel do Estudante'}
      </h1>
      <CardContainer>
        {role === 'Professor' && (
          <Card onClick={() => navigate('/registerGame')}>
            <h2>Crie seu Jogo </h2>
            <FaPlus size={20} color="#22C55E" />
          </Card>
        )}
        <Card onClick={() => navigate('/games')}>
          <h2>{role === 'Professor' ? 'Seus Jogos' : 'Jogos'}</h2>
          <FaGamepad size={20} color="#3B82F6" />
        </Card>
        <Card onClick={() => navigate('/ranking')}>
          <h2>Ranking</h2>
          <FaMedal size={20} color="#F8D210" />
        </Card>
      </CardContainer>
    </Container>
  );
}
