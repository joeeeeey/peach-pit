import React from 'react';
import Button from 'material-ui/Button';
import { Menu, Dropdown } from 'antd';
import Grid from 'material-ui/Grid';
const buttonStyle = { minWidth: 10, justifyContent: 'left' }


export default class ChangeLayoutButton extends React.Component {
  constructor(props, context) {
    super(props);
    this.positionStyle = this.props.positionStyle || { position: 'absolute', left: '-8%', top: -20, "borderRadius": "10%", "background": "#303233" }
    this.state = { visible: false }
  }

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  }

  changeFullWithChilrenButton = () => {
    this.props.changeFullWithChilrenButton(!!!this.props.fullWithChilren)
  }


  rearrangeItem = (flex) => {
    this.props.handleRearrangement(flex)
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
          <div style={{ width: '100%', textAlign: 'center' }}>
            <span style={{ marginTop: 5, fontSize: '0.5vw', fontWeight: 500 }}>每列容纳元素:</span>
          </div>


          <Grid name="水平" style={{ maxWidth: 200 }} container direction={'row'} spacing={0} justify={'center'}>
            {[2, 3, 4, 6].map(item =>
              <Grid item xs={4} key={item}>
                <div style={{ padding: '5px 5px', width: '100%' }}>
                  <Button onClick={() => { f(item) }} color="secondary" style={buttonStyle}>
                    {item}
                  </Button>
                </div>
              </Grid>

            )}
          </Grid>
        </Menu.Item>
      </Menu>
    )
  }


  getPositionStyle = () => {
    if (this.props.positionStyle) { return this.props.positionStyle }
    if (this.props.fullWithChilren) {
      return { zIndex: 50, position: 'absolute', left: '3%', top: 12, "borderRadius": "10%", "background": "#303233" }
    } else {
      return { zIndex: 50, position: 'absolute', left: '-8%', top: 0, "borderRadius": "10%", "background": "#303233" }
      // return { zIndex: 50, position: 'absolute', left: '-8%', top: 10, "borderRadius": "10%", "background": "#303233" }
    }
  }

  render() {
    return (
      <div name={"ChangeLayoutButton"} style={this.getPositionStyle()}>
        <Dropdown overlay={this.menu(this.rearrangeItem)} trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
        >
          <Button size='small' style={{ minWidth: 18, color: '#FFF', fontSize: '1vw' }}>
            布局
          </Button>
        </Dropdown>
      </div>
    );
  }
}
