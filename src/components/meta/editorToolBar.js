import React, { Component } from 'react';

export default class CustomToolbar extends Component {
  constructor(props) {
    super(props)
    this.id = this.props.id
  }

  onMouseEnter = () => {
    this.props.hoverToolbar(true)
  }

  onMouseLeave = () => {
    this.props.hoverToolbar(false)
  }

  render() {
    return (
      <div 
        style={{background: 'white'}}
        id={`${this.id}`} 
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
          {/* <option value="1"></option>
          <option value="2"></option> */}
          {/* <option selected></option> */}
        </select>
        <select className="ql-font"></select>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-image" />
        <select className="ql-align"></select>

        <select className="ql-color"></select>

        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>

        <button className="ql-script" value="sub"></button>
        <button className="ql-script" value="super"></button>
        <button className="ql-indent" value="-1"></button>
        <button className="ql-indent" value="+1"></button>

        <select className="ql-size" >
        </select>

        <button className="ql-link" />
      </div>
    )
  }
}