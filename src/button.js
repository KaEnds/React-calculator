export default function Button({num, dispatch, keyCode}){
    return(
        <button onClick={() => {dispatch({type: "addNumber", payload:{ key: num}})}}  >{num}</button>
    )
}