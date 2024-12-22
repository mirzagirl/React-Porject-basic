import './App.css';
import { useState } from 'react';

function App() {
  const [output,setOutput] = useState(0);
  const numbers = [0,1,2,3,4,5,6,7,8,9];
  const operators = ["*","+","-","/"];
  const [expression,setExpression] = useState("");
  const handleNumberClick = (num)=>{
    if(num == 0 && /[/]$/.test(expression))return;
    setExpression(s=>s+num);
  }
  const handleOperatorClick = (oper)=>{
    if(!expression|| /[*/+\-]$/.test(expression))return;
    setExpression(s=>s+oper);
  }
  const handleSubmit = ()=>{
    console.log("p - ",typeof expression,eval(expression));
    setOutput(expression);
  }
  const handleReset = ()=>{
    setExpression("");
  }
  return (
    <div className="App">
      {numbers.map((num,index)=><button key={num} onClick={()=>handleNumberClick(num)}>{num}</button>)}
      {operators.map((ope,index)=><button key={ope} onClick={()=>handleOperatorClick(ope)}>{ope}</button>)}
       <input value={expression} />
       <button onClick={handleSubmit}>Submit</button>
       <button onClick={handleReset}>Reset</button>
       {output?<p>Output: {output}</p>:""}
    </div>
  );
}

export default App;
