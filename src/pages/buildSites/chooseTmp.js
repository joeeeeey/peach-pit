// 选择模板界面
import React, { Component } from 'react';
import FullWidthGrid from '../../components/common/fullWidthGrid'
import { withStyles } from 'material-ui/styles';
import WebTemplate from '../../components/common/cards/webTemplate'
import TitleAndSubTitle from '../../components/common/titleAndSubTitle'
import ButtonAppBar from '../../components/common/appBar'

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
});

class ChooseTmp extends Component {
  render() {
    const { classes } = this.props;
    let containerConfig = {
      justify: "center",
      spacing: 8,
    }

    // TODO list data from backend
    let lists = [
      { data: { content: "网页模板1", imgUrl: "IMG_7881.jpg", templateId: 1, }, key: 1 },
      { data: { content: "网页模板2", imgUrl: "ORG_DSC01101.jpg", templateId: 2, }, key: 2 },
      { data: { content: "网页模板3", imgUrl: "ORG_DSC01113.jpg", templateId: 3, }, key: 3 },
      { data: { content: "网页模板4", imgUrl: "ORG_DSC01157.JPEG", templateId: 4, }, key: 4 },
      { data: { content: "网页模板5", imgUrl: "ORG_DSC01191.JPEG", templateId: 5, }, key: 5 },
      { data: { content: "网页模板6", imgUrl: "ORG_DSC01034.jpg", templateId: 6, }, key: 6 },
      { data: { content: "网页模板7", imgUrl: "ORG_DSC01110.jpg", templateId: 7, }, key: 7 },
      { data: { content: "网页模板8", imgUrl: "ORG_DSC01118.JPEG", templateId: 8, }, key: 8 },
      { data: { content: "网页模板9", imgUrl: "ORG_DSC01137.JPEG", templateId: 9, }, key: 9 },
      { data: { content: "网页模板10", imgUrl: "ORG_DSC01174.JPEG", templateId: 10, }, key: 10 },
    ]

    let itemsConfig = {
      Card: WebTemplate,
      lists: lists,
    }
    return (
      <div className={classes.root}>
        < ButtonAppBar />
        < TitleAndSubTitle
          titleContent="选择一个模板"
          subTitleContent="随意选择，模板选择后可随意更换" />
        <FullWidthGrid
          containerConfig={containerConfig}
          itemsConfig={itemsConfig} />
      </div>
    );
  }
}

export default withStyles(styles)(ChooseTmp);