import React, { Component } from 'react';
import './App.css';
import Form from './components/form';
class App extends Component {
  constructor(){
    super();
    this.amount = 10000;
    this.instAmount = this.amount/this.state.noOfInst;
    this.noOfInst = this.state.noOfInst;
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
    optionalAmount:0
}

checkOptional = e=>{
  let optionalAmount = 0;
  const installments = [...this.state.installments];
  const actuallInstallment = (installments.length && installments[installments.length-this.state.noOfInst] ) || this.instAmount;
  optionalAmount = this.state.amount - actuallInstallment;
  this.setState({disabled:false, optional:e.target.value, optionalAmount});
}

getNoOfInst = e=>{
  const noOfInst = +e.target.value;
  console.log(noOfInst);
  console.log(noOfInst);
  if(!isNaN(noOfInst)){
  this.setState({   
        noOfInst,
        disabled:false,
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

getTotlaAmount= e=>{
  const totalAmount = +e.target.value;
  console.log(totalAmount);
  if(!isNaN(totalAmount)){
  this.setState({   
        totalAmount,
        disabled:false,
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
getAmount = e=>{
  const amount = +e.target.value;
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
pay = (e)=>{
      e.preventDefault();
   if(this.state.amount === this.state.totalAmount){
      this.setState({installments : 'You Have Paid Full Fee Amount'});
   }else if(this.state.amount > this.instAmount && !this.state.optional){
      this.setState({msg:'This Amount is greater than minimum required installment',disabled:true});
    }else if(this.state.amount < this.instAmount && this.state.amount !== 0 && !this.state.optional){
      this.setState({msg:'This Amount is less than minimum required installment',disabled:true});
    }else{ 
      if(this.state.noOfInst < this.state.totalAmount){
        console.log(this.state.noOfInst,'asdf');
      const installmentAmount = Math.round(this.state.totalAmount/this.state.noOfInst);
      console.log(this.state.noOfInst, installmentAmount);
      let installments = new Array(this.state.noOfInst).fill(installmentAmount);
      this.setState({installments});
    }
  else{
    console.log('asdfo');
    this.setState({error: "No of installments are greadter than actuall fee amount"});
    }
  }
}
reset = ()=>
  this.setState({
    paid:0,
    installments:[],
    amount:0,
    noOfInst:4,
    disabled:false,
    error:'',
    msg:'',
    optional:'',
    optionalAmount:0
});

render() {
  console.log(this.state);
 
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
        <h4> Installments Structure : {Array.isArray(this.state.installments) ? this.state.installments.join(','):this.state.installments}</h4>
      </div>
    );
  }
}
export default App;
