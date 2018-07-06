import { Issuance } from './../types';

const initialState = {
  headerRef: null,
};

const issuanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case Issuance.SET_HEADER_REF: {
      const { ref } = action.payload;
      
      return {
        ...state,
        headerRef: ref,
      }
    }

    default:
      return state;
  }
}

export default issuanceReducer;