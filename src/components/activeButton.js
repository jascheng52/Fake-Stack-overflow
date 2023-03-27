// import Model from '../models/model.js'
// import React, { useState } from "react";


function sortAnswerByDate(questionArr){
  let secsSincePostedArr = [];
  const currDate = new Date();
  for (let i = 0; i < questionArr.length; i++){
    let dateStr = questionArr[i].ansDate.toString();
    const dateObj = new Date(dateStr);
    let seconds = Math.abs(currDate - dateObj) / (1000);
    secsSincePostedArr.push(seconds);
  }
  let tempArr = [...secsSincePostedArr];
  tempArr = tempArr.sort(function(a, b){return a-b;});
  let sortedIndexArr = [];
  for (let j = 0; j < tempArr.length; j++){
    sortedIndexArr.push(secsSincePostedArr.indexOf(tempArr[j])); 
  }
  let sortedQuestionArr = [];
  for (let k = 0; k < sortedIndexArr.length; k++){
    sortedQuestionArr.push(questionArr[sortedIndexArr[k]]);
  }
  console.log(JSON.stringify(sortedQuestionArr) + "CCCCCCBABABABA");
  return sortedQuestionArr;
}

export default function ActiveButton({theModel}){
    let questions = theModel.data.questions;
    console.log(JSON.stringify(questions) + "BABABABA");
    let sortedByActive = [];
    let tempArr = [...questions];
    let answers = theModel.data.answers;
    let sortedAnswers = sortAnswerByDate(answers);
    for (let i = 0; i < sortedAnswers.length; i++){
      let aid = sortedAnswers[i].aid;
      for (let j = 0; j < tempArr.length; j++){
        if (tempArr[j].ansIds.includes(aid)){
          sortedByActive.push(tempArr[j]);
          tempArr.splice(j,1);
          break;
        } 
      }
    }
    for (let k = tempArr.length; 0 < k; k--){
      sortedByActive.push(tempArr[k - 1]);
    }
    return sortedByActive;
    // let sortedModel = new Model();
    // sortedModel.data.questions = sortedByActive;
    // settheModel(theModel = sortedModel);
}