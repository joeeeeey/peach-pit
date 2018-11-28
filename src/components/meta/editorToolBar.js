import React, { Component } from "react";

export default class CustomToolbar extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.id;
  }

  onMouseEnter = () => {
    this.props.hoverToolbar(true);
  };

  onMouseLeave = () => {
    this.props.hoverToolbar(false);
  };

  render() {
    const { toolbarStyle = {}, formats } = this.props;

    return (
      <div
        style={Object.assign({ background: "white" }, toolbarStyle)}
        id={`${this.id}`}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <select
          className="ql-header"
          defaultValue={""}
          onChange={e => e.persist()}
        />

        <select className="ql-size" />
        <select className="ql-align" />

        <select className="ql-font" />
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />

        {/* {formats && formats.includes('image') &&
          <button className="ql-image" />
        } */}

        <select className="ql-color" />
        {formats && formats.includes("list") && (
          <button className="ql-list" value="ordered" />
        )}

        {formats && formats.includes("list") && (
          <button className="ql-list" value="bullet" />
        )}

        <button className="ql-script" value="sub" />
        <button className="ql-script" value="super" />
        {formats && formats.includes("indent") && (
          <button className="ql-indent" value="-1" />
        )}
        {formats && formats.includes("indent") && (
          <button className="ql-indent" value="+1" />
        )}

        <button className="ql-link" />
      </div>
    );
  }
}
