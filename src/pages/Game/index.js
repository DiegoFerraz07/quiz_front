import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';
import FormWizard from 'react-form-wizard-component';
import { Container } from '../../style/GlobalStyles';
import { CheckBoxWrapper, FormStyles, List } from './styled';
import { FaGamepad, FaCheck, FaQuestionCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/modules/hooks';

export default function Game() {
  const navigate = useNavigate();
  const { gameId } = useParams();

  const { name, id } = useAppSelector(state => state.user.user);

  // state table Game
  const [title, setTilte] = useState('');
  const [description, setDescription] = useState('');

  //state table question
  const [statements, setStatement] = useState(Array(10).fill(''));

  //state table choice
  const [choice, setChoice] = useState(
    Array.from({ length: 10 }, () => Array(5).fill('')),
  );
  const [choicesIds, setChoicesIds] = useState(
    Array.from({ length: 10 }, () => Array(5).fill(null)),
  );

  const [answers, setAnswers] = useState(Array(10).fill(null));

  useEffect(() => {
    async function getGame() {
      try {
        const response = await axios.get(`/games/${gameId}`);
        setTilte(response.data.title);
        setDescription(response.data.description);

        const resQuestion = await axios.get(`/questions/${gameId}`);
        setStatement(resQuestion.data.map(item => item.statement));

        const qIds = resQuestion.data.map(item => item.id);

        const resChoices = await Promise.all(
          qIds.map(questionsId => axios.get(`/choices/${questionsId}`)),
        );

        const choicesIds = resChoices.map(res =>
          res.data.map(choice => choice.id),
        );

        const choices = resChoices.map(res =>
          res.data.map(choice => choice.choice),
        );

        setChoicesIds(choicesIds);
        setChoice(choices);
      } catch (error) {
        toast.error('error ao buccar o game');
      }
    }
    if (gameId) {
      getGame();
    }
  }, [gameId]);

  const handleCompleteGame = async () => {
    try {
      await Promise.all(
        answers.map(async choiceId => {
          await axios.post(`/answers/${choiceId}`);
        }),
      );
      await axios.post('/ranking/', {
        gamesId: gameId,
        studentId: id,
      });
      toast.success(`Jogo concluido, ${name}. Obrigado por participa!`);
      navigate('/dashboard');
    } catch (error) {
      console.log('error:', error);
      toast.error('Erro ao salvar as resposta');
    }
  };

  const checkValidateTab = () => {
    return answers.some(ans => ans === null || ans === '' || ans === undefined);
  };

  const errorMessages = () => {
    toast.warning('É obrigatorio marcar todas as questões');
  };
  return (
    <>
      <Container>
        <FormStyles>
          <FormWizard
            shape="circle"
            nextButtonText="Próxima"
            backButtonText="Voltar"
            finishButtonText="Enviar"
            onComplete={handleCompleteGame}
          >
            <FormWizard.TabContent
              title={'Informções do Jogo'}
              icon={<FaGamepad />}
            >
              <h2>
                Bem vindo ao jogo -
                <span style={{ color: '#3B82F6' }}> {title}</span>
              </h2>

              <p>Sobre:</p>
              <span className="description">{description}</span>
              <List>
                <p>Regras:</p>
                <ul>
                  <li>Jogo tem 10 questões com 5 alternativas</li>
                  <li>
                    O jogador tem que escolher uma alternativa correta por
                    questão
                  </li>
                  <li>
                    O jogador não pode deixar nenhuma questão sem responder
                  </li>
                  <li>Cada questão vale um ponto</li>
                </ul>
              </List>
              <h2 style={{ marginBottom: '5px' }}>Boa Sorte!</h2>
            </FormWizard.TabContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <FormWizard.TabContent
                key={index}
                title={`Questão ${index + 1}`}
                icon={<FaQuestionCircle />}
                showErrorOnTab={answers[index] === null}
              >
                <p>
                  {`${index + 1})`} {statements[index]}
                </p>

                {Array.from({ length: 5 }).map((_, cIndex) => (
                  <div key={`choice-${index}-${cIndex}`}>
                    <CheckBoxWrapper>
                      <label>
                        <input
                          type="radio"
                          name={`correta-${index}`}
                          value={choicesIds[index][cIndex]}
                          checked={answers[index] === choicesIds[index][cIndex]}
                          onChange={() => {
                            const updateAnswers = [...answers];
                            updateAnswers[index] = choicesIds[index][cIndex];
                            setAnswers(updateAnswers);
                          }}
                        />
                        {choice[index][cIndex]}
                      </label>
                    </CheckBoxWrapper>
                  </div>
                ))}
              </FormWizard.TabContent>
            ))}

            <FormWizard.TabContent
              isValid={!checkValidateTab()}
              validationError={errorMessages}
              title="Finalizar"
              icon={<FaCheck />}
              showErrorOnTab={checkValidateTab()}
            >
              <p>
                Antes de prosseguir recomendamos que revise todas as questões
              </p>
            </FormWizard.TabContent>
          </FormWizard>
        </FormStyles>
      </Container>
    </>
  );
}
