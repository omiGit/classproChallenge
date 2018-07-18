import React, { Component } from 'react';
import './App.css';
import Form from './components/form';
class App extends Component {
  constructor(){
    super();
    this.amount = 10000;
    this.instAmount = this.amount/this.state.noofinst;
    this.noofinst = this.state.noofinst;
    this.amountRef = React.createRef();
  }

  state={
    paid:0,
    installments:[],
    amount:0,
    noofinst:4,
    disabled:false,
    error:'',
    msg:'',
    optional:'',
    optionalAmount:0
}

checkOptional = e=>{
  let optionalAmount = 0;
  const installments = [...this.state.installments];
  const actuallInstallment = (installments.length && installments[installments.length-this.state.noofinst] ) || this.instAmount;
  optionalAmount = this.state.amount - actuallInstallment;
  this.setState({disabled:false, optional:e.target.value, optionalAmount});
}

getAmount = e=>{
  const amount = Math.round(e.target.value);
  if(!isNaN(amount)){
    if(amount > this.amount){
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

pay=(e)=>{
  e.preventDefault();
 if(this.state.amount > this.instAmount && !this.state.optional){
    this.setState({msg:'This Amount is greater than minimum required installment',disabled:true});
  }else if(this.state.amount < this.instAmount && this.state.amount !== 0 && !this.state.optional){
    this.setState({msg:'This Amount is less than minimum required installment',disabled:true});
  }
  else{
    let installments = !this.state.installments.length ? new Array(this.noofinst).fill(this.instAmount):[...this.state.installments];
    let  optionalAmount = this.state.optionalAmount; 
    if(this.state.optional === 'nextInst'){
      if(optionalAmount > 0){
          installments[installments.length-this.state.noofinst] = this.state.amount;
          installments[installments.length-this.state.noofinst+1]-= optionalAmount;
      }else if(optionalAmount < 0){
        installments[installments.length-this.state.noofinst] = this.state.amount;
        installments[installments.length-this.state.noofinst+1]-= optionalAmount;
    }
    }else if(this.state.optional === 'newInst'){
      installments[installments.length-this.state.noofinst] = this.state.amount;
      installments[installments.length] = -optionalAmount;
    }
    this.amount = this.amount - this.state.amount;
    this.setState((prevState)=>({paid: prevState.paid+prevState.amount,installments,optionalAmount,disabled:true, noofinst:prevState.noofinst-1,msg:''}));
    this.amountRef.current.focus();
  }
}

reset = ()=>
  this.setState({
    paid:0,
    installments:[],
    amount:0,
    noofinst:4,
    disabled:false,
    error:'',
    msg:'',
    optional:'',
    optionalAmount:0
});

render() {
  return (
      <div className="App">
        <Form
        amount= {this.state.amount} 
        noofinst= {this.state.noofinst} 
        getAmount= {this.getAmount} 
        error= {this.state.error}
        requiredAmount = {this.instAmount}
        disabled= {this.state.disabled}
        pay= {this.pay}
        checkOptional= {this.checkOptional}
        msg = {this.state.msg}
        amountRef = {this.amountRef}
        reset = {this.reset}
        />
        <h4> Installments Structure : {this.state.installments.join(',')}</h4>
      </div>
    );
  }
}
export default App;
