import React from "react";


// questionClickedOn.questionClickedOn.ansIds.length because questionClickedOn is an object containing the key questionClickedOn with the actual data
function AmountOfAnswers(questionClickedOn){
    let numQuestions = questionClickedOn.questionClickedOn.ansIds.length;
    return (
        <div className="tagHeader numAnswersCss" height='100' id="numAnswers" style={{ marginRight: "auto" }}>
            <h3> {numQuestions} Answers </h3>
        </div>
    );
}

function QuestionTitle(questionClickedOn){
    let questionString = questionClickedOn.questionClickedOn.title;
    return (
        <div className="tagHeader numAnswersCss" height='100' id="numAnswers" style={{ marginRight: "auto" }}>
            <h3> {questionString} </h3>
        </div>
    );
}

// questionClickedOn is the question object
export default function LoadAnswerPage({showAnswerPage,questionClickedOn}){

    return (
        <>
        <div style={{ display: showAnswerPage ? "block" : "none" }}  id = "answerPage">
        <div className="right-table defaultPos">
            <div className = "flexAnswerDisplay">
            <AmountOfAnswers questionClickedOn={questionClickedOn}/>
            <QuestionTitle questionClickedOn={questionClickedOn}/>
            {/* <div className = "tagHeader numAnswersCss" height='100' colSpan="8" id="numAnswers" style={{ marginRight: "auto" }}><h2> Answers </h2></div>
            <div className = "tagHeader questionApCss" id="questionAp"><h2> Question </h2></div>  */}
            <div className = "tagHeader askQuestionButtonAp" style={{ marginLeft: "auto" }}><button className="ask-q-button" id = "homeQbutton3" >Ask Question</button></div>
            </div>
            <div id="answerQuestionBtn"><button className="ask-q-button">Answer Question</button></div>
        </div>
        </div>
        </>
    );
}