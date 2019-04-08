import React, { Component } from "react";
import ReactTable from "react-table";
import { Button } from "reactstrap";
class UsersTable extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ReactTable
        columns={[
          {
            Header: "Username",
            accessor: "user_name"
          },
          {
            Header: "First Name",
            accessor: "first_name"
          },
          {
            Header: "Last Name",
            accessor: "last_name"
          },
          {
            Header: "Edit",
            Cell: row => {
              return (
                <Button
                  color="secondary"
                  onClick={() => this.props.onClickEditUser(row.original)}
                >
                  edit
                </Button>
              );
            }
          }
        ]}
        defaultSorted={[
          {
            id: "date",
            desc: false
          }
        ]}
        data={this.props.users}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    );
  }
}

export default UsersTable;
