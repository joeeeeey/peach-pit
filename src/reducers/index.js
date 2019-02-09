import { combineReducers } from "redux";
import userReducer from "reducers/user";
import nodeReducer from "reducers/node";
import administratorReducer from "reducers/administrator";
import editInfoReducer from "reducers/editInfo";
import upYunReducer from "reducers/upYun";

// action 结构
// target 代表操作 store 中的某个节点
// => {target: 'node', type: 'replace', payload: {}}

// store 的结构
// {
//   user: {},
//   node: {},
//   administrator: {},
//   editInfo: { role: "admin", source: "template", id: 5 }
//   upYun: {},
// }

const reducer = combineReducers({
  user: userReducer,
  node: nodeReducer,
  administrator: administratorReducer,
  editInfo: editInfoReducer,
  upYun: upYunReducer,
});

export default reducer;
