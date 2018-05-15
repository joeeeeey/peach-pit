
import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import SiteService from '../../../services/siteService'
const siteService = new SiteService()

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    margin: 20,
    maxWidth: 483.6,
  },
  media: {
    height: 260,
    backgroundSize: '100% 100%'

  },
});

class ChooseTemplateCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { redirectToEdit: false, siteId: null }
  }

  // 用户选择模板开始编辑
  // 1. 此时应先根据该模板的内容创建一个 site 资源
  // 2. 创建完毕后进入编辑该 site 的页面
  beginEdit = () => {
    const params = { userId: this.props.userId, templateId: this.props.record.id }
    siteService.addSiteByTemplate(params)
      .then(response => {
        const { data } = response
        if (data.code === 0) {
          const siteId = data.data.id
          if (siteId) {
            this.setState({ redirectToEdit: true, siteId: siteId })
          }

        } else {
          console.error(`选择模板编辑出现异常： ${data.msg}`)
        }
      })
      .catch(function (error) {
        console.error(`选择模板编辑出现异常： ${error}`)
      });
  }

  preview = () => {
    const url = `/user/previewPage?source=template&id=${this.props.record.id}`
    // 打开新页面
    const win = window.open(url, '_blank');
    win.focus();
  }

  render() {
    const { classes, record } = this.props;
    const { name, thumbnail_url } = record

    const { redirectToEdit, siteId} = this.state;

    if (redirectToEdit && siteId) {
      return <Redirect to={`/user/editPage?id=${siteId}&source=site`} />;
    }
    // TODO 使用其他组件库重写
    return (
      <Grid item xl={4} lg={6} md={6} sm={6} xs={12} >
        <Card className={classes.card}>
          <CardMedia
            onClick={this.beginEdit} 
            className={classes.media}
            image={thumbnail_url || "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/ee6abd28bece31864a13b934fdbda223"}
          />
          <CardContent>
            <div style={{marginTop: 20, marginBottom: 13}}>

            </div>
            <Typography gutterBottom variant="headline" component="h2">
              {name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={this.preview}>
              预览
            </Button>
            <Button onClick={this.beginEdit} size="small" color="primary" >
              使用该模板
            </Button>
          </CardActions>
        </Card>
      </Grid>

    );
  }
}

ChooseTemplateCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChooseTemplateCard);