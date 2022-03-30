import { Action } from "../../constants";
import { mutables } from "../../mutables";

export const setActiveColor: Action = (data, payload) => {
    mutables.activeColor = payload.color;
}