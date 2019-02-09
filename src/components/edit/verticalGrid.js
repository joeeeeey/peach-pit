// 可传入 props: children array

// 垂直布局最外层是水平布局的 Grid
// 而子 Grid 里才是垂直
import React from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import AddNodeSpirit from "components/editTools/layout/addNodeSpirit";
import RemoveNodeSpirit from "components/editTools/layout/removeNodeSpirit";

const AddNodeSpiritContainerStyle = {
  zIndex: 45,
  minHeight: 23,
  position: "absolute",
  top: -5,
  width: "100%"
};

const RemoveNodeSpiritContainerStyle = {
  zIndex: 46,
  position: "absolute",
  right: -15
};

const ChildAddNodeSpiritContainerStyle = {
  zIndex: 45,
  minHeight: 23,
  position: "absolute",
  top: -10,
  width: "100%"
};

export default class EditableVerticalGrid extends React.PureComponent {
  constructor(props, context) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid
          container
          style={{ flexGrow: 1 }}
          direction="row"
          justify="space-around"
          alignItems="center">
          {this.props.children &&
            React.Children.toArray(this.props.children).map((child, index) => {
              return (
                <Grid
                  key={child.props.selfkey}
                  item
                  xs={12}
                  style={{ padding: "10px 0", position: "relative" }}>
                  <div
                    key="addNodeSpritContainer"
                    id={child.props.selfkey}
                    style={ChildAddNodeSpiritContainerStyle}>
                    <AddNodeSpirit
                      permanent={false}
                      ref={el => {
                        this.addNodeSpirit = el;
                      }}
                      parentkey={this.props.selfkey}
                      childrenkey={child.props.selfkey}
                    />
                  </div>
                  <div
                    key="RemoveNodeSpritContainer"
                    style={RemoveNodeSpiritContainerStyle}>
                    <RemoveNodeSpirit
                      parentkey={this.props.selfkey}
                      childrenkey={child.props.selfkey}
                    />
                  </div>
                  {child}
                </Grid>
              );
            })}
          <Grid item xs={12} style={{ position: "relative" }}>
            <div
              key="addNodeSpritContainer"
              style={AddNodeSpiritContainerStyle}>
              {this.props.children ? (
                <AddNodeSpirit parentkey={this.props.selfkey} />
              ) : (
                <AddNodeSpirit
                  permanent={true}
                  parentkey={this.props.selfkey}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditableVerticalGrid.contextTypes = {
  store: PropTypes.object
};
