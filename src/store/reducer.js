const initialState = {
     counter : 0,
      model : {
        id : "",
        date: "",
        description: "",
        incomeExpense: "",
        amount: 0,
        summary: 0
    },
    allDetails : []
};

const myReducer = (state = initialState, action) => { 
  switch (action.type) {
    case "ADD":
      {
        console.log("add");
        let copyModel = { ...action.modelObj };
        console.log(copyModel); 
        let copyofAllDetails = [...state.allDetails];
    
        let summaryTally = Number(copyModel.summary);
        
        if (copyModel.incomeExpense === "income") {
          summaryTally = summaryTally + Number(copyModel.amount);
        }
    
        if (copyModel.incomeExpense === "expense") {
          summaryTally = summaryTally - Number(copyModel.amount);
        }
        state.model = {
          ...copyModel,
           id :action.id,
          summary: summaryTally
        };

        state.allDetails.push(state.model);
        console.log(state.model);
        return {...state};
      }
      
    case "UPDATE":
      return {
        //counter: state.counter - 1
      };
    case "ONCHANGE":
      {
        
        const nam = action.event.target.name;
        console.log(nam);
    
       // setModel({ ...model, [nam]: action.event.target.value });
       const modelObj = { ...state.model, [nam]: action.event.target.value }
       console.log(modelObj);
        return {...state, modelObj };
      }
        

    case "DELETE":
      return {
        //counter: 0
      };
    default:
      return state;
  }


};

export default myReducer;
