import Model from '../models/model.js'
import React, { useState } from "react";

export default function UnAnsweredButton({theModel,settheModel}){
    let questions = theModel.data.questions;
    let unAnsQuestions = [];
    for (let i = questions.length; i > 0; i--){
      if (questions[i-1].ansIds.length === 0){
        unAnsQuestions.push(questions[i-1]);
      }
    }
    return unAnsQuestions;
    // let sortedModel = new Model();
    // sortedModel.data.questions = unAnsQuestions;
    // settheModel(theModel = sortedModel);
}