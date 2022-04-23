import { Action } from '../../constants';
import { mutables } from '../../mutables';

export const setPencilSize: Action = (data, payload) => {
    mutables.pencilStrokeWidth = payload.size;
};
