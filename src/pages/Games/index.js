import React, { useEffect, useState } from 'react';
import { Container } from '../../style/GlobalStyles';
import { ButtonGroup, Card, CardContainer, HeaderRow } from './styled';
import axios from '../../services/axios';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../store/modules/hooks';

export default function Games() {
  const [games, setGames] = useState([]);
  const role = useAppSelector(state => state.user.user.role);
  const navigate = useNavigate();
  const { id } = useAppSelector(state => state.user.user);

  useEffect(() => {
    async function getGames() {
      let response;
      if (role === 'Professor') {
        response = await axios.get(`/games/my-games/${id}`);
      } else {
        response = await axios.get('/games');
      }
      setGames(Array.isArray(response.data) ? response.data : []);
      console.log(response.data);
    }
    getGames();
  }, [role, id]);

  const handleDelete = async id => {
    try {
      await axios.delete(`/games/${id}`);
      toast.success('Jogo excluido com sucesso');

      const novosGames = games.filter(game => game.id !== id);
      setGames(novosGames);
    } catch (error) {
      console.log('error a esxcluir:', error);
      toast.error('Erro ao excluir o jogo');
    }
  };

  return (
    <Container>
      <h1>{role === 'Professor' ? 'Seus Jogos' : 'Jogos'}</h1>

      <HeaderRow>
        <span>Título</span>
        <span>Descrição</span>
        <span>Status</span>
      </HeaderRow>

      {games.map(game => (
        <CardContainer key={game.id}>
          <Card onClick={() => navigate(`/registerGame/${game.id}`)}>
            <span>{game.title}</span>
            <span>{game.description}</span>
            <span>{game.is_public ? 'Público' : 'Privado'}</span>
          </Card>
          <ButtonGroup>
            {role === 'Professor' ? (
              <>
                <button onClick={() => navigate(`/editGame/${game.id}`)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(game.id)}>Excluir</button>
              </>
            ) : (
              <button
                style={{ backgroundColor: '#3B82F6' }}
                onClick={() => navigate(`/game/${game.id}`)}
              >
                Jogar
              </button>
            )}
          </ButtonGroup>
        </CardContainer>
      ))}
      {role === 'Professor' && (
        <Card onClick={() => navigate('/registerGame')} style={{ width: 200 }}>
          Novo Jogo <FaPlus size={15} />
        </Card>
      )}
    </Container>
  );
}
