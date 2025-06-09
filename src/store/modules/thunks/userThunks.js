import axios from '../../../services/axios';
import { login, logout } from '../slices/userSlice';

export const loginUser = credencials => async dispatch => {
  try {
    const response = await axios.post('/tokens', credencials);
    const { user, token } = response.data;
    const { id, name, lastName, email, role } = user;
    dispatch(login({ user: { id, name, lastName, email, role }, token }));
    return { success: true, token, userName: user.name };
  } catch (error) {
    console.log('Erro ao fazer login', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Erro dewsconhecido',
    };
  }
};
export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    const token = getState().user.token;
    if (!token) throw new Error('Token não encontrado. Faça login novamente.');

    const response = await axios.get('/tokens/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { user } = response.data;
    const { id, name, lastName, email, role } = user;
    dispatch(login({ user: { id, name, lastName, email, role }, token }));
    return { success: true, token };
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    dispatch(logout());
    return {
      success: false,
      message: error.response?.data?.message || 'Erro desconhecido',
    };
  }
};

export const logoutUser = () => dispatch => {
  dispatch(logout());
};
