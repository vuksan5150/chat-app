import { useState } from "react";

function Input({sendMessage}) {
    const [input, setInput] = useState("");

    function handleClick(e) {
        if(input === ""){
            e.preventDefault();
            alert("type in a message");
        }
        else{
            e.preventDefault();
            setInput("");
            sendMessage(input);
        }
    }; 

    return(
        <form>
            <input type="text" placeholder="your message..." autoFocus value={input} onChange={e => setInput(e.target.value)}/>
            <button onClick={handleClick}>Send</button>
        </form>
    );
};

export default Input;