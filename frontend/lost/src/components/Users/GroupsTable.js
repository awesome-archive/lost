import React, { Component } from "react";
import ReactTable from "react-table";
class GroupsTable extends Component {
  constructor() {
    super();
  }

  render() {
    console.log("---------xxxxxxxxxxxx---------------------------");
    console.log(this.props);
    console.log("------------------------------------");
    return (
      <ReactTable
        columns={[
          {
            Header: "Group",
            accessor: "name"
          }
        ]}
        data={this.props.groups}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    );
  }
}

export default GroupsTable;
