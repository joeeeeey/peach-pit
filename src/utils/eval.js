/**
 * @file Helpers methods of `eval`.
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

export const nodeEvalUpdate = (data, nestedKey, value) => {
  const keys = nestedKey.split(",");
  const nodeKey = keys[0];
  eval(`data${getConnectKeys(nestedKey)}=value`);
  data[nodeKey] = JSON.parse(JSON.stringify(data[nodeKey]));
  return data;
}

/* eslint-enable */