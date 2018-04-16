import React, { Component } from 'react';
import AppBar from '../../components/common/layouts/appBar'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import ResponsiveCardGrid from '../../components/common/grids/responsiveCardGrid'
import { Redirect } from 'react-router-dom'

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  root: {
    textAlign: 'center',
    backgroundColor: 'white',
    height: window.innerHeight,
  },
  // imgae: {
  //   width: window.innerWidth,
  //   zIndex: -10,
  // }
});

class Home extends Component {
  constructor(props, context) {
    super(props)
    this.state = {redirectEdit: false}
  }


  getChildContext() {
    return { store: this.context.store };
  }

  render() {
    const { redirectEdit } = this.state;

    if (redirectEdit) {
      return <Redirect to='/admin/editPage'/>;
    }

    const { classes } = this.props;
    const containerConfig = {
      justify: "center",
      spacing: 16,
    }

    const gridStyle = { marginTop: 12, paddingLeft: 16, paddingRight: 16, height: 'auto' }
    const cardStyle = { minWidth: 230 }

    return (
      <div className={classes.root}>
        <AppBar />
        <div style={{ marginTop: 20, paddingLeft: 35, paddingRight: 35 }}>
          <ResponsiveCardGrid containerConfig={containerConfig}>
            <Grid item lg={4} md={4} sm={5} xs={11} style={gridStyle}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography style={{ marginBottom: 16, fontSize: 14 }} color="textSecondary">
                    用户进入网页模板可以添加的样式
                </Typography>
                  <Typography variant="headline" component="h2">
                    Layouts
                </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" style={{ marginLeft: 'auto'}}>查看所有</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item lg={4} md={4} sm={5} xs={11} style={gridStyle}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography style={{ marginBottom: 16, fontSize: 14 }} color="textSecondary">
                    用户可以选择的网站模板
                </Typography>
                  <Typography variant="headline" component="h2">
                    Templates
                </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" style={{ marginLeft: 'auto'}}>查看所有</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item lg={4} md={4} sm={5} xs={11} style={gridStyle}>
              <Card style={{ minWidth: 230 }}>
                <CardContent>
                  <Typography style={{ marginBottom: 16, fontSize: 14 }} color="textSecondary">
                   新增板块
                </Typography>
                  <Button component={Link} to={`/admin/editPage?source=${null}`} variant="fab" color="secondary" aria-label="add" style={{ margin: 6 }}>
                    <AddIcon />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </ResponsiveCardGrid>
        </div>

      </div>
    );
  }
}

Home.contextTypes = {
  store: PropTypes.object
};

Home.childContextTypes = {
  store: PropTypes.object
};

export default withStyles(styles)(Home);






  // const styles = theme => ({
  //   root: {
  //     flexGrow: 1,
  //   },
  //   card: {
  //     padding: theme.spacing.unit * 1,
  //     textAlign: 'center',
  //     margin: 20,
  //   },
  //   media: {
  //     height: 300,
  //   },
  // });

  // class WebTemplate extends React.Component {
  //   render() {
  //     const { classes, data } = this.props;
  //     const { content, imgUrl, templateId } = data

  //     return (
  //       <Grid item lg={5} md={5} sm={5} xs={11} >
  //         <Card className={classes.card}>
  //           <CardMedia
  //             component={Link} to={`/site/${templateId}/edit`}
  //             className={classes.media}
  //             image={`/images/${imgUrl}`}
  //           />
  //           <CardContent>
  //             <Typography gutterBottom variant="headline" component="h2">
  //               {content}
  //             </Typography>
  //           </CardContent>
  //           <CardActions>
  //             <Button size="small" color="primary" >
  //               查看
  //             </Button>
  //             <Button size="small" color="primary" component={Link} to={`/site/${templateId}/edit`}>
  //               开始编辑
  //             </Button>
  //           </CardActions>
  //         </Card>
  //       </Grid>

  //     );
  //   }
  // }

  // WebTemplate.propTypes = {
  //   classes: PropTypes.object.isRequired,
  // };

  // export default withStyles(styles)(WebTemplate);