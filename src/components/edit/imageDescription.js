// const node = {
//   native: false,
//   nodeName: 'ImageDescription',
//   props: {
//   backgroundInfo: {
//     background: 'white',
//     backgroundType: 'pureColor',
//     imageInfo: {},
//     fillType: null,
//     enableParallex: null
//   },
// column: 3,
//   },
//   children: [
// {
//   native: true, nodeName: 'div', children:
//     [
//       { native: false, nodeName: 'ImageArea', props: { src: "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6" } },
//       {
//         native: false,
//         nodeName: 'VerticalLayout',
//         props: {
//           backgroundInfo: {
//             background: 'white',
//             backgroundType: 'pureColor',
//             imageInfo: {},
//             fillType: null,
//             enableParallex: null
//           }
//         }
//       },
//     ]
// },
// {
//   native: true, nodeName: 'div', children:
//     [
//       { native: false, nodeName: 'ImageArea', props: { src: "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6" } },
//       {
//         native: false,
//         nodeName: 'VerticalLayout',
//         props: {
//           backgroundInfo: {
//             background: 'white',
//             backgroundType: 'pureColor',
//             imageInfo: {},
//             fillType: null,
//             enableParallex: null
//           }
//         }
//       },
//     ]
// },
//   ]
// }

// {"native":false,"nodeName":"ImageDescription","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null},"column":3},"children":[{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6"}},{"native":false,"nodeName":"VerticalLayout","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}}}]},{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/a96322da6ff86340da9a23bc2fbb59a6"}},{"native":false,"nodeName":"VerticalLayout","props":{"backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}}}]}]}
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Grid from "material-ui/Grid";
import EditableImageArea from "components/edit/imageArea";
import EditableVerticalLayout from "components/edit/verticalLayout";
import backgroundSetting from "jssSettings/backgroundSetting";
import ChangeBackgroundButton from "components/editTools/layout/changeBackgroundButton";
import AddImageDescriptionElementButton from "components/editTools/imageDescription/addImageDescriptionElementButton";
import RemoveNodeSpirit from "components/editTools/layout/removeNodeSpirit";
import ChangeLayoutButton from "components/editTools/imageDescription/changeLayoutButton";
import actionTypes from "constants/action-types";
import EditRoot from "pages/site/edit2/editRoot";

const RemoveNodeSpiritContainerStyle = {
  zIndex: 46,
  position: "absolute",
  right: -15
};

const verticalCenterStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

// 因需要调用子元素甚至孙元素的 porps,故在此订阅
// TODO 重构
// 更好的方式应为子元素使用 child 和文件渲染，单独订阅节点内筒
// 这样更新效率更高，也容易理解阅读。
const mapStateToProps = (state, ownProps) => {
  let childProps = {};
  const childrenKeys = ownProps.children.map(x => x.props.selfkey);

  let imageKeys = [];
  let desKeys = [];
  childrenKeys.map(key => {
    childProps[key] = state.node[key];
    state.node._relation[key].map((grandsonKey, index) => {
      if (index === 0) {
        imageKeys.push(grandsonKey);
      }
      if (index === 1) {
        desKeys.push(grandsonKey);
      }
      childProps[grandsonKey] = state.node[grandsonKey];
    })
  })
  childProps.imageKeys = imageKeys;
  childProps.desKeys = desKeys;
  childProps.relations = state.node._relation;
  // 子节点+孙节点
  return childProps;
}

class EditableImageDescription extends React.Component {
  constructor(props) {
    super(props);
    // console.log('EditableImageDescription props: ', props);

    const { column } = this.props;
    // const { column, children } = this.props;
    // const childrenArray = React.Children.toArray(children);
    // const childrenKeys = childrenArray.map(
    //   x => x.props.children[0].props.selfkey
    // );

    const childrenKeys = props.imageKeys;
    this.needUpdateRow = [];
    this.imageHeightInfo = [];
    this.state = {
      column: column,
      flex: 12 / column,
      childrenKeys: childrenKeys,
      imageHeightInfo: {} // {key1: 400, key2, 100}
    };

    const counts = childrenKeys.length;
    const rows = Math.floor(counts / column) + (counts % column > 0 ? 1 : 0);

    let rowInfo = {};

    for (let i = 0; i < rows; i++) {
      childrenKeys.slice(i * column, (i + 1) * column).forEach(key => {
        this.state[`${key}Row`] = i + 1;
        // this.state[`${key}IACS`] =  { minHeight: 0 } // 初始化 IACS
        rowInfo[i + 1] = rowInfo[i + 1] || [];
        rowInfo[i + 1].push(key);
      });
    }

    this.state.rowInfo = rowInfo;
  }

  // 改变 column
  handleRearrangement = column => {
    let { childrenKeys, imageHeightInfo } = this.state;
    if (column === this.state.column) {
      return;
    }

    const flex = 12 / column;
    // 重新计算行信息
    const result = this.getRowStateAndInfo(childrenKeys, column);
    const { rowState, rowInfo, rows } = result;

    let updateInfo = Object.assign({}, rowState, {
      rowInfo: rowInfo,
      childrenKeys: childrenKeys,
      imageHeightInfo: imageHeightInfo,
      column: column,
      flex: flex
    });

    // 对每行进行重绘
    for (let i = 1; i < rows + 1; i++) {
      Object.assign(updateInfo, this.redraw(i, rowInfo, imageHeightInfo));
    }

    this.setState(updateInfo);

    let updateNodesPayload = [
      { value: column, nestedKey: `${this.props.selfkey},props,column` }
    ];
    const compositePayload = {
      payloadData: {
        updateNodes: { payloadData: updateNodesPayload }
      }
    };
    this.context.store.dispatch({
      type: actionTypes.MIXED_PROCESSING_FLATTENED_NODES,
      payload: compositePayload,
    });
  };

  getRowStateAndInfo = (childrenKeys, column) => {
    const counts = childrenKeys.length;

    const rows = Math.floor(counts / column) + (counts % column > 0 ? 1 : 0);

    // 重算
    let rowInfo = {};
    let rowState = {};

    for (let i = 0; i < rows; i++) {
      childrenKeys.slice(i * column, (i + 1) * column).forEach(key => {
        // {key1Row: 1, key2Row: 1}
        rowState[`${key}Row`] = i + 1;
        // {1: [k1,k2], 2: [k3,k4]}
        rowInfo[i + 1] = rowInfo[i + 1] || [];
        rowInfo[i + 1].push(key);
      });
    }

    return { rowState: rowState, rowInfo: rowInfo, rows: rows };
  };

  // 改变 fillWithChidlren
  changeFullWithChilrenButton = value => {
    let updateNodesPayload = [
      { value: value, nestedKey: `${this.props.selfkey},props,fullWithChilren` }
    ];
    const compositePayload = {
      payloadData: {
        updateNodes: { payloadData: updateNodesPayload }
      }
    };
    this.context.store.dispatch({
      type: actionTypes.MIXED_PROCESSING_FLATTENED_NODES,
      payload: compositePayload,
    });
  };

  addElement = (selfKey, height) => {
    // 得到当前 childrenKeys imageHeightInfo 并去除这个元素
    let { childrenKeys, imageHeightInfo, column } = this.state;
    childrenKeys.push(selfKey);
    imageHeightInfo[selfKey] = height;

    // 重新计算行信息
    const result = this.getRowStateAndInfo(childrenKeys, column);
    const { rowState, rowInfo, rows } = result;

    let updateInfo = Object.assign({}, rowState, {
      rowInfo: rowInfo,
      childrenKeys: childrenKeys,
      imageHeightInfo: imageHeightInfo
    });

    Object.assign(updateInfo, this.redraw(rows, rowInfo, imageHeightInfo));

    this.setState(updateInfo);
  };

  deleteElement = imageKey => {
    // 得到当前 childrenKeys imageHeightInfo 并去除这个元素
    let { childrenKeys, imageHeightInfo, column } = this.state;
    childrenKeys = childrenKeys.filter(x => x !== imageKey);
    delete imageHeightInfo[imageKey];

    // 重新计算行信息
    const result = this.getRowStateAndInfo(childrenKeys, column);
    const { rowState, rowInfo, rows } = result;

    let updateInfo = Object.assign({}, rowState, {
      rowInfo: rowInfo,
      childrenKeys: childrenKeys,
      imageHeightInfo: imageHeightInfo
    });

    // 对每行进行重绘
    for (let i = 1; i < rows + 1; i++) {
      Object.assign(updateInfo, this.redraw(i, rowInfo, imageHeightInfo));
    }

    this.setState(updateInfo);
  };

  // 回调自身所占高度
  reportHeight = (height, selfKey) => {
    if (window.screen.width <= 600) {
      let column = this.state.column;

      let updateInfo = { column: 1 };
      if (column !== 1) {
        let childrenKeys = this.state.childrenKeys;
        for (let i = 0; i < childrenKeys.length; i++) {
          const key = childrenKeys[i];
          updateInfo[`${key}IACS`] = { minHeight: 0 };
        }
      }

      this.setState(updateInfo);
    } else {
      const { column } = this.props;
      if (column !== this.state.column) {
        this.setState({ column: this.props.column });
      }

      if (!this.state[`${selfKey}Row`]) {
        // 找不到 selfkey, 说明是增加了元素
        // TODO 现在用这种方式检查增加子元素不是很好
        this.addElement(selfKey, height);
      } else {
        // 新方案
        const selfRow = this.state[`${selfKey}Row`];

        // => imageHeightInfo: {k1: 300, k2: 200}
        let imageHeightInfo = this.state.imageHeightInfo;
        if (
          imageHeightInfo[selfKey] <= height + 1 &&
          imageHeightInfo[selfKey] > height - 1
        ) {
          return;
        }

        imageHeightInfo[selfKey] = height;

        this.needUpdateRow.push(selfRow);
        this.imageHeightInfo[selfKey] = height;
        if (this.saveTriggerTimer !== undefined) {
          clearTimeout(this.saveTriggerTimer);
        }

        // 延时 95 毫秒进行所有图片重绘
        this.saveTriggerTimer = setTimeout(() => {
          // console.log(`settimeout 启动`)
          let updateInfo = {};
          this.needUpdateRow = [...new Set(this.needUpdateRow)];
          for (let i = 0; i < this.needUpdateRow.length; i++) {
            Object.assign(
              updateInfo,
              this.redraw(
                this.needUpdateRow[i],
                this.state.rowInfo,
                this.imageHeightInfo
              )
            );
          }

          this.setState(
            Object.assign(updateInfo, { imageHeightInfo: this.imageHeightInfo })
          );
          this.saveTriggerTimer = undefined;
          this.needUpdateRow = [];
        }, 95);
      }
    }
  };

  // 重绘传入要重绘的行数和高度信息
  redraw = (row, rowInfo, imageHeightInfo) => {
    // 只要有图片的高度产生了变化，都会重新遍历这一层元素
    // 并且将最大的高度设为 minHeight
    let minHeight = 0;
    const thisRowKeys = rowInfo[row]; // => [k1,k2,k3]

    for (let i = 0; i < thisRowKeys.length; i++) {
      const key = thisRowKeys[i];
      if (imageHeightInfo[key] && imageHeightInfo[key] > minHeight) {
        minHeight = imageHeightInfo[key];
      }
    }
    // minHeight != 说明发生了改变，此时 setState
    if (minHeight !== 0) {
      let updateInfo = {};
      thisRowKeys.forEach(x => {
        updateInfo[`${x}IACS`] = { minHeight: minHeight };
      });

      // this.setState(updateInfo)
      return updateInfo;
    } else {
      return {};
    }
  };

  getLayoutDivStyle = () => {
    if (this.props.fullWithChilren) {
      return "verticalLayoutContainerFullWithChilren";
    } else {
      return "verticalLayoutContainerDefault";
    }
  };

  getChildContext() {
    return { store: this.context.store };
  }

  render() {
    console.log('render this.state: ', this.state);
    // console.log('render props is: ', this.props);
    const { id = this.props.selfkey, backgroundInfo, imageKeys, desKeys } = this.props;

    const backgroundStyle = Object.assign(
      { position: "relative" },
      backgroundSetting.getBackgroundStyle(backgroundInfo)
    );

    return (
      <div style={backgroundStyle} id={id}>
        <ChangeBackgroundButton
          fullWithChilren={this.props.fullWithChilren}
          backgroundInfo={backgroundInfo}
          parentkey={this.props.selfkey}
        />
        <div
          className={this.getLayoutDivStyle()}
          name="layoutDiv"
          style={{ position: "relative" }}>
          <ChangeLayoutButton
            {...this.props}
            handleRearrangement={this.handleRearrangement}
            changeFullWithChilrenButton={this.changeFullWithChilrenButton}
          />

          <Grid container direction={"row"} justify={"center"}>
            {this.props.children &&
              React.Children.toArray(this.props.children).map(
                (child, index) => {
                  // 子元素的子元素
                  // const grandsons = child.props.children;
                  // const imageProps = grandsons[0].props;
                  // const verticalLayoutProps = grandsons[1].props;
                  const imageProps = this.props[imageKeys[index]].props;
                  const verticalLayoutProps = this.props[desKeys[index]].props;
                  const imageKey = imageProps.selfkey;

                  return (
                    <Grid
                      key={child.props.selfkey}
                      item
                      xs={12}
                      sm={this.state.flex}
                      md={this.state.flex}
                      lg={this.state.flex}
                      xl={this.state.flex}>
                      <div
                        name="girdContainer"
                        style={{ padding: "5%", position: "relative" }}>
                        <div
                          key="RemoveNodeSpritContainer"
                          style={RemoveNodeSpiritContainerStyle}>
                          <RemoveNodeSpirit
                            parentkey={this.props.selfkey}
                            childrenkey={child.props.selfkey}
                            callBackValue={imageKey}
                            deleteCallback={this.deleteElement}
                          />
                        </div>
                        <div
                          name="imageAreaContanier"
                          style={Object.assign(
                            {},
                            this.state[`${imageKey}IACS`],
                            verticalCenterStyle
                          )}>
                          <EditableImageArea
                            hiddenDelete
                            imageContainerStyle={{}}
                            noMeasure={false}
                            reportHeight={this.reportHeight}
                            {...imageProps}
                          />
                        </div>
                        <EditableVerticalLayout {...verticalLayoutProps} >
                          {this.props.relations[verticalLayoutProps.selfkey].map((x, index) =>
                            <EditRoot selfkey={x} key={index} />
                          )}
                        </EditableVerticalLayout>
                      </div>
                    </Grid>
                  );
                }
              )}
          </Grid>
          <AddImageDescriptionElementButton {...this.props} />
        </div>
      </div>
    );
  }
}

EditableImageDescription.contextTypes = {
  store: PropTypes.object
};

EditableImageDescription.childContextTypes = {
  store: PropTypes.object
};

const EditableImageDescriptionWithRedux = connect(mapStateToProps)(EditableImageDescription);
export default EditableImageDescriptionWithRedux;