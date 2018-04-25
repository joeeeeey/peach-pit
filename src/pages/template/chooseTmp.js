// 选择模板界面
import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';

import TitleAndSubTitle from '../../components/common/titleAndSubTitle'
import ButtonAppBar from '../../components/common/layouts/appBar'
import ChooseTemplateCard from '../../components/common/cards/chooseTemplateCard'

import { Radio } from 'antd';

import TemplateService from '../../services/templateService'


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const templateService = new TemplateService()

class ChooseTmp extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      templateCategroies: [],
      templates: [],
    };
  }



  // 初始化模板的种类
  initTmpCategroies = () => {
    let params = { groupKey: 'category' }
    templateService.getGroupedTemplate(params)
      .then(response => {
        const { data } = response
        if (data.code === 0) {
          this.setState({ templateCategroies: data.data.map(x => x.category) })
        } else {
          console.error(`${data.msg}`)
        }
      })
  }

  getTmpQueryParams = (whereClause = {}) => {
    // let whereClause = {} // category
    return {
      limit: 60,
      whereClause: whereClause,
      currentPage: 1,
      columns: ['id', 'name', 'thumbnail_url', 'category'],
    }
  }

  selectTmpCategory = (e) => {
    // TODO send ajax to show category tmps

    // console.log(`radio checked:${e.target.value}`);
    let params = this.getTmpQueryParams({category: e.target.value})
    this.initTmpCards(params)
  }

  initTmpCards = (params) => {
    templateService.getActiveTemplates(params)
      .then(response => {
        const { data } = response
        if (data.code === 0) {
          console.log(data.data.records)
          this.setState({ templates: data.data.records })
        } else {
          console.error(`${data.msg}`)
        }
      })
      .catch(function (error) {
        console.error(error)
      });
  }

  componentDidMount() {
    // 默认 60 个
    this.initTmpCategroies()
    let params = this.getTmpQueryParams()
    this.initTmpCards(params)
  }



  render() {
    return (
      <div>
        <ButtonAppBar />
        <div style={{ width: '80%', textAlign: 'center', margin: 'auto' }}>
          < TitleAndSubTitle
            titleContent="选择一个模板"
            subTitleContent="随意选择，模板选择后可随意更换" />

          <div>
            <RadioGroup onChange={this.selectTmpCategory}>
              {this.state.templateCategroies.map(x =>
                <RadioButton key={x} value={x}>{x}</RadioButton>
              )}
            </RadioGroup>
          </div>

          <Grid container spacing={8} justify={'center'}>
            {
              this.state.templates.map(record => (
                <ChooseTemplateCard
                  key={record.id}
                  userId={this.context.store.getState().user.profile.id}
                  record={record} />
              ))
            }
          </Grid>

        </div>
      </div>
    );
  }
}

export default ChooseTmp;

ChooseTmp.contextTypes = {
  store: PropTypes.object,
};

