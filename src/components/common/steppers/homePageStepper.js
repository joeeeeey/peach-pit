import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

function getSteps() {
  return ['选择模板', '进行编辑', '保存上线'];
}

class HomePageStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  autoStepperNext = () => {
    // 控制轮播次数
    if (this.carouselTimes > 0) {
      if (this.state.activeStep < 2) {
        this.setState({
          activeStep: this.state.activeStep + 1,
        });
      } else {
        this.carouselTimes = this.carouselTimes - 1
        this.setState({
          activeStep: 0,
        });
      }
    } else {
      clearInterval(this.timerID);
    }
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return { src: "http://blog-src.b0.upaiyun.com/taohe/dev/basic/template/9025623440c633292c88aca1d40ec9cb" };
      case 1:
        return { src: "http://blog-src.b0.upaiyun.com/taohe/dev/basic/template/983093c2c677c9937663bc0905546956" };;
      case 2:
        return { src: "http://blog-src.b0.upaiyun.com/taohe/dev/basic/template/65fce98c9db41edd3db1f8e3ccb5c19c" };;
      default:
        return { src: "http://blog-src.b0.upaiyun.com/taohe/dev/editPage/administrator/1/temporary/layout/d2376afa10f903913950b7bbfe624415" };;
    }
  }

  componentDidMount() {
    this.carouselTimes = 2
    this.timerID = setInterval(
      () => this.autoStepperNext(),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel style={{ fontSize: 20, "fontFamily": "\"Times New Roman\",Georgia,Serif" }}>{label}</StepLabel>
                <StepContent>
                  <div style={{ marginTop: 5, marginBottom: 5, width: '100%', textAlign: 'center' }}>
                    <div style={{ minWidth: 200, width: '80%', height: 300, margin: 'auto', }}>
                      <img
                        style={{ maxWidth: '100%', maxHeight: '100%', margin: "0 auto" }}
                        src={this.getStepContent(index).src}
                      />
                    </div>
                  </div>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        返回
                      </Button>
                      <Button
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? '完成！' : '下一步'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Button color="primary" variant="raised" onClick={this.handleReset} className={classes.button}>
              再看一遍
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

HomePageStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HomePageStepper);