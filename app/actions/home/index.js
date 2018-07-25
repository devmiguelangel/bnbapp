import { Issuance } from './../../types';

export const setHeaderRef = (ref) => ({
  type: Issuance.SET_HEADER_REF,
  payload: {
    ref,
  }
});

export const setDetailList = (details) => ({
  type: Issuance.SET_DETAIL_LIST,
  payload: {
    details,
  }
})