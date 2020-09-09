import React, { Fragment } from "react";
import "./style.css";

//const Listcomponent = props => {

export const ListIteams = props => {
  return (
    <Fragment>
      <tr>
        <td>{props.sNo + 1}</td>
        <td>{props.detail.date}</td>
        <td>{props.detail.description}</td>
        <td>{props.detail.incomeExpense}</td>
        <td>{props.detail.amount}</td>
        <td>{props.detail.summary}</td>
        <td className="delete">
          <button onClick={() => props.handleDelete(props.detail)}>X</button>
        </td>
        <td className="add">
          <button onClick={() => props.handleEdit(props.detail)}>Edit</button>
        </td>
      </tr>
    </Fragment>
  );
};

class Listcomponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: this.props.details
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.details !== state.details) {
      return {
        details: props.details
      };
    }
    return null;
  }

  render() {
    return (
      <Fragment>
        <h1>List Component</h1>
        <table className="listcomponent">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Description</th>
              <th>Income or Expense</th>
              <th>Amount</th>
              <th>Summary</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.details.map((detail, idx) => (
              <ListIteams
                key={detail.id}
                detail={detail}
                sNo={idx}
                handleDelete={this.props.parentCallBack}
                handleEdit={this.props.parentCallBackEdit}
              />
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default Listcomponent;
