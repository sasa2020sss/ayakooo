const initialState = {
  users: {},
  isLogin: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'IS_LOGIN':
      return {
        ...state,
        users: action.payload,
        isLogin: true,
      };
    case 'IS_LOGOUT':
      return {
        ...state,
        isLogin: false,
      };
    case 'LOAD_DATA_USER':
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
