// import Model from '../models/model.js'
// import React, { useState } from "react";

function sortAnswerByDate (questionArr) {
  const secsSincePostedArr = []
  const currDate = new Date()
  for (let i = 0; i < questionArr.length; i++) {
    const dateStr = questionArr[i].ansDate.toString()
    const dateObj = new Date(dateStr)
    const seconds = Math.abs(currDate - dateObj) / (1000)
    secsSincePostedArr.push(seconds)
  }
  let tempArr = [...secsSincePostedArr]
  tempArr = tempArr.sort(function (a, b) { return a - b })
  const sortedIndexArr = []
  for (let j = 0; j < tempArr.length; j++) {
    sortedIndexArr.push(secsSincePostedArr.indexOf(tempArr[j]))
  }
  const sortedQuestionArr = []
  for (let k = 0; k < sortedIndexArr.length; k++) {
    sortedQuestionArr.push(questionArr[sortedIndexArr[k]])
  }
  return sortedQuestionArr;
}

export default function ActiveButton({theModel}){
    let questions = theModel.data.questions;
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
  for (let k = tempArr.length; k > 0; k--) {
    sortedByActive.push(tempArr[k - 1])
  }
  return sortedByActive
  // let sortedModel = new Model();
  // sortedModel.data.questions = sortedByActive;
  // settheModel(theModel = sortedModel);
}
