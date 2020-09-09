import React,{useState,useEffect, Fragment} from "react";
import Listcomponent from "./ListComponent";
import "./style.css";
import { useSelector,useDispatch } from "react-redux";


const AddEdit = ()=>{

  const [obj,setObj] = useState({
                id : "",
                date: "",
                description: "",
                incomeExpense: "",
                amount: 0,
                summary: 0
              }
  ); 
  
  //const [allDetails,setAllDetails] = useState([]);


  const model = useSelector(state=>state.model);
  const allDetails = useSelector(state=>state.allDetails);

  const dispatch = useDispatch(); 
  
 const handleChange = event => {
    const nam = event.target.name;
    console.log(nam);

    setObj({ ...obj, [nam]: event.target.value });
    console.log(obj);
  };

const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
}

const summaryCal=()=>{

}

  const handleAddDetail = () => {

    let copyModel = { ...model };
    let copyofAllDetails = [...allDetails];

    let summaryTally = Number(copyModel.summary);
    
    if (copyModel.incomeExpense === "income") {
      summaryTally = summaryTally + Number(copyModel.amount);
    }

    if (copyModel.incomeExpense === "expense") {
      summaryTally = summaryTally - Number(copyModel.amount);
    }
    copyModel = {
      ...model,
      summary: summaryTally,
      id: generateKey(model.description)
    };

  //  setModel({ ...copyModel  });
    //setAllDetails(copyofAllDetails.concat(copyModel));
    
    console.log("all details");
    console.log(allDetails);

  };

  const handleUpdateDetail = ()=>{
    let cloneModel = { ...model };
    let cloneDetails = [...allDetails];

    const index = cloneDetails.findIndex(
      obj => obj.id === model.id
    );
    cloneDetails[index] = { ...cloneModel };
   // setAllDetails([...cloneDetails]);
   };
   
  const handleEdit = detail => {
    //setModel({...detail});
  };

  const handleDelete = detail => {
    const copyofAllDetails = [...allDetails];
    const updatedDetails = copyofAllDetails.filter(
      el => el.id !== detail.id
    );
    console.log(updatedDetails);
   // setAllDetails([...updatedDetails]);

  };


  return(
    <Fragment>
      <h2>Add Edit Functionl component</h2>
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
                  onChange={(e)=>handleChange(e)}
                  value ={obj.date}
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
                  onChange={(e)=>handleChange(e)}
                  value ={obj.description}
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
                  onChange={(e)=>handleChange(e)}
                  name="incomeExpense"
                  value ={obj.incomeExpense}
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
                  value ={obj.amount}
                  onChange={(e)=>handleChange(e)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td />
              <td>
                <button onClick={handleAddDetail}>Add new</button>
                <button onClick={handleUpdateDetail}>Update</button>

                <button onClick={()=>dispatch({type : 'ADD', modelObj:{...obj}, id:generateKey(obj.description) })}>Add new rdx</button>
                <button onClick={()=>dispatch({type : 'UPDATE'})}>update rdx</button>

                <button onClick={()=>dispatch({type : 'ADD'})}>Count++</button>

                <p>
                  {model.counter}
                </p>
                <p>
                  {obj.summary}
                </p>
              </td>
            </tr>
          </tbody>
        </table>  

        <br />
        <Listcomponent
          details={allDetails}
          parentCallBack={handleDelete}
          parentCallBackEdit={handleEdit}
        />
      </div>  
    </Fragment>
    


  );

}

export default AddEdit;