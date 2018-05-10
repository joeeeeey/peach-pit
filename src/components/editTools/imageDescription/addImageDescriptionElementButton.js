import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';


export default class AddImageDescriptionElementButton extends React.Component {
  constructor(props, context) {
    super(props);
  }

  addImageDescriptionElement = () => {
    const defaultChild = JSON.parse('{"native":true,"nodeName":"div","children":[{"native":false,"nodeName":"ImageArea","props":{"src":"http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/layout/tmp/2f7ddd3dc6d11f62c204a2fd2adf0f47"}},{"native":false,"nodeName":"VerticalLayout","props":{"flex":[12], "backgroundInfo":{"background":"white","backgroundType":"pureColor","imageInfo":{},"fillType":null,"enableParallex":null}},"children":[{"native":false,"nodeName":"VerticalGrid","children":[{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"标题","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":1}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"副标题","attributes":{"font":"serif","color":"#66a3e0"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}},{"native":false,"nodeName":"TextArea","props":{"deltaDeltaValue":[{"insert":"说点什么..","attributes":{"font":"serif"}},{"insert":"\\n","attributes":{"align":"center","header":2}}],"readOnly":false}}]}]}]}')

    this.context.store.dispatch({
      type: 'addNode',
      payload: { targetKey: this.props.selfkey, nodeData: defaultChild },
      target: 'node',
    });
  }

  render() {
    return (
      <div className={'addElementButtonContanier'}>
        <Button 
        onClick={this.addImageDescriptionElement} 
        className={'addElementButton'}>
          增加元素
        </Button>
      </div>
    );
  }
}

AddImageDescriptionElementButton.contextTypes = {
  store: PropTypes.object,
};
