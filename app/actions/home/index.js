import { Issuance } from './../../types';

export const setHeaderRef = (ref) => ({
  type: Issuance.SET_HEADER_REF,
  payload: {
    ref
  }
});