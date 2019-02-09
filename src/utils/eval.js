/**
 * @file Helpers methods about `eval`.
 * 
 */

const getConnectKeys = (nestedKey) => {
  let keys = nestedKey.split(",");
  let connectKeys = "";
  for (let i = 0; i < keys.length; i++) {
    connectKeys += `['${keys[i]}']`;
  }
  return connectKeys;
}

/* eslint-disable */
export const evalUpdate = (data, nestedKey, value) => {
  eval(`data${getConnectKeys(nestedKey)}=value`);

  return data;
}
/* eslint-enable */