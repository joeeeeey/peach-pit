import React from "react";
import Grid from "material-ui/Grid";
import PreviewImageArea from "components/preview/imageArea";
import PreviewTextArea from "components/preview/textArea";
import PreviewVerticalLayout from "components/preview/verticalLayout";
import backgroundSetting from "jssSettings/backgroundSetting";

const verticalCenterStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

export default class PreviewImageDescription extends React.Component {
  constructor(props) {
    super(props);

    const { column, children } = this.props;
    const childrenArray = React.Children.toArray(children);
    const childrenKeys = childrenArray.map(
      x => x.props.children[0].props.selfkey
    );

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
        rowInfo[i + 1] = rowInfo[i + 1] || [];
        rowInfo[i + 1].push(key);
      });
    }

    this.state.rowInfo = rowInfo;
  }

  getChildrenKeys = () => {
    const { children } = this.props;
    const childrenArray = React.Children.toArray(children);

    const childrenCounts = childrenArray.length;
    // 取出子元素中的图片放入数组
    const childrenKeys = childrenArray.map(
      x => x.props.children[0].props.selfkey
    );
    return childrenKeys;
  };

  getRowStateAndInfo = childrenKeys => {
    const counts = childrenKeys.length;
    const { column } = this.state;
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

  addElement = (selfKey, height) => {
    // 得到当前 childrenKeys imageHeightInfo 并去除这个元素
    let { childrenKeys, imageHeightInfo } = this.state;
    childrenKeys.push(selfKey);
    imageHeightInfo[selfKey] = height;

    // 重新计算行信息
    const result = this.getRowStateAndInfo(childrenKeys);
    const { rowState, rowInfo, rows } = result;

    let updateInfo = Object.assign({}, rowState, {
      rowInfo: rowInfo,
      childrenKeys: childrenKeys,
      imageHeightInfo: imageHeightInfo
    });

    Object.assign(updateInfo, this.redraw(rows, rowInfo, imageHeightInfo));

    this.setState(updateInfo);
  };

  // 回调自身所占高度
  reportHeight = (height, selfKey) => {
    if (window.screen.width <= 600) {
      let column = this.state.column;
      if (column !== 1) {
        let updateInfo = { column: 1 };
        let childrenKeys = this.state.childrenKeys;
        for (let i = 0; i < childrenKeys.length; i++) {
          const key = childrenKeys[i];
          updateInfo[`${key}IACS`] = { minHeight: 0 };
        }
        this.setState(updateInfo);
      }
    } else {
      this.setState({ column: this.props.column });

      const selfRow = this.state[`${selfKey}Row`];

      // => imageHeightInfo: {k1: 300, k2: 200}
      let imageHeightInfo = this.state.imageHeightInfo;
      imageHeightInfo[selfKey] = height;
      let rowInfo = this.state.rowInfo; // => {1: [k1,k2,k3], 2: [k4]}
      let rowUpdateInfo = this.redraw(selfRow, rowInfo, imageHeightInfo);

      let updateInfo = Object.assign({}, rowUpdateInfo, {
        imageHeightInfo: imageHeightInfo
      });
      this.setState(updateInfo);
    }
    // }
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

  render() {
    const { id = this.props.selfkey, backgroundInfo } = this.props;

    const backgroundStyle = Object.assign(
      { position: "relative" },
      backgroundSetting.getBackgroundStyle(backgroundInfo)
    );

    return (
      <div style={backgroundStyle} id={id}>
        <div className={this.getLayoutDivStyle()}>
          <Grid name="水平" container direction={"row"} justify={"center"}>
            {this.props.children &&
              React.Children.toArray(this.props.children).map(
                (child, index) => {
                  // 子元素的子元素
                  const childChildren = child.props.children;
                  const imageProps = childChildren[0].props;
                  const verticalLayoutProps = childChildren[1].props;
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
                          name="imageAreaContanier"
                          style={Object.assign(
                            {},
                            this.state[`${imageKey}IACS`],
                            verticalCenterStyle
                          )}>
                          <PreviewImageArea
                            imageContainerStyle={{}}
                            noMeasure={false}
                            {...imageProps}
                            reportHeight={this.reportHeight}
                          />
                        </div>
                        <PreviewVerticalLayout {...verticalLayoutProps} />
                      </div>
                    </Grid>
                  );
                }
              )}
          </Grid>
        </div>
      </div>
    );
  }
}
