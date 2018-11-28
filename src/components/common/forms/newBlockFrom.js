import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Form, Select, Input, message } from "antd";
import MuButton from "material-ui/Button";
import nodeOperation from "../../../utils/nodeOperation";
import TemplateService from "../../../services/templateService";
import LayoutService from "../../../services/layoutService";
const templateService = new TemplateService();
const layoutService = new LayoutService();

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  maxWidth: 260,
  margin: "auto"
};

class MyFrom extends React.Component {
  constructor(props, context) {
    super(props);
  }

  addlayout = values => {
    layoutService
      .addLayout(values)
      .then(response => {
        const { data } = response;
        if (data.code === 0) {
          message.success(`创建成功`, 6);
          this.props.saveSuccess();
        } else {
          message.error(`😥 ${data.msg}`, 1.2);
        }
      })
      .catch(function(error) {
        message.error(`😥 出现异常: ${error.msg}`, 2);
      });
  };

  addTemplate = values => {
    templateService
      .addTemplate(values)
      .then(response => {
        const { data } = response;
        if (data.code === 0) {
          message.success(`创建成功`, 6);
          this.props.saveSuccess();
        } else {
          message.error(`😥 ${data.msg}`, 1.2);
        }
      })
      .catch(function(error) {
        message.error(`😥 出现异常: ${error.msg}`, 2);
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let block = {};
        block.name = values.blockName;
        // 深拷贝 是否有更高效的方式?
        let nodeData = JSON.parse(
          JSON.stringify(this.context.store.getState().node)
        );
        let heightOption = { isLayout: false };
        // 如果是 layout, 根据 children 判断是不是符合类型
        if (values.blockType === "layout") {
          heightOption.isLayout = true;
          const { _root } = nodeData;
          // 根节点不止一个元素则是复合型
          if (nodeData._relation[_root].length > 1) {
            nodeData[_root].composite = true;
          }
        }

        block.data = JSON.stringify(
          nodeOperation.heightenDomTree(nodeData, heightOption)
        );
        if (values.blockType === "template") {
          this.addTemplate(block);
        } else if (values.blockType === "layout") {
          this.addlayout(block);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: "1.5rem" }}>
        <FormItem style={formItemLayout}>
          {getFieldDecorator("blockName", {
            rules: [{ required: true, message: "输入板块名称!" }]
          })(<Input placeholder="一个酷炫的样式" />)}
        </FormItem>

        <FormItem style={formItemLayout}>
          {getFieldDecorator("blockType", {
            rules: [{ required: true, message: "选择板块类型" }]
          })(
            <Select placeholder="选择板块类型">
              <Option value="layout">样式</Option>
              <Option value="template">网页模板</Option>
            </Select>
          )}
        </FormItem>
        <FormItem style={formItemLayout}>
          <MuButton
            variant="raised"
            color="secondary"
            style={{ marginTop: 10, width: 260 }}
            type="submit">
            提交
          </MuButton>
        </FormItem>
      </Form>
    );
  }
}

MyFrom.contextTypes = {
  store: PropTypes.object,
  saveSuccess: PropTypes.func
};

const NewBlockFrom = Form.create()(MyFrom);
export default NewBlockFrom;
