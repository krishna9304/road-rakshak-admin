import { ActionTypes } from "../constants/actionconstants";

export const setUser = (user) => ({
  type: ActionTypes.AUTHENTICATED_USER,
  payload: user,
});
export const setAuth = (auth) => ({
  type: ActionTypes.AUTH,
  payload: auth,
});
