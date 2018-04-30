import React from 'react';
import Button from 'material-ui/Button';
import { Menu, Dropdown } from 'antd';
import Grid from 'material-ui/Grid';
const buttonStyle = { minWidth: 10, justifyContent: 'left' }


export default class GridArrangementOptionLists extends React.Component {
  constructor(props, context) {
    super(props);
    this.positionStyle = this.props.positionStyle || { position: 'absolute', left: '-8%', top: -20, "borderRadius": "10%", "background": "#303233" }
    this.state = { visible: false }
  }

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  }

  rearrangeGird = (flex) => {
    this.props.handleRearrangeGird(flex)
  }


  menu(f) {
    return (
      <Menu>
        <Menu.Item key="fullWithChilrenButton">
          <Button onClick={this.changeFullWithChilrenButton} color="primary" style={{ width: '100%', justifyContent: 'left' }}>
            {this.props.fullWithChilren ? '自动留空' : '子元素占满'}
          </Button>
        </Menu.Item>
        <Menu.Item key="arrangLabel">
          <span style={{ marginTop: 5, fontSize: 5, fontWeight: 500 }}>12 格为基准选择排列方式:</span>

          <Grid name="水平" style={{ maxWidth: 200 }} container direction={'row'} spacing={0} justify={'center'}>
            {[[12], [6, 6], [4, 8], [8, 4], [4, 4, 4], [5, 2, 5], [3, 6, 3], [2, 8, 2], [3, 3, 3, 3]].map(item =>
              <Grid item xs={4} key={JSON.stringify(item)}>
                <div style={{ padding: '5px 5px', width: '100%' }}>
                  <Button onClick={() => { f(item) }} color="secondary" style={buttonStyle}>
                    {`${item.join(',')}`}
                  </Button>
                </div>
              </Grid>

            )}
          </Grid>
        </Menu.Item>
      </Menu>
    )
  }

  changeFullWithChilrenButton = () => {
    this.props.changeFullWithChilrenButton(!!!this.props.fullWithChilren)
  }


  getPositionStyle = () => {
    if (this.props.positionStyle) { return this.props.positionStyle }
    if (this.props.fullWithChilren) {
      return { zIndex: 50, position: 'absolute', left: '2%', top: 10, "borderRadius": "10%", "background": "#303233" }
    } else {
      return { zIndex: 50, position: 'absolute', left: '-8%', top: -20, "borderRadius": "10%", "background": "#303233" }
    }
  }

  render() {
    return (
      <div name={"GridArrangementOptionLists"} style={this.getPositionStyle()}>
        <Dropdown overlay={this.menu(this.rearrangeGird)} trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
        >
          <Button style={{ minWidth: 18, color: '#FFF', fontSize: 8 }}>
            布局
        </Button>
        </Dropdown>
      </div>
    );
  }
}
