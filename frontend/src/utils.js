/**
 * copyObject is a pure function that expects an object that contains only variables and returns a copy of it.
 */

export const copyObject = (obj) => {
  const copyObj = JSON.parse(JSON.stringify(obj));
  return copyObj;
}