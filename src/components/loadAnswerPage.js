import React from "react";

export default function LoadAnswerPage({showAnswerPage}){
    return (
        <>
        <div style={{ display: showAnswerPage ? "block" : "none" }}  id = "answerPage">
        <div className="right-table defaultPos">
            <div className = "flexAnswerDisplay">
            <div className = "tagHeader numAnswersCss" height='100' colSpan="8" id="numAnswers" style={{ marginRight: "auto" }}><h2> Answers </h2></div>
            <div className = "tagHeader questionApCss" id="questionAp"><h2> Question </h2></div> 
            <div className = "tagHeader askQuestionButtonAp" style={{ marginLeft: "auto" }}><button className="ask-q-button" id = "homeQbutton3" >Ask Question</button></div>
            </div>
            <div id="answerQuestionBtn"><button className="ask-q-button">Answer Question</button></div>
        </div>
        </div>
        </>
    );
}