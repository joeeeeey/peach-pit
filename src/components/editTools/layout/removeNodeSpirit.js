// 同等级增加元素的工具栏
// 既不是可编辑的布局，可不适合放在单独抽离
// 为了增强灵活性
// 将它设置为 edit 组件
// 但实际预览是不需要的
// 增加 onlyEdit 属性在预览时去掉为 true 的节点
// 像是精灵一样分布在各处，拥有强大的能力
import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";

import { Popover } from "antd";

// TextArea is Meta 组件， 应当封装为 h1, h2?
// 需要建表存储 meta

function popoverContent(f) {
  return (
    <div>
      <Button
        onClick={() => {
          f();
        }}
      >
        {" "}
        确认删除该区域?
      </Button>
    </div>
  );
}

export default class RemoveNodeSpirit extends Component {
  constructor(props, context) {
    super(props);
  }

  confirmDeleteNode = () => {
    const {
      childrenkey,
      parentkey,
      deleteCallback,
      callBackValue
    } = this.props;
    // 父节点需要删除时回调
    if (deleteCallback) {
      deleteCallback(callBackValue);
    }

    this.context.store.dispatch({
      type: "removeNode",
      payload: { targetKey: childrenkey, parentKey: parentkey },
      target: "node"
    });
  };

  render() {
    return (
      <Popover content={popoverContent(this.confirmDeleteNode)} trigger="click">
        <IconButton style={{ blackground: "black", height: 30 }}>
          <DeleteIcon style={{ width: "2vw", height: "2vw" }} />
        </IconButton>
      </Popover>
    );
  }
}

RemoveNodeSpirit.contextTypes = {
  store: PropTypes.object
};
