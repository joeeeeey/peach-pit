// edit 根节点 
// 显示最高权限的编辑器
// preview 其实是个空 div
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import nodeOperation from '../../share/nodeOperation'
import Modal from 'material-ui/Modal';

// 侧边栏以及 appbar
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

// 侧边栏工具
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
// icons 
import ExpandMore from 'material-ui-icons/ExpandMore';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import PageViewIcon from 'material-ui-icons/Pageview';
import BuildIcon from 'material-ui-icons/Build';
import AddIcon from 'material-ui-icons/Add';

// axios
import axios from 'axios'

const drawerWidth = 180;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  }
});

class EditableRoot extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      openPreview: false,
      openWithdraw: false,
      showOperations: false, // 侧边栏
    }
  }

  handleDrawerOpen = () => {
    this.setState({ openWithdraw: true });
  };

  handleDrawerClose = () => {
    this.setState({ openWithdraw: false });
  };

  addNode = (nodeName) => {
    let { selfkey } = this.props
    this.context.store.dispatch({
      type: 'addNode',
      payload: { selfKey: selfkey, nodeName: nodeName },
      target: 'node',
    });
  }

  addLetfRightGridNode = () => {
    this.addNode('LetfRightGrid')
  }
  addTextAreaNode = () => {
    this.addNode('TextArea')
  }

  // 单词首字母小写
  lowerFirstLetter = (s) => {
    return s.replace(/^.{1}/g, s[0].toLowerCase());
  }


  deploy = () => {
    axios.get('/api/user', {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    //  TODO 配置在文件中
    // 引入文件的路劲前缀
    let pathPrefix = '../components/preview/'

    let nodeData = this.context.store.getState().node

    let importComponents = []
    for (let i in nodeData) {
      if (nodeData[i].nodeName) {
        importComponents.push(nodeData[i].nodeName)
      }
    }

    importComponents = [...new Set(importComponents)]
    let importCode = ""
    for (let i = 0; i < importComponents.length; i++) {
      importCode += `import Preview${importComponents[i]} from '${pathPrefix + this.lowerFirstLetter(importComponents[i])}'\n`
    }

    let nodeCode = nodeOperation.flattenedData2Code(nodeData, 'deploy')
    let indexJsCode = `
import React, { Component } from 'react';
import withRoot from '../withRoot';    
${importCode}    
class Index extends Component {
  render() {
    return (
    ${nodeCode}
   );
  }
}

export default withRoot(Index);    
    `
    this.download(indexJsCode, 'deploy.txt', 'text/plain')
  }

  // 测试代码生成的功能，应该由后端完成
  // TODO Do it at Backend 
  download = (text, name, type) => {
    var a = document.getElementById("a");
    var file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
  }

  preview = () => {
    let setPreviewState = !this.state.openPreview
    this.setState({ openPreview: setPreviewState });

    this.context.store.dispatch({
      type: 'update',
      payload: { value: setPreviewState, nestedKey: 'isPreview' },
      target: 'user',
    });
  }

  showOperations = () => {
    this.setState({ showOperations: !this.state.showOperations });
  }

  render() {
    // this.setState({children: this.props.children})
    // console.log(this.props)
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>

        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.openWithdraw && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.openWithdraw}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.openWithdraw && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              编辑
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.openWithdraw && classes.drawerPaperClose),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />

          <List>
            <ListItem button onClick={this.preview}>
              <ListItemIcon>
                <PageViewIcon />
              </ListItemIcon>
              <Button style={{ marginLeft: 16, minWidth: 72 }} variant="raised" color="primary" >
                {this.state.openPreview ? '关闭' : '预览'}
              </Button>
            </ListItem>
            <ListItem button onClick={this.deploy}>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <Button style={{ marginLeft: 16, minWidth: 72 }} variant="raised" color="secondary" >
                部署
              </Button>
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <FileDownloadIcon />
              </ListItemIcon>
              {/* <ListItemText inset primary="download code" /> */}
              <a href="" id="a" style={{ marginLeft: 15 }}>dCode</a>
            </ListItem>
          </List>

          <Divider />
          <List>
            <ListItem button onClick={this.showOperations}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <Button style={{ marginLeft: 16, minWidth: 72 }} variant="raised" color="secondary" >
                操作
              </Button>
              {this.state.showOperations ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.showOperations} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={this.addLetfRightGridNode}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Add L1" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Add L2" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Drawer>


        <main className={classes.content} style={{marginTop: 50}}>
          {/* <Button style={{ marginTop: 70 }} onClick={this.addLetfRightGridNode}>增加一个左右布局</Button>
          <Button onClick={this.addTextAreaNode}>增加一个上下输入框布局</Button>
          <Button variant="raised" color="primary" onClick={this.preview}>
            {this.state.openPreview ? '关闭预览' : '在下方预览'}
          </Button>
          <Button id={"QWE"} style={{ marginLeft: 15 }} variant="raised" color="secondary" onClick={this.deploy}>一键部署</Button>
          <a href="" id="a" style={{ marginLeft: 15 }}>下载代码</a> */}
          {this.props.children}

        </main>


      </div>
    );
  }
}


EditableRoot.contextTypes = {
  store: PropTypes.object,
};


export default withStyles(styles, { withTheme: true })(EditableRoot);