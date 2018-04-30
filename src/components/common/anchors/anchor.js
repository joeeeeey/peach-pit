import React  from 'react';
import Scroll from 'react-scroll';
const { Link } = Scroll
const linkFontStyle = { fontSize: 12, fontWeight: 500, "fontFamily": "\"source sans pro\", helvetica, 'PingFang SC',\"Microsoft YaHei\",\"微软雅黑\",STXihei,\"华文细黑\", sans-serif" }

export default class NavBarAnchor extends React.Component {
  constructor(props, context) {
    super(props)
    this.state = { active: false }
  }

  handleSetInactive = () => {
    this.setState({ active: false })
  }

  handleSetActive = () => {
    this.setState({ active: true })
  }

  getLinkStyle = () => {
    if (this.state.active) {
      return { color: '#84c40a' }
    } else {
      return { color: '#678' }
    }
  }

  getOffset = () => {
    let offect = 0
    const { affectRoot } = this.props
    if (affectRoot) {
      for (let key in affectRoot) {
        if (key === 'paddingTop') {
          offect -= affectRoot[key]
        }
      }
    }
    return offect
  }

  render() {
    const { child } = this.props
    let defaultLinkStyle = { "padding": "4px 6px", "display": "inline-block" }


    return (
      <Link
        onSetInactive={this.handleSetInactive}
        onSetActive={this.handleSetActive}
        offset={this.getOffset()}
        activeClass="active"
        to={`${child.id}`}
        spy={true}
        smooth={true}
        duration={500}  >
        <span style={Object.assign(defaultLinkStyle, this.getLinkStyle(), linkFontStyle)}>
          {child.name}
        </span>
      </Link>
    );
  }
}

