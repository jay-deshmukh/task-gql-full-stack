/**
 * copyObject is a pure function that expects an object that contains only variables and returns a copy of it.
 */

export const copyObject = (obj) => {
  /* Fatma: Problem 2.1. - Commented out - shallow copy and added deep copy below
  const copyObj = {...obj};
  (missing package: npm install --save-dev @babel/preset-env)
   */
  const copyObj = JSON.parse(JSON.stringify(obj)); // deep copy
  return copyObj;
}