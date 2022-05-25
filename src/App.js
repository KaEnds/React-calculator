import './App.css';
import { useReducer } from 'react'
import Button from './button.js';
import Operator from './operatorbutton';
import React from 'react';

function App() {
  function reducer(state, action){
    switch(action.type){
      case "addNumber":

        let checkdot
        
        if(state.label2 !== undefined){
          checkdot = state.label2.includes('.')
        }

        if(state.label2 === undefined){
          return {...state, label2: action.payload.key}
        }

        if(checkdot){
          if(action.payload.key === '.'){
            return {...state}
          }
        }
        
        return {...state, label2: state.label2 + action.payload.key}
        
      case "addOperator":
        if(state.label2 === undefined && state.label1 === undefined ){
          return {...state}
        }

        if(state.label1 && state.label2 && state.operation !== undefined){
          return {label1: process(state.label1 , state.label2, state.operation), operation: action.payload.key}
        }

        if(state.label2 === undefined && state.label1 !== undefined){   
          return {...state , operation: action.payload.key}
        }

        return {label1: state.label2 , label2: undefined, operation: action.payload.key}


      case "summarize":
        if (state.label1 && state.label2 && state.operation !== undefined){
          return {label2: process(state.label1 , state.label2, state.operation)}
        }
        return {...state}

      case "clear":
        return {}
      
      case 'delete':

        const del = state.label2.slice(0, state.label2.length - 1)
      
        return {
          ...state,
          label2 : del
        }

      default:
        return state
    }

  }

  function process(val1, val2 ,oper){ 
    const Val1 = parseFloat(val1)
    const Val2 = parseFloat(val2)
    switch(oper){
      case "÷":
        return `${Val1 / Val2}`
      case "*":
        return `${Val1 * Val2}`
      case "+":
        return `${Val1 + Val2}`
      case "-":
        return `${Val1 - Val2}`

      default:
        return ('')
    }
    
  } 




  const [{label1, label2, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className="App">
      <h1>My Calculator project</h1>
      <div className="calculator-layout">
        <div className="label">
          <div className="label1">{label1}{operation}</div>
          <div className="label2">{label2}</div>
        </div>
        <div className="button-layout">
          <button className="span2" onClick={() => dispatch({type: "clear"})}>AC</button>
          <button onClick={() => dispatch({type: "delete"})}>del</button>
          <Operator operate={'÷'} dispatch={dispatch}/>
          <Button num={'7'} dispatch={dispatch}/>
          <Button num={'8'} dispatch={dispatch}/>
          <Button num={'9'} dispatch={dispatch}/>
          <Operator operate={"*"} dispatch={dispatch}/>
          <Button num={'4'} dispatch={dispatch} />
          <Button num={'5'} dispatch={dispatch} />
          <Button num={'6'} dispatch={dispatch} />
          <Operator operate={'+'} dispatch={dispatch}/>
          <Button num={'1'} dispatch={dispatch} />
          <Button num={'2'} dispatch={dispatch} />
          <Button num={'3'} dispatch={dispatch} />
          <Operator operate={'-'} dispatch={dispatch}/>
          <Button num={"."} dispatch={dispatch} />
          <Button num={'0'} dispatch={dispatch} />
          <button className="span3" onClick={() => dispatch({type: "summarize"})} >=</button>          

        </div>
      </div>
    </div>
  );
}

export default App;
