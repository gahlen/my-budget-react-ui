import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { LedgerContext } from "../context/LedgerContext";
import { BUDGET_API } from "../config/Coms";

class BudgetManage extends Component {
  static contextType = LedgerContext // define consumer context for use outside of render...
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      entryData: [],
      categoryData: [],
      incomeData: []
    };
    
  }

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      this.setState(() => ({
        selected: [...this.state.selected, row.refNumber]
      }));
      this.props.history.push({
        pathname: "/budgetTrans",
        state: {
          description: row.description,
          refNumber: row.refNumber,
          amount: row.amount,
          category: row.category,
          type: row.type,
          processed: row.processed,
          postDate: row.postDate
        }
      });
    }
  };

  getBankData = () => {
    const startDate = this.context.startDate  // Use context in this manner to obtain context values
    const endDate = this.context.endDate  

    console.log("startDate",startDate, endDate)

    fetch(`${BUDGET_API}/summary/${startDate}/${endDate}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(entries => {
        this.setState(() => ({
          entryData: entries
        }));
      })
      .catch(err => console.log("error", err));
  };

  componentDidMount() {
    this.getBankData();
  }

  

  render() {
    const selectRow = {
      hideSelectColumn: true,
      clickToSelect: true,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll,
    };

    const columns = [
      { text: "Reference Id", dataField: "refNumber" },
      { text: "Type", dataField: "type" },
      { text: "Post Date", dataField: "postDate" },
      { text: "Description", dataField: "description" },
      { text: "Category", dataField: "category" },
      { text: "Amount", dataField: "amount" },
      { text: "Processed", dataField: "processed" }
    ];

    return (
      <form className="flexManagePage">
          <LedgerContext.Consumer>
              {({ startDate, endDate }) => <h4>Budget Date-- { startDate } thru { endDate }</h4>}
          </LedgerContext.Consumer>
        <BootstrapTable
          keyField="refNumber"
          data={this.state.entryData}
          columns={columns}
          selectRow={selectRow}
        />   
      </form>
    );
  }
}
export default BudgetManage;
