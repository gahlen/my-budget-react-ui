import React, { Component } from "react";
import CategoryList from "./CategoryList";
import "../styles/Category.css";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      budgetAmount: "",
      entryData: [],
      budgetTotal: 0
    };
  }

  getData = () => {
    fetch("http://localhost:4000/category", {
      method: "GET"
    })
      .then(res => res.json())
      .then(entries => {
        this.setState(() => ({
          entryData: entries.sort((a,b) => {
            if (a.category < b.category) {
              return -1
            }
            if (a.category > b.category) {
              return 1
            }           
          })
        }))
      })
      .then(() => {
        this.state.entryData.forEach(element => {
          this.setState({
            budgetTotal:
              this.state.budgetTotal + parseFloat(element.budgetAmount)
          },              console.log("total budget",this.state.budgetTotal, parseFloat(element.budgetAmount))
          );
        });
      })
      .catch(err => console.log("error", err));
  };

  componentDidMount() {
    this.getData();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const id = e.target.id;
    const { entryData, ...body } = this.state;
    if (this.state.category !== "" && this.state.budgetAmount !== "") {
      switch (id) {
        case "a":
          await fetch("http://localhost:4000/category", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          })
            .then(() => this.setState({ category: "", budgetAmount: "", budgetTotal: 0 }))
            .then(() => {
              this.getData();
            });
          break;
        case "u":
          await fetch(
            `http://localhost:4000/category/${this.state.category}/${
              this.state.budgetAmount
            }`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" }
            }
          )
            .then(() => this.setState({ category: "", budgetAmount: "", budgetTotal: 0 }))
            .then(() => {
              this.getData();
            });
          break;
        case "d":
          await fetch(`http://localhost:4000/category/${this.state.category}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
          })
            .then(() => this.setState({ category: "", budgetAmount: "", budgetTotal: 0 }))
            .then(() => {
              this.getData();
            });
          break;
        default:
          break;
      }
    }
  };

  render() {
    return (
      <>
        <form className="container animate">
          <div className="flexButton">
            <label htmlFor="category">
              <b>Category</b>
            </label>
            <input
              type="text"
              placeholder="Enter Category"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="budgetAmount">
              <b>Budget Amount</b>
            </label>
            <input
              type="text"
              placeholder="Enter Amount"
              name="budgetAmount"
              value={this.state.budgetAmount}
              onChange={this.handleChange}
            />
            <div>
              <button id="a" onClick={this.handleSubmit} type="submit">
                Add
              </button>
              <button id="u" onClick={this.handleSubmit} type="submit">
                Update
              </button>
              <button id="d" onClick={this.handleSubmit} type="submit">
                Delete
              </button>
            </div>
          </div>
          <div className="budget">
            <CategoryList entryData={this.state.entryData} />
            <h3>Budget Total: {this.state.budgetTotal} </h3>
          </div>
        </form>
      </>
    );
  }
}

export default Category;
