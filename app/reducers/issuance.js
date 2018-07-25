import { Issuance } from './../types';

const initialState = {
  headerRef: null,
  details: [],
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

    case Issuance.SET_DETAIL_LIST: {
      const { details } = action.payload;

      return {
        ...state,
        details: details,
      }
    }

    default:
      return state;
  }
}

export default issuanceReducer;