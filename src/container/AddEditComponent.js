import React from "react";
import Listcomponent from "./ListComponent";
import "./style.css";
import { connect } from "react-redux";


class AddEditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objDetail: {
        id : "",
        date: "",
        description: "",
        incomeExpense: "",
        amount: 0,
        summary: 0
      },
      allDetails: []
    };
  }


  handleChange = event => {
    const nam = event.target.name;
    console.log(nam);

    this.setState({
      objDetail: { ...this.state.objDetail, [nam]: event.target.value }
    });
    console.log(this.state.objDetail);
  };


  handleAddDetail = () => {
    let copyofObjDetail = { ...this.state.objDetail };
    let copyofAllDetails = [...this.state.allDetails];

    let summaryTally = Number(copyofObjDetail.summary);
    
    if (copyofObjDetail.incomeExpense === "income") {
      summaryTally = summaryTally + Number(copyofObjDetail.amount);
    }

    if (copyofObjDetail.incomeExpense === "expense") {
      summaryTally = summaryTally - Number(copyofObjDetail.amount);
    }
    copyofObjDetail = {
      ...this.state.objDetail,
      summary: summaryTally,
      id:this.generateKey(this.state.objDetail.description)
    };

    this.setState({
      objDetail: { ...copyofObjDetail  },
      allDetails: copyofAllDetails.concat(copyofObjDetail)
    });
    console.log("all details");
    console.log(this.state.allDetails);
  };


  handleUpdateDetail = () => {
    
    let cloneObjDetail = { ...this.state.objDetail };
    let cloneDetails = [...this.state.allDetails];

    const index = cloneDetails.findIndex(
      obj => obj.id === this.state.objDetail.id
    );

    cloneDetails[index] = { ...cloneObjDetail };

    this.setState({
      allDetails: [...cloneDetails]
    });

  };


  handleDelete = detail => {
    const copyofAllDetails = [...this.state.allDetails];
    const updatedDetails = copyofAllDetails.filter(
      el => el.id !== detail.id
    );
    console.log(updatedDetails);
    this.setState({
      allDetails: [...updatedDetails]
    });
  };

  handleEdit = detail => {
    this.setState({
      objDetail: { ...detail }
    });
  };


 generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
}


  handleClear = () => {
    let cloneObjDetail = {  };

    this.setState({
      objDetail :{...cloneObjDetail}
    });
  };



  render() {
    return (
      <div>
        <h1>Wallet Tracker</h1>
        <h4>Add Details</h4>

        <table>
          <tbody>
            <tr>
              <td>
                <label>Date : </label>
              </td>
              <td>
                <input
                  type="date"
                  name="date"
                  onChange={this.handleChange}
                  value={this.state.objDetail.date}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Description : </label>
              </td>
              <td>
                <input
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.objDetail.description}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Income or Expense : </label>
              </td>
              <td>
                <select
                  onChange={this.handleChange}
                  name="incomeExpense"
                  value={this.state.objDetail.incomeExpense}
                >
                  <option value="select">select</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>Amount : </label>
              </td>
              <td>
                <input
                  type="number"
                  name="amount"
                  value={this.state.objDetail.amount}
                  onChange={this.handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td />
              <td>
                <button onClick={this.handleAddDetail}>Add new</button>
                <button onClick={this.handleUpdateDetail}>Update</button>
                

                <button onClick={this.props.onAddDetailRdx}>Add new - redux</button>
            
                
              </td>
            </tr>
          </tbody>
        </table>

        <br />
        <Listcomponent
          details={this.state.allDetails}
          parentCallBack={this.handleDelete}
          parentCallBackEdit={this.handleEdit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    currentStateRdx: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddDetailRdx: () => dispatch({ type: "Add" }),
    
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditComponent);
