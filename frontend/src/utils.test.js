import {copyObject} from './utils';

test('Copy Object', () => {
  const obj = {
    alpha: 'Alpha',
    bravo: {
      charlie: 'Charlie',
    }
  }
  const copiedObject = copyObject(obj);
  expect(copiedObject).toEqual(obj)
});

test('Copied object is manipulated', () => {
  const obj = {
    alpha: 'Alpha',
    bravo: {
      charlie: 'Charlie',
    }
  }
  const copiedObject = copyObject(obj);
  copiedObject.delta = "Delta"
  expect(copiedObject).not.toEqual(obj)
});

test('Copied object is deeply manipulated', () => {
  const obj = {
    alpha: 'Alpha',
    bravo: {
      charlie: 'Charlie',
    }
  }
  const copiedObject = copyObject(obj);
  copiedObject.bravo.charlie = "Charlie of duplicate object";
  expect(copiedObject).toEqual(obj)
});
