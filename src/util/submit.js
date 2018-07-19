
//Submit function which gets executed when form gets submitted
export default function(e){
    
    //Prevent default action taken by 'onsubmit' event
    e.preventDefault();

    //All neccessary variables and constants
    let  noOfInst = this.noOfInst;
    let  totalAmount = this.state.totalAmount
    const stateNoInst = this.state.noOfInst
    const amount = this.state.amount;
    const optional = this.state.optional;
    this.installmentAmount = totalAmount /  stateNoInst;
    let installments = this.state.installments.length ? this.state.installments:new Array(stateNoInst).fill(this.installmentAmount);
    let disabled = false;

   //To force user to type only number (data) not any alphabates
   //and don't press any other key except numeric key 
  if(!amount && this.state.installments.length > 0){
  this.setState({error : 'Please Enter Installment Amount'});
 }else if(amount === totalAmount){
    this.setState({installments : 'You Have Paid Full Fee Amount',disabled:true});
    this.amountRef.current.disabled = true;
 }
 
 //Ask user to choose the options between 'Add to next' or 'Create new installment'
 //if he enters amount less than acutall required amount 
 else if(amount < installments[this.noOfInst] && amount !== 0 && !optional && totalAmount > stateNoInst){
    this.setState({msg:'This Amount is less than minimum required installment',disabled:true});
  }
  //If user enters the installment amount as required amount
  //or greeter than required amount then proceed 
  else{
    let  optionalAmount = this.state.optionalAmount;
    const optional = this.state.optional;

    //Check if student enters the 'No of Installment' value 
    //greater than actual 'Fee Amount'
    if(stateNoInst < totalAmount){
        
        //If the student is paying more than the installment amount, 
        //then deducte the the excess amount from the next installment(s).
    if(optional === 'nextInst' || amount > installments[this.noOfInst] ){
        if(this.state.amount > installments[this.noOfInst]){
          optionalAmount = this.getOptionalAmount();
        }
      if(optionalAmount > totalAmount - amount){
         installments[noOfInst] = amount;
         if((this.state.paid + amount) === totalAmount){
          installments = installments.slice(0,noOfInst+1);
         }
         else{const remainedInstallments = totalAmount - installments[noOfInst]
          let otherinstallments = installments.slice(noOfInst+1);
          const instAmount = Number((remainedInstallments / (this.state.noOfInst-(noOfInst+1))).toFixed(2));
          otherinstallments.fill(instAmount);
         installments = [ installments[noOfInst],...otherinstallments]}
         optionalAmount=0;
       }else if(optionalAmount > 0){
          installments[noOfInst] = this.state.amount;
          if((optionalAmount < this.state.totalAmount - this.state.amount) && ((this.state.paid+this.state.amount) !== this.state.totalAmount)){
          installments[noOfInst+1] -= optionalAmount
          if(installments[noOfInst+1] < 0 ){
            if((this.state.paid+ amount) !== totalAmount){
            const remainedInstallments = totalAmount - installments[noOfInst]
            let otherinstallments = installments.slice(noOfInst+1);
            otherinstallments.fill(Number((remainedInstallments / (this.state.noOfInst-(noOfInst+1))).toFixed(2)));
            installments = [ installments[noOfInst],...otherinstallments]
          }else{
            installments[noOfInst + 1] = this.state.amount;
            installments = installments.slice(0,noOfInst+1);
          }
          }
        }
          else{
            installments = installments.slice(0,noOfInst+1);
          }
          optionalAmount=0;
      }else if(optionalAmount < 0){
        installments[noOfInst] = this.state.amount;
        installments[noOfInst+1] = !installments[noOfInst+1]?Math.abs(optionalAmount):installments[noOfInst+1] + Math.abs(optionalAmount) ;
        optionalAmount = 0;
      } 
  }
  //If the student is paying less than the installment amount, 
  //and asking for creating new installment.
  else if( optional === 'newInst'){
            installments[this.noOfInst] = amount;
            installments[installments.length] = -optionalAmount;
        }
      if(this.state.paid+this.state.amount === this.state.totalAmount){
          disabled= true;
          this.amountRef.current.disabled = true;
      }
      installments = installments.map(a=>Math.round(a));
      this.setState(prevState=>({installments,paid:prevState.paid+this.state.amount,optional:false,optionalAmount,msg:'',amount:0,disabled})); 
      this.amountRef.current.focus();
      if(this.noOfInst < stateNoInst && amount){
      this.noOfInst +=1;
      if(this.noOfInst === stateNoInst-1){
        this.setState({disabled:true});
       this.amountRef.current.disabled = true;
      }
      }
}
else{
  this.setState({error: "No of installments are greadter than actuall fee amount",disabled:true});
  }
}
}