import type { Action } from '../../constants';
import { mutables } from '../../mutables';

export const clearPointedBoundsHandle: Action = () => {
    mutables.pointedBoundsHandleId = undefined;
};
