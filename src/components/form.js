import React from 'react';

export default (props)=>{
    const optional =((props.msg)&&<div><h2>{props.msg}</h2>
    <input type="radio" name="installmentOptions" value="nextInst" onClick={props.checkOptional} required/> Add it to the next installment.<br/>
    <input type="radio" name="installmentOptions" value="newInst"  onClick={props.checkOptional} />  create a new installment.</div>)
   
    return (
        
      <div>
        <form method='get' onSubmit={props.pay}>
            <label> No Of installment : </label>
            <input 
            type = "text"
            style = {{marginLeft:'15px',padding:'5px'}}
            value = {props.noOfInst}
            onChange = {props.getNoOfInst} 
            />
            <br/>
            <label>Fee Amount :</label>
            <input
            type="text"
            value={props.totalAmount}
            onChange={props.getTotlaAmount}
            style = {{marginLeft:'52px',padding:'5px'}}
            /> 
            <br/>
            <label>installment Amount :</label>
            <input 
            type="text" 
            style={{marginLeft:'8px',padding:'5px'}}
            value = {props.amount} ref={props.amountRef} onChange={props.getAmount} />
            <br/>
            {optional}
            <br/>
            <button  disabled={props.disabled }> Pay </button> <button type='reset' onClick={props.reset}> Reset </button>
            <h3 style={{color:'red'}}>{props.error}</h3>
        </form>
      </div>
    )
  
}
