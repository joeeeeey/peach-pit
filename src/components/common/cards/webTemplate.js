// Card 组件
// 网页模板 

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    margin: 20,
    // maxWidth: 345,
  },
  media: {
    height: 300,
  },
});

class WebTemplate extends React.Component {
  render() {
    const { classes, data } = this.props;
    const { content, imgUrl, templateId } = data

    return (
      <Grid item lg={5} md={5} sm={5} xs={11} >
        <Card className={classes.card}>
          <CardMedia
            component={Link} to={`/sites/${templateId}/edit`}
            className={classes.media}
            image={`/images/${imgUrl}`}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" >
              查看
            </Button>
            <Button size="small" color="primary" component={Link} to={`/sites/${templateId}/edit`}>
              开始编辑
            </Button>
          </CardActions>
        </Card>
      </Grid>

    );
  }
}

WebTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WebTemplate);