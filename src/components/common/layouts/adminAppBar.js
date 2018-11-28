import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import { Link } from "react-router-dom";
import Menu, { MenuItem } from "material-ui/Menu";
import AccountCircle from "material-ui-icons/AccountCircle";
import Cookies from "js-cookie";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class ButtonAppBar extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logOut = () => {
    this.setState({ anchorEl: null });
    Cookies.remove("taohe_admin", { path: "/" });
    Cookies.remove("taohe_admin.sig", { path: "/" });
    window.location.reload();
  };

  render() {
    // 控制 bar 上用户图标
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              component={Link}
              to="/admin/home"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            />
            {/* TODO user state */}
            {this.context.store.getState().administrator.isLogin ? (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}>
                  <MenuItem onClick={this.handleClose}>我的信息</MenuItem>
                  <MenuItem onClick={this.logOut}>登出</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button component={Link} to="/user/login" color="inherit">
                登录
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.contextTypes = {
  store: PropTypes.object
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
