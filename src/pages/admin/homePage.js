import React, { Component } from 'react';
import AppBar from '../../components/common/layouts/adminAppBar'
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

import BlankCard from '../../components/common/cards/blankCard'

const styles = theme => ({
  root: {
    // textAlign: 'center',
    backgroundColor: 'white',
    // height: window.innerHeight,
  },
});

function simpleIntro(title, headline) {
  return (
    <CardContent>
      <Typography style={{ marginBottom: 16, fontSize: 14 }} color="textSecondary">
        {title}
      </Typography>
      <Typography variant="headline" component="h2">
        {headline}
      </Typography>
    </CardContent>
  )
}

class Home extends Component {
  constructor(props, context) {
    super(props)
  }


  getChildContext() {
    return { store: this.context.store };
  }

  render() {
    const { classes } = this.props;
    // const containerConfig = {
    //   justify: "center",
    //   spacing: 16,
    // }

    return (
      <div className={classes.root}>
        <AppBar />
        <div style={{ marginTop: 20, paddingLeft: 35, paddingRight: 35 }}>
          <ResponsiveCardGrid>
            <BlankCard>
              {simpleIntro('用户进入网页模板可以添加的样式', 'Layouts')}
              <CardActions>
                <Button size="small" component={Link} to={`/admin/layoutIndex`} style={{ marginLeft: 'auto' }}>查看所有</Button>
              </CardActions>
            </BlankCard>
            <BlankCard>
              {simpleIntro('用户可以选择的网站模板', 'Templates')}
              <CardActions>
                <Button size="small" component={Link} to={`/admin/templateIndex`} style={{ marginLeft: 'auto' }}>查看所有</Button>
              </CardActions>
            </BlankCard>
            <BlankCard>
              <CardContent>
                <Typography style={{ marginBottom: 16, fontSize: 14 }} color="textSecondary">
                  新增板块
                </Typography>
                <Button component={Link} to={`/admin/editPage?source=${null}`} variant="fab" color="secondary" aria-label="add" style={{ margin: 6 }}>
                  <AddIcon />
                </Button>
              </CardContent>
            </BlankCard>
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