import ACTIONS from './actions';
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user_info: action.data };
    case ACTIONS.REFRESH_DATA:
      return { ...state, refresh: !state.refresh};
    default:
      return state;
  }
};

export default reducer;
