
import { types } from "../../types/types";

export const authReducer = (state = {}, acction) => {
  switch (acction.type) {
    case types.login:
      return {
        ...acction.payload,
        logged: true,
      };
    case types.logout:
      return {
        logged: false,
      };
    default:
      return state;
  }
};
