// 选择模板界面
import React, { Component } from 'react';
import FullWidthGrid from '../../components/common/grids/fullWidthGrid'
import { withStyles } from 'material-ui/styles';
import TitleAndSubTitle from '../../components/common/titleAndSubTitle'
import ButtonAppBar from '../../components/common/layouts/appBar'

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
});

class ChooseTmp extends Component {
  constructor(props) {
    super(props);
    this.state = { currentCount: 10, lists: [] };
  }

  timer = () => {
    // setState method is used to update the state
    this.setState({ currentCount: this.state.currentCount +1 });
  }

  componentDidMount() {
    // var intervalId = setInterval(this.timer, 1000);
    this.setState({
      lists: [
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
    })
  }

  render() {
    const { classes } = this.props;
    let containerConfig = {
      justify: "center",
      spacing: 8,
    }

    let itemsConfig = {
      lists: this.state.lists.slice(0, this.state.currentCount),
      itemName: 'WebTemplateCard'
    }

    let appBar = { className: ButtonAppBar }

    return (
      <div className={classes.root}>
        {React.createElement(
          appBar.className,
          null
        )}
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