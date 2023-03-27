// import Model from '../models/model.js'
import React from 'react'
import PropTypes from 'prop-types'

AnswerForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  currentQuestion: PropTypes.object
}

export default function AnswerForm ({ model, setModel, currentQuestion }) {
  return (
    <>
    <div className = "hidden" id = "newAnswerForm">
        <form className = "defaultPos" id = "answerToQuestion">
            <label className = "formTitle" htmlFor = "aUser"> Username*</label>
            <div className = "invalidInput" id = "aUserError"></div>
            <span className = "formEntry"><br/><input className = "formText" type="text" name = "aUser" placeholder="Enter Username..."/></span>
        <br/>
        <br/>
        <label className = "formTitle" htmlFor = "aText">Answer Text*</label>
        <div className = "invalidInput" id = "aTextError"></div>
        <span className = "formEntry"><br/><textarea className = "formText textInput" name = "aText" type="text" placeholder="Enter Response..."></textarea>
    </span>
    <br/>
    <span ><button type = "button" className = "formButton" id = "aButton" onClick={function () { return getAnswer(model, setModel, currentQuestion) }}> Post Answer</button></span>
    </form>
    </div>
    </>
  )
}

function getAnswer (theModel, setModel, currentQuestion) {
  const ansFormData = document.getElementById('answerToQuestion')
  const aUsername = ansFormData[0].value
  const aText = ansFormData[1].value
  if (!validateInputs(aUsername, aText)) {
    return
  }
  clearInvalidInputs()
  const numOfAnswers = theModel.getNumAnswers()
  const newAnswer =
  {
    aid: 'a' + (numOfAnswers + 1),
    text: aText,
    ansBy: aUsername,
    ansDate: new Date()
  }
  theModel.addAnswer(newAnswer)
  theModel.addAnswerToQuestID(currentQuestion.qid, newAnswer)
  console.log(theModel)
  setModel(theModel)
  ansFormData.reset()
};

function validateInputs (userName, text) {
  let valid = true
  if (!userName) {
    const userDiv = document.getElementById('aUserError')
    userDiv.innerHTML = 'Need UserName'
    valid = false
  }
  if (!text) {
    const userDiv = document.getElementById('aTextError')
    userDiv.innerHTML = 'Need Text'
    valid = false
  }
  return valid
};

function clearInvalidInputs () {
  const invalidDivs = document.getElementsByClassName('invalidInput')
  for (let i = 0; i < invalidDivs.length; i++) {
    invalidDivs[i].innerHTML = ''
  }
}
