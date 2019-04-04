import React, { Component } from "react";
import Stepper from "react-stepper-wizard";
import actions from "actions/lables/Lables";
import SelectLableTree from "./1/SelectLableTree";
import ShowLableTree from "./2/ShowLableTree";
import { connect } from "react-redux";
const { getTrees } = actions;
class LableTree extends Component {
  constructor() {
    super();
    this.changeCurrentStep = this.changeCurrentStep.bind(this);
  }

  componentDidMount() {}

  changeCurrentStep() {
    // switch (this.props.pipelineRunning.currentStep) {
    //   case 0:
    //     return <SelectPipeline />;
    //   case 1:
    //     return <ShowRunningPipeline />;
    // }
  }

  render() {
    return (
      <Stepper
        stepperData={this.props.lables}
        changeCurrentStep={this.changeCurrentStep}
      />
    );
  }
}

const mapStateToProps = state => {
  return { lables: state.lables };
};

export default connect(
  mapStateToProps,
  { getTrees }
)(LableTree);
