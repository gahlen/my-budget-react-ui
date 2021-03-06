import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

const columns = [
  { text: "Category", dataField: "category" },
  { text: "Budget Amt", dataField: "budgetAmount" },
  { text: "Balance Forward", dataField: "budgetBalance"}
];

class CategoryList extends Component {

  render() {

    return (
      <div>
        <BootstrapTable
          keyField="_id"
          data={this.props.entryData}
          columns={columns}
        />
      </div>
    );
  }
}
export default CategoryList