import React, {useState} from 'react';
import {BsChevronDown} from "react-icons/bs";

const Answer = ({item}) => {

    const [answer,setAnswer] = useState(false)

    return (
        <div className="delivery__quest">
            <h2 onClick={() => setAnswer((prev) => !prev)} className="delivery__quest-title">
                {item.title}
                <BsChevronDown/>
            </h2>
            <p className="delivery__quest-answer" style={{display: answer? "block" : "none"}}>
                {item.answer}
            </p>
        </div>
    );
};

export default Answer;