import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';
import FormWizard from 'react-form-wizard-component';
import { Container } from '../../style/GlobalStyles';
import { CheckBoxWrapper, FormStyles } from './styled';
import { FaGamepad, FaCheck, FaQuestionCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export default function RegisterGame() {
  const navigate = useNavigate();
  const { gameId } = useParams();

  // state table Game
  const [title, setTilte] = useState('');
  const [description, setDescription] = useState('');
  const [is_public, setIsPublic] = useState(false);

  //state table question
  const [statements, setStatement] = useState(Array(10).fill(''));
  const [questionsIds, setQuestionsIds] = useState([]);

  //state table choice
  const [choice, setChoice] = useState(
    Array.from({ length: 10 }, () => Array(5).fill('')),
  );
  const [is_correct, setIsCorrect] = useState(Array(10).fill(null));
  const [choicesIds, setChoicesIds] = useState(
    Array.from({ length: 10 }, () => Array(5).fill(null)),
  );

  useEffect(() => {
    async function getGame() {
      try {
        const response = await axios.get(`/games/${gameId}`);
        setTilte(response.data.title);
        setDescription(response.data.description);
        setIsPublic(response.data.is_public);

        const resQuestion = await axios.get(`/questions/${gameId}`);
        setStatement(resQuestion.data.map(item => item.statement));

        const questionsIds = resQuestion.data.map(item => item.id);
        setQuestionsIds(questionsIds);

        const resChoices = await Promise.all(
          questionsIds.map(questionsId => axios.get(`/choices/${questionsId}`)),
        );

        const choicesIds = resChoices.map(res =>
          res.data.map(choice => choice.id),
        );
        setChoicesIds(choicesIds);

        const choices = resChoices.map(res =>
          res.data.map(choice => choice.choice),
        );

        const isCorrect = resChoices.map(res => {
          const correctIndex = res.data.findIndex(choice => choice.is_correct);
          return correctIndex;
        });
        setChoice(choices);
        setIsCorrect(isCorrect);
      } catch (error) {
        toast.error('error ao buccar o game');
      }
    }
    if (gameId) {
      getGame();
    }
  }, [gameId]);

  const handleComplete = async () => {
    try {
      const dadosGames = { title, description, is_public };
      let responseGames;
      if (gameId) {
        responseGames = await axios.put(`/games/${gameId}`, dadosGames);
      } else {
        responseGames = await axios.post('/games/', dadosGames);
      }

      const gamesId = responseGames.data.id;

      for (let index = 0; index < statements.length; index++) {
        const dadosQuestions = { statement: statements[index] };
        console.log('questões:', dadosQuestions);
        let responseQuestions;
        if (questionsIds[index]) {
          responseQuestions = await axios.put(
            `/questions/${questionsIds[index]}`,
            dadosQuestions,
          );
          console.log('questionAtulaizada', responseQuestions);
        } else {
          responseQuestions = await axios.post(
            `/questions/${gamesId}`,
            dadosQuestions,
          );
        }

        const questionsId = responseQuestions.data.id;

        const dadosChoice = {
          choices: choice[index].map((item, cIndex) => ({
            id: choicesIds[index]?.[cIndex],
            choice: item,
            is_correct: is_correct[index] === cIndex,
          })),
        };
        console.log('choice:', dadosChoice);
        if (choicesIds[index] && choicesIds[index].length > 0) {
          await axios.put(`/choices/${questionsId}`, dadosChoice);
        } else {
          await axios.post(`/choices/${questionsId}`, dadosChoice);
        }
      }
      if (choicesIds) {
        toast.success('Jogo, questões e alternativas atualizados com sucesso!');
      } else {
        toast.success('Jogo, questões e alternativas salvos com sucesso!');
      }

      navigate('/games');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar. Verifique os dados.');
    }
  };

  const isValidForm = async () => {
    if (!title || !description) {
      errorMessages('titulo ou descrição não prenchidos');
      return false;
    }

    return statements.some((st, index) => {
      if (!st || st.trim() === '') {
        errorMessages(`Questão ${index + 1} não prenchidos`);
        return false;
      }

      if (!choice[index].some(text => !text || text.trim() === '')) {
        errorMessages(`Escolha da questão ${index + 1} não prenchidos`);
        return false;
      }

      if (is_correct[index] === null) {
        errorMessages(
          `É obrigatória ter alguma escolha correta. Verifiquer a Questão ${index + 1}`,
        );
        return false;
      }

      return true;
    });
  };

  const errorMessages = (
    message = 'Algum campo não preenchido ou marcado, por favor preencha e marque todos os campos',
  ) => {
    toast.warning(message);
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
            onComplete={handleComplete}
          >
            <FormWizard.TabContent
              title={'Informções do Jogo'}
              icon={<FaGamepad />}
            >
              <h2>{!gameId ? 'Novo Jogo' : 'Editar o ' + title}</h2>
              <p>Título do jogo</p>
              <input
                type="text"
                value={title}
                onChange={e => setTilte(e.target.value)}
                placeholder="Digite o nome do jogo"
              />
              <p>Descrição do jogo</p>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Digite a descrição do jogo"
              />
              <CheckBoxWrapper>
                <label>
                  <input
                    type="checkbox"
                    name="Público"
                    checked={is_public}
                    onChange={e => setIsPublic(e.target.checked)}
                  />
                  Público
                </label>
              </CheckBoxWrapper>
            </FormWizard.TabContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <FormWizard.TabContent
                key={index}
                title={`Questão ${index + 1}`}
                icon={<FaQuestionCircle />}
                showErrorOnTab={
                  !statements[index] ||
                  choice[index].some(text => text.trim() === '') ||
                  is_correct[index] === null
                }
              >
                <p>{`Enunciado da questão de numero ${index + 1}`}</p>
                <input
                  type="text"
                  value={statements[index]}
                  onChange={e => {
                    const updateStatement = [...statements];
                    updateStatement[index] = e.target.value;
                    setStatement(updateStatement);
                  }}
                  placeholder="Digite o enunciado da Questão"
                />
                {Array.from({ length: 5 }).map((_, cIndex) => (
                  <div key={`choice-${index}-${cIndex}`}>
                    <p>{`Alternativa ${cIndex + 1}`}</p>
                    <input
                      type="text"
                      value={choice[index][cIndex]}
                      onChange={e => {
                        const updateChoice = [...choice];
                        updateChoice[index][cIndex] = e.target.value;
                        setChoice(updateChoice);
                      }}
                      placeholder="Digite a alternativa"
                    />
                    <CheckBoxWrapper>
                      <label>
                        <input
                          type="radio"
                          name={`correta-${index}`}
                          value={cIndex}
                          checked={is_correct[index] === cIndex}
                          onChange={() => {
                            const updateCorrectChoice = [...is_correct];
                            updateCorrectChoice[index] = cIndex;
                            setIsCorrect(updateCorrectChoice);
                          }}
                        />
                        Correta
                      </label>
                    </CheckBoxWrapper>
                  </div>
                ))}
              </FormWizard.TabContent>
            ))}

            <FormWizard.TabContent
              isValid={isValidForm()}
              validationError={errorMessages}
              title="Finalizar"
              icon={<FaCheck />}
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
