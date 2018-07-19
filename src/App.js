import React, { Component } from 'react';
import './App.css';
import Form from './components/form';
class App extends Component {
  constructor(){
    super();
    this.installmentAmount = 0;
    //this.instAmount = this.amount/this.state.noOfInst;
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
    optionalAmount:0,
    installmentAmount:0
}

checkOptional = e=>{
  let optionalAmount = this.state.optionalAmount;
  const installments = [...this.state.installments];
  console.log(this.noOfInst);
  //const actuallInstallment = (installments.length && installments[installments.length-this.state.noOfInst] ) || this.instAmount;
 const actuallInstallment = (installments.length && installments[this.noOfInst] ) || this.installmentAmount ;
 if(this.state.amount !== installments[this.noOfInst]){ optionalAmount = this.state.amount - actuallInstallment + optionalAmount;}
  this.setState({disabled:false, optional:e.target.value, optionalAmount});
}

getNoOfInst = e=>{
  const noOfInst = +e.target.value;
  console.log(noOfInst);
  console.log(noOfInst);
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

getTotlaAmount= e=>{
  const totalAmount = +e.target.value;
  console.log(totalAmount);
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
pay = (e)=>{
      e.preventDefault();
      this.installmentAmount = this.state.totalAmount / this.state.noOfInst;
      let installments = this.state.installments.length ? this.state.installments:new Array(this.state.noOfInst).fill(this.installmentAmount);
     
      console.log(this.installmentAmount);

   if(!this.state.amount && this.state.installments.length > 0){

    this.setState({error : 'Please Enter Installment Amount'});

   }else if(this.state.amount === this.state.totalAmount){
      this.setState({installments : 'You Have Paid Full Fee Amount'});
   }
   else if(this.state.amount > installments[this.noOfInst] && !this.state.optional && this.state.amount > this.state.noOfInst){
      this.setState({msg:'This Amount is greater than minimum required installment',disabled:true});
    }
    else if(this.state.amount < installments[this.noOfInst] && this.state.amount !== 0 && !this.state.optional && this.state.totalAmount > this.state.noOfInst){
      this.setState({msg:'This Amount is less than minimum required installment',disabled:true});
    }
    else{
      let noOfInst = this.noOfInst;
      let  optionalAmount = this.state.optionalAmount;
      const optional = this.state.optional;
      if(this.state.noOfInst < this.state.totalAmount){
      //const installmentAmount = this.state.totalAmount / this.state.noOfInst;
      console.log(this.state.installments == true);
      
      console.log(installments);  
      if(this.state.optional === 'nextInst'){
        if(optionalAmount > this.state.totalAmount - this.state.amount){
          // installments = [ this.state.amount, this.state.totalAmount - this.state.amount];
           installments[noOfInst] = this.state.amount;
           const remainedInstallments = this.state.totalAmount - installments[noOfInst]
           console.log(remainedInstallments,installments.slice(noOfInst+1));
            let otherinstallments = installments.slice(noOfInst+1);
            console.log(remainedInstallments, this.state.noOfInst-(noOfInst+1),Number((remainedInstallments / (this.state.noOfInst-(noOfInst+1))))); 
            const instAmount = Number((remainedInstallments / (this.state.noOfInst-(noOfInst+1))).toFixed(2));
            otherinstallments.fill(instAmount);
           installments = [ installments[noOfInst],...otherinstallments]
           optionalAmount=0;
         }else if(optionalAmount > 0){
         
            installments[noOfInst] = this.state.amount;
            if(optionalAmount < this.state.totalAmount - this.state.amount){
            installments[noOfInst+1] -= optionalAmount
            console.log(installments[noOfInst+1]);
            if(installments[noOfInst+1] < 0){
              const remainedInstallments =this.state.totalAmount - installments[noOfInst]
             console.log(remainedInstallments,installments.slice(noOfInst+1));
              let otherinstallments = installments.slice(noOfInst+1);
              console.log(remainedInstallments, this.state.noOfInst-(noOfInst+1));
              otherinstallments.fill((remainedInstallments / (this.state.noOfInst-(noOfInst+1))).toFixed(2));
             installments = [ installments[noOfInst],...otherinstallments]
            }
            }
            else{
              installments = installments.slice(0,noOfInst+1);
            }
            optionalAmount=0;
        }else if(optionalAmount < 0){
          console.log('asdfsafsaf asdfasdfsd-f');
          installments[noOfInst] = this.state.amount;
          console.log(!installments[noOfInst+1], installments[noOfInst+1] + this.state.optionalAmount);
          //installments[noOfInst+1] = !installments[noOfInst+1]?Math.abs(this.state.optionalAmount):installments[noOfInst+1] + this.state.optionalAmount ;
          installments[noOfInst+1] = !installments[noOfInst+1]?Math.abs(this.state.optionalAmount):installments[noOfInst+1] + Math.abs(this.state.optionalAmount) ;
      } 
    }
      
        // if(optional){
        //   noOfInst = this.state.noOfInst - 1;
        // }
        
        this.setState(prevState=>({installments,paid:prevState.paid+this.state.amount,optional:false,optionalAmount,msg:'',amount:0})); 
        this.amountRef.current.focus();
        if(this.noOfInst < this.state.noOfInst){
        this.noOfInst +=1;
        if(this.noOfInst === this.state.noOfInst-1){
          this.setState({disabled:true});
         this.amountRef.current.disabled = true;
        }
        }
       
        
  }
  else{
    console.log('asdfo');
    this.setState({error: "No of installments are greadter than actuall fee amount"});
    }
}
}

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
});}

render() {
  console.log(this.state);
  console.log(this.noOfInst);
 
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
