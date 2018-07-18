import React from 'react';

export default (props)=>{
    const optional =((props.msg)&&<div><h2>{props.msg}</h2>
    <input type="radio" name="installmentOptions" value="nextInst" onClick={props.checkOptional} required/> Add it to the next installment.<br/>
    <input type="radio" name="installmentOptions" value="newInst"  onClick={props.checkOptional} />  create a new installment.</div>)
   
    return (
        
      <div>
        <form method='get' onSubmit={props.pay}>
            <label>Amount to be paid :</label>
            <input type="text" 
            style={{marginLeft:'15px',padding:'5px'}}
            value = {props.amount} ref={props.amountRef} onChange={props.getAmount} />
            <br/>
            {optional}
            <br/>
            <button  disabled={props.disabled }> Pay </button> <button type='reset' onClick={props.reset}> Reset </button>
            <h3>{props.error}</h3>
        </form>
      </div>
    )
  
}
