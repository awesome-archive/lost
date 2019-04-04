import React, { Component } from "react";
import Stepper from "react-stepper-wizard";
import actions from "actions/labels/Labels";
import SelectLabelTree from "./1/SelectLabelTree";
import ShowLabelTree from "./2/ShowLabelTree";
import { connect } from "react-redux";
const { getTrees, selectTab } = actions;
class LableTree extends Component {
  constructor() {
    super();
    this.changeCurrentStep = this.changeCurrentStep.bind(this);
  }

  componentDidMount() {
    this.props.getTrees();
  }

  changeCurrentStep(newStep) {
    this.props.selectTab(newStep);
  }

  renderContent() {
    switch (this.props.stepper.currentStep) {
      case 0:
        return <SelectLabelTree data={this.props.treeData} />;
      case 1:
        return <ShowLabelTree {...this.props.selectedTree} />;
    }
  }

  render() {
    return (
      <div className="labels-container">
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
  return {
    stepper: state.labels.stepper,
    treeData: state.labels.treeData,
    selectedTree: state.labels.selectedTree
  };
};

export default connect(
  mapStateToProps,
  { getTrees, selectTab }
)(LableTree);
