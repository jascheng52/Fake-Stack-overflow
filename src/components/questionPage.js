import React from 'react';
// import Model from '../models/model.js';
//import hideAllHidden  from '../components/hideAllHidden.js';
import AddRow from '../components/addRow.js';
// import newestButton from '../components/newestButton.js';

export default function QuestionPage({theModel}){
    console.log("HiYa") 
    let questions = theModel.data.questions;
    console.log(questions); 
    //hideAllHidden();
    <AddRow questions={questions} />;
    //addRow(questions);
    // if (theModel.getNumQuestions() === 1)
    //     document.getElementById("numQuestions").innerHTML = 1 + " Question";
    // else
    //     document.getElementById("numQuestions").innerHTML = theModel.getNumQuestions() + " Questions";
    // document.getElementById("homepage").style.display = "block";
    // document.getElementById("typeDisplayed").innerHTML = "All Questions";
    // let qst = document.getElementById("tableSide");
    // qst.style.backgroundColor = "gray";
    // let tag = document.getElementById("tagsSide");
    // tag.style.backgroundColor = "transparent";
    // newestButton(theModel.data.questions);
}