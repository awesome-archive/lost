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

  componentDidMount() {
    this.props.getTrees();
  }

  changeCurrentStep() {}

  renderContent() {
    switch (this.props.stepper.currentStep) {
      case 0:
        return <SelectLableTree data={this.props.step0Data} />;
      case 1:
        return <ShowLableTree />;
    }
  }

  render() {
    return (
      <div className="lables-container">
        <Stepper
          stepperData={this.props.stepper}
          changeCurrentStep={this.changeCurrentStep}
        />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { stepper: state.lables.stepper, step0Data: state.lables.step0Data };
};

export default connect(
  mapStateToProps,
  { getTrees }
)(LableTree);
