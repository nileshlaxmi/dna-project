export const cloneDeep = iterable => {
  return JSON.parse(JSON.stringify(iterable));
};

export const genCharArray = (charA, charZ) => {
  var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
      a.push(String.fromCharCode(i));
  }
  return a;
};