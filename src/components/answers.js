// import Model from '../models/model.js'
import { React, useState } from 'react'
import PropTypes from 'prop-types'
import { States } from '../components/questionArrayStates.js'
import IfHyperLink from './checkIfHyperLink.js'

AnswerForm.propTypes = {
  theModel: PropTypes.object,
  setModel: PropTypes.func,
  currentQuestion: PropTypes.object,
  state: PropTypes.number,
  setState: PropTypes.func
}

export default function AnswerForm ({ theModel, setModel, currentQuestion, state, setState }) {
  const [validUser, setValidUser] = useState(true)
  const [validAnswer, setValidAnswer] = useState(true)
  const validInputs = [setValidUser, setValidAnswer]
  function handlePostAnswerClick () {
    setValidUser(true)
    setValidAnswer(true)
    const goodAnswer = getAnswer(theModel, setModel, currentQuestion, validInputs)
    console.log(goodAnswer)
    if (goodAnswer) {
      setValidUser(true)
      setValidAnswer(true)
      setState(States.ANSWERPAGE)
    }
  }
  if (state !== States.ANSWERFORM) {
    return null
  }
  return (
    <>
    <div className = "hidden" id = "newAnswerForm">
        <form className = "defaultPos" id = "answerToQuestion">
            <label className = "formTitle" htmlFor = "aUser"> Username*</label>
            <NeedName validName = {validUser}/>
            <span className = "formEntry"><br/><input className = "formText" type="text" name = "aUser" placeholder="Enter Username..."/></span>
        <br/>
        <br/>
        <label className = "formTitle" htmlFor = "aText">Answer Text*</label>
            <NeedAnswer validAnswer = {validAnswer}/>
        <span className = "formEntry"><br/><textarea className = "formText textInput" name = "aText" type="text" placeholder="Enter Response..."></textarea>
    </span>
    <br/>
    <span ><button type = "button" className = "formButton" id = "aButton" onClick={handlePostAnswerClick}> Post Answer</button></span>
    </form>
    </div>
    </>
  )
}

function getAnswer (theModel, setModel, currentQuestion, validInputs) {
  const ansFormData = document.getElementById('answerToQuestion')
  const aUsername = ansFormData[0].value
  const aText = ansFormData[1].value
  if (!validateInputs(aUsername, aText, validInputs)) {
    return false
  }
  // clearInvalidInputs()
  const numOfAnswers = theModel.getNumAnswers()
  const newAnswer =
  {
    aid: 'a' + (numOfAnswers + 1),
    text: aText,
    ansBy: aUsername,
    ansDate: new Date()
  }
  theModel.addAnswer(newAnswer)
  theModel.addAnswerToQuestID(currentQuestion.qid, newAnswer.aid)
  // console.log(theModel)
  // setModel(theModel)
  // ansFormData.reset()
  return true
  //  TODO: LINK BACK AND LOAD THE ANSWER ON PAGE
}

function validateInputs (userName, text, validInputs) {
  let valid = true

  if (!userName) {
    validInputs[0](false)
    valid = false
  }
  if (!text) {
    validInputs[1](false)
    valid = false
  }
  return valid
};

NeedName.propTypes = {
  validName: PropTypes.bool
}
NeedAnswer.propTypes = {
  validAnswer: PropTypes.bool
}

function NeedName ({ validName }) {
  console.log(validName)
  if (!validName) { return <div className = "invalidInput" id = "aUserError">Need Name</div> }
  return null
}

function NeedAnswer ({ validAnswer }) {
  console.log(validAnswer)
  if (!validAnswer) { return <div className = "invalidInput" id = "aTextError">Need Answer</div> }
  return null
}

// function clearInvalidInputs () {
//   const invalidDivs = document.getElementsByClassName('invalidInput')
//   for (let i = 0; i < invalidDivs.length; i++) {
//     invalidDivs[i].innerHTML = ''
//   }
// }
