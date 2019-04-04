import React, { Component } from "react";
import actions from "actions";
import { connect } from "react-redux";
import ErrorMessage from "rootComponents/ErrorMessage";
import ReactTable from "react-table";
const { getTree } = actions;
var amountOfLabels = 0;
class SelectLableTree extends Component {
  constructor() {
    super();
  }

  getAmountOfLabels(child, count) {
    child.children.forEach(el => {
      count++;
      if (el.children) {
        this.getAmountOfLabels(el, count);
      }
    });
    return count;
  }

  renderDatatable() {
    if (this.props.data) {
      if (this.props.data.error) {
        return <ErrorMessage message={this.props.data.error} />;
      }
      return (
        <ReactTable
          columns={[
            {
              Header: "Tree Name",
              accessor: "name"
            },
            {
              Header: "Description",
              accessor: "description"
            },
            {
              Header: "Amount of Labels",
              id: "idx",
              accessor: d => {
                amountOfLabels = 0;
                return getAmountOfLabels(d, 0) - 1;
              }
            },
            {
              Header: "Date",
              accessor: "timestamp"
            }
          ]}
          getTrProps={(state, rowInfo) => ({
            onClick: () => console.log(rowInfo)
          })}
          defaultSorted={[
            {
              id: "date",
              desc: false
            }
          ]}
          data={this.props.data.response}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      );
    }
  }

  render() {
    return <div className="lables-1">{this.renderDatatable()}</div>;
  }
}

function getAmountOfLabels(n) {
  amountOfLabels += 1;
  if (n.children === undefined) return 1;
  n.children.forEach(function(c) {
    getAmountOfLabels(c);
  });
  return amountOfLabels;
}

export default connect(
  null,
  { getTree }
)(SelectLableTree);
