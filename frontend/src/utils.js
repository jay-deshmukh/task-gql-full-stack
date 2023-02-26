/**
 * copyObject is a pure function that expects an object that contains only variables and returns a copy of it.
 */

import { cloneDeep } from 'lodash';

export const copyObject = (obj) => {
let copyObj = cloneDeep(obj);
return copyObj;
}
