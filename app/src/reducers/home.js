const INITIAL_STATE = {
  num: 0,
  noBinding: false,
  openid: '',
  user: {},
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'save':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
