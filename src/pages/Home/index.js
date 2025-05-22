import React from 'react';
import { useAppSelector } from '../../store/modules/hooks';
import { Container } from '../../style/GlobalStyles';
import { Div } from './styled';
import { Link } from 'react-router-dom';

export default function Home() {
  const token = useAppSelector(state => state.user.token);
  console.log('token:', token);
  return (
    <Container>
      <h1>Seja bem-vindo ao GameQuiz</h1>
      <Div>
        {!token && (
          <div className="auth-section">
            <Link to="/login">Faça seu login</Link>
            <p></p>
            <Link to="/register">Ainda não possui cadastro? Cadastrar-se</Link>
          </div>
        )}
        <h2>Sobre:</h2>
        <p>
          O GameQuiz é uma plataforma educacional que transforma o processo de
          ensino em uma experiência dinâmica e envolvente. Inspirada em
          estratégias de gamificação, ela permite que professores estimulem seus
          alunos a aprender de forma divertida e competitiva, promovendo uma
          aprendizagem ativa e colaborativa.
        </p>
        <h2>Como Funciona:</h2>
        <ul>
          <li>O professor cria o jogo.</li>
          <li>O jogo contém 10 questões.</li>
          <li>Cada questão tem 5 alternativas, sendo apenas uma correta.</li>
          <li>O jogo pode ser configurado como privado.</li>
          <li>
            Se o jogo for privado, somente os alunos selecionados pelo professor
            podem jogar.
          </li>
          <li>O aluno tem apenas uma chance para jogar.</li>
          <li>Cada questão acertada vale um ponto.</li>
          <li>
            O ranking exibirá os melhores jogadores em ordem decrescente de
            pontuação.
          </li>
        </ul>
      </Div>
    </Container>
  );
}
