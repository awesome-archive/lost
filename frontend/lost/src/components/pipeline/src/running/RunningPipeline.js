import React, { Component } from "react";
import { connect } from "react-redux";

import "../globalComponents/node.scss";
import "../globalComponents/pipeline.scss";
import Stepper from "react-stepper-wizard";
import SelectPipeline from "./1/SelectPipeline";
import ShowRunningPipeline from "./2/ShowRunningPipeline";
import actions from "actions/pipeline/pipelineRunning";
const { selectTab } = actions;

class RunningPipeline extends Component {
  constructor() {
    super();
    this.changeCurrentStep = this.changeCurrentStep.bind(this);
  }

  renderContent() {
    switch (this.props.pipelineRunning.currentStep) {
      case 0:
        return <SelectPipeline />;
      case 1:
        return <ShowRunningPipeline />;
    }
  }

  changeCurrentStep(newStep) {
    this.props.selectTab(newStep);
  }

  render() {
    console.log("---------üüüüüüüüüüüüüü---------------------------");
    console.log(this.props);
    console.log("------------------------------------");
    return (
      <div className="pipeline-running-container">
        <Stepper
          stepperData={this.props.pipelineRunning}
          changeCurrentStep={this.changeCurrentStep}
        />

        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { pipelineRunning: state.pipelineRunning };
};

export default connect(
  mapStateToProps,
  { selectTab }
)(RunningPipeline);
