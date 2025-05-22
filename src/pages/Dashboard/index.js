import React, { useEffect } from 'react';
import { fetchUserProfile } from '../../store/modules/thunks/userThunks';
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';

export default function Dashboard() {
  const token = useAppSelector(state => state.user.token);
  console.log('token dash:', token);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const buscarPerfil = async () => {
      const resultado = await dispatch(fetchUserProfile());
      console.log('user', resultado);
      if (!resultado.success) {
        console.log('Erro ao buscar perfil:', resultado.payload?.message);
        // aqui você pode redirecionar para login, exibir alerta etc.
      }
    };

    buscarPerfil();
  }, [dispatch]);
  return (
    <div>
      <p>dashboard</p>
    </div>
  );
}
