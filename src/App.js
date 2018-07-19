import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Result from './components/Result';
import submit from './util/submit';


//Main Controller Class

class App extends Component {
  constructor(){
    super();
    this.installmentAmount = 0;
    this.noOfInst = 0;
    this.amountRef = React.createRef();
  }
  state={
    totalAmount:0,
    paid:0,
    installments:[],
    amount:0,
    noOfInst:0,
    disabled:true,
    error:'',
    msg:'',
    optional:'',
    optionalAmount:0,
    installmentAmount:0
}

//Get remaining amount by selecting option if user enter less than actuall ammount 
//Or Get the excess amount that should be deducted from the next installment
getOptionalAmount = ()=>{
  const installments = [...this.state.installments];
  const actuallInstallment = (installments.length && installments[this.noOfInst] ) || this.installmentAmount ;
  if(this.state.amount !== installments[this.noOfInst]){ 
    return  this.state.amount - actuallInstallment;
  }
}

//Cehck options between 'add to next' or 'create new installment'
//it's radio buttons controller
checkOptional = e=>{
  const optionalAmount = this.getOptionalAmount();
  this.setState({disabled:false, optional:e.target.value, optionalAmount});
}

//Get No Of Input field value;
getNoOfInst = e=>{
  const noOfInst = +e.target.value;
 
  let disabled = true
  if(this.state.totalAmount){
    disabled = false;
  }
  if(!isNaN(noOfInst)){
  this.setState({   
        noOfInst,
        disabled,
        error:'',
        msg:'',
        optional:false
    });
  }else {
    this.setState({
         error:'Please Enter Amount',
         disabled: true
    })
  }
}

//Get 'Fee Amount' input feild value;
getTotlaAmount= e=>{
  const totalAmount = +e.target.value;
 
  if(!isNaN(totalAmount)){
    let disabled = true
  if(this.state.noOfInst){
    disabled = false;
  }
  this.setState({   
        totalAmount,
        disabled,
        error:'',
        msg:'',
        optional:false
    });
  }else {
    this.setState({
         error:'Please Enter Amount',
         disabled: true
    })
  }
}

//Get 'Fee Amount' input feild value;
getAmount = e=>{
  const amount = +e.target.value;
  if(!isNaN(amount)){
    if(amount > this.state.totalAmount-this.state.paid){
      this.setState({error:"This Amount is greater than actual fees to be paid",amount,
      disabled:true})
    }else{
  this.setState({   
        amount,
        disabled:false,
        error:'',
        msg:'',
        optional:false
    });
  }
} else {
  this.setState({
       error:'Please Enter Amount',
       disabled: true
  })
}
}

// Function which get executed when form gets submitted
// This function contains all the logic of challenge
pay = submit.bind(this);

//Reset entire state to enter new values
reset = ()=>
  {this.amountRef.current.disabled = false; this.setState({
    totalAmount:0,
    paid:0,
    installments:[],
    amount:0,
    noOfInst:0,
    disabled:true,
    error:'',
    msg:'',
    optional:'',
    optionalAmount:0,
    installmentAmount:0
});this.noOfInst=0;}

//Immutable function to render UI
render() {
  const result =`Installments Structure :${Array.isArray(this.state.installments) ? this.state.installments.join(','):this.state.installments}`;
  return (
      <div className="App">
        <Form
        amount= {this.state.amount} 
        noOfInst= {this.state.noOfInst} 
        getAmount= {this.getAmount} 
        getNoOfInst = {this.getNoOfInst}
        error= {this.state.error}
        requiredAmount = {this.instAmount}
        disabled= {this.state.disabled}
        pay= {this.pay}
        checkOptional= {this.checkOptional}
        msg = {this.state.msg}
        amountRef = {this.amountRef}
        totalAmount = {this.state.totalAmount}
        reset = {this.reset}
        getTotlaAmount={this.getTotlaAmount}
        />
        <Result result={result}/>
      </div>
    );
  }
}
export default App;
