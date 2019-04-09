import React, { Component } from "react";
import ReactTable from "react-table";
import { Menu, Item, IconFont, MenuProvider, animation } from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";
import ContextMenu from "./contextMenus/GroupContextMenu";

class GroupsTable extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <ReactTable
          columns={[
            {
              Header: "Group",
              accessor: "name"
            },
            {
              Header: "Options",
              Cell: row => {
                return (
                  <ContextMenu
                    idx={row.original.idx}
                    onDelete={this.props.onDelete}
                  />
                );
              }
            }
          ]}
          data={this.props.groups}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default GroupsTable;
