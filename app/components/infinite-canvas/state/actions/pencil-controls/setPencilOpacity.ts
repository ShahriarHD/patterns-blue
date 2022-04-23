import { Action } from '../../constants';
import { mutables } from '../../mutables';

export const setPencilOpacity: Action = (data, payload) => {
    mutables.pencilOpacity = payload.opacity;
};
