export const SET_SIZE = 'lister/SET_SIZE';
export const SET_CARDS = 'lister/SET_CARDS';

const initialState = {
  cards: [],
  size: 10
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SIZE:
      return {
        ...state,
        size: action.size
      };

    case SET_CARDS:
      return {
        ...state,
        cards: action.cards
      };

    default:
      return state
  }
}

export const setSize = size => {
  return dispatch => {
    dispatch({
      type: SET_SIZE,
      size
    });

    fetch(`https://api.magicthegathering.io/v1/cards?pageSize=${size}`)
      .then(res => res.json())
      .then(({ cards }) => {
        dispatch({
          type: SET_CARDS,
          cards
        });
      });
  }
};
