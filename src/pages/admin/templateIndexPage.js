import React from "react";
import AppBar from "components/common/layouts/adminAppBar";
import { Table, Input, Button, Icon, message } from "antd";
import { Link } from "react-router-dom";
import MuButton from "material-ui/Button";

import UpdateBlockThumbButton from "./updateBlockThumbButton";

import TemplateService from "services/templateService";
const templateService = new TemplateService();

class TemplateIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDropdownVisible: false,
      data: [],
      searchText: "",
      filtered: false,
      loading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        showSizeChanger: true,
        pageSizeOptions: ["1", "10", "20", "30", "40"]
      }
    };
  }

  handleTableChange = (pagination, filters, sorter) => {
    // 分页、排序、筛选变化时触发
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;

    pager.pageSize = pagination.pageSize;
    this.setState(
      {
        pagination: pager
      },
      () => this.getAllTemplates()
    );
  };

  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  };

  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, "gi");
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: this.state.data
        .map(record => {
          const match = record.name.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            name: (
              <span>
                {record.name
                  .split(reg)
                  .map((text, i) =>
                    i > 0
                      ? [<span className="highlight">{match[0]}</span>, text]
                      : text
                  )}
              </span>
            )
          };
        })
        .filter(record => !!record)
    });
  };

  editButton = record => {
    return (
      <div>
        <MuButton
          color="secondary"
          component={Link}
          to={`/admin/editPage?source=template&id=${record.key}`}>
          {" "}
          编辑{" "}
        </MuButton>
        <UpdateBlockThumbButton source={"template"} id={record.key} />
      </div>
    );
  };

  getAllTemplates = () => {
    this.setState({ loading: true });
    const { pagination } = { ...this.state };
    const params = {
      limit: pagination.pageSize,
      currentPage: pagination.current
    };
    templateService
      .getAllTemplates(params)
      .then(response => {
        this.setState({ loading: false });
        const { data } = response;
        if (data.code === 0) {
          data.data.records.map(record => (record.key = record.id));

          let pager = { ...this.state.pagination };

          pager.total = data.data.total;

          this.setState({ data: data.data.records, pagination: pager });
        } else {
          message.error(`😥 ${data.msg}`, 1.2);
        }
      })
      .catch(function(error) {
        message.error(`😥 出现异常: ${error.msg}`, 2);
      });
  };

  componentDidMount = () => {
    this.getAllTemplates();
  };

  render() {
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id"
      },

      {
        title: "名称",
        dataIndex: "name",
        key: "name",
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type="smile-o"
            style={{ color: this.state.filtered ? "#108ee9" : "#aaa" }}
          />
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible
            },
            () => this.searchInput && this.searchInput.focus()
          );
        }
      },
      { title: "创建于", dataIndex: "created_at", key: "created_at" },
      {
        title: "操作",
        key: "operation",
        render: (text, record) => this.editButton(record)
      }
    ];

    return (
      <div>
        <AppBar />
        <div style={{ marginTop: 20, paddingLeft: 35, paddingRight: 35 }}>
          <Table
            columns={columns}
            dataSource={this.state.data}
            bordered
            title={() => <h3 style={{ textAlign: "center" }}>网页模板总览</h3>}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    );
  }
}

export default TemplateIndexPage;
