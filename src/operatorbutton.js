export default function Operator({operate, dispatch}){
    return(
        <button onClick={() => dispatch({type: "addOperator", payload:{key : operate}})}>{operate}</button> 
    )
}