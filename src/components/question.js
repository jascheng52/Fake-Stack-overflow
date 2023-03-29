// import Model from '../models/model.js';
import PropTypes from 'prop-types'
import { States } from '../components/questionArrayStates.js'
import { useState, React } from 'react'
import IfHyperLink from './checkIfHyperLink.js'

QuestionForm.propTypes = {
  theModel: PropTypes.object,
  settheModel: PropTypes.func,
  showQuestionForm: PropTypes.bool,
  setShowQuestionPage: PropTypes.func,
  setShowQuestionForm: PropTypes.func,
  state: PropTypes.number,
  setState: PropTypes.func
}

export default function QuestionForm ({ theModel, settheModel, state, setState }) {
  const [validTitle, setValidTitle] = useState(true)
  const [validQuest, setValidQuest] = useState(true)
  const [validTags, setValidTags] = useState(true)
  const [validUser, setValidUser] = useState(true)
  const [lessFiveTags, setNumberTags] = useState(true)
  const [lessTenTags, setLengthTags] = useState(true)
  const validSetters = [setValidTitle, setValidQuest, setValidTags, setValidUser]
  const checkingTags = [setNumberTags, setLengthTags]
  function handlePostQuestionClick () {
    setValidTitle(true)
    setValidQuest(true)
    setValidTags(true)
    setValidUser(true)
    setNumberTags(true)
    setLengthTags(true)
    console.log(checkingTags)
    const goodForm = getQuestion(theModel, settheModel, validSetters, checkingTags)
    if (goodForm) {
      setValidTitle(true)
      setValidQuest(true)
      setValidTags(true)
      setValidUser(true)
      setNumberTags(true)
      setLengthTags(true)
      setState(States.QUESTIONPAGE)
    }
  }

  if (state !== States.QUESTIONFORM) {
    return null
  }
  return (
    <>
        <div className = "hidden" id = "newQuestionForm">
            <form className = "defaultPos" id = "questionForm">
            <label className = "formTitle" htmlFor = "qTitle"> Question Title*</label>
            <div className = "questionInfo">  Limit title to 100 characters or less</div>
            <div className = "invalidInput" id = "qTitleError" style={{ display: !validTitle ? 'block' : 'none' }}> Need Title</div>
            <span className = "formEntry"><input id = "questionTitle" className = "formText" type="text" name = "qTitle" maxLength="100" required placeholder="Enter Title..."/></span>
        <br/>

            <label className = "formTitle" htmlFor = "qText"> Question Text*</label>
            <div className = "questionInfo">  Add Details</div>

            <div className = "invalidInput" id = "qTextError" style={{ display: !validQuest ? 'block' : 'none' }}> Need Question </div>

            <span className = "formEntry"><br/><textarea className = "formText textInput" name = "qText" type="text" placeholder="Enter Response..."></textarea></span>
        <br/>

            <label className = "formTitle" htmlFor = "qTag">Tags*</label>
            <div className = "questionInfo">  Add key words separated by whitespace</div>
            <NeedTags validTags = {validTags}/>
            <TooManyTags lessFiveTags = {lessFiveTags}/>
            <TooLong lessTenTags = {lessTenTags}/>
            <span className = "formEntry"><input className = "formText" type="text" name = "qTag" placeholder="Enter Tags..."/></span>

        <br/>

            <label className = "formTitle" htmlFor = "qUsername"> Username*</label>
        <br/>
        <br/>
            <div className = "invalidInput" id = "qUserError" style={{ display: !validUser ? 'block' : 'none' }}>Need Username</div>
            <span className = "formEntry"><input className = "formText" type="text" name = "qUserName" placeholder="Enter Text..."/></span>
        <br/>
        <br/>
        <span ><button type = "button" className = "formButton" id = "qButton" onClick={handlePostQuestionClick}> Post Question</button></span> <div id = "qRequired"> * indicates mandatory fields</div>
        </form>
        </div>
    </>
  )
}

NeedTags.propTypes = {
  validTags: PropTypes.bool
}
TooManyTags.propTypes = {
  lessFiveTags: PropTypes.bool
}
TooLong.propTypes = {
  lessTenTags: PropTypes.bool
}
function NeedTags ({ validTags }) {
  if (!validTags) { return <div className = "invalidInput" id = "qTextError"> Need Tag </div> }
  return null
}

function TooManyTags ({ lessFiveTags }) {
  if (!lessFiveTags) { return <div className = "invalidInput" id = "qTextError"> Maximum of 5 tags </div> }
  return null
}

function TooLong ({ lessTenTags }) {
  if (!lessTenTags) { return <div className = "invalidInput" id = "qTextError"> Maximum Length of Tag is 10 </div> }
  return null
}

// adds questions and tags to model from form
function getQuestion (theModel, setModel, validSetters, checkingTags) {
  const qFormData = document.getElementById('questionForm')
  const qTitle = qFormData[0].value
  const qText = qFormData[1].value
  const qTags = qFormData[2].value
  const qUsername = qFormData[3].value

  if (!validateInputs(qTitle, qText, qTags, qUsername, validSetters)) { console.log('here'); return false }
  // clearInvalidInputs()
  let qTagsList = qTags.split(/\s+/) // split by all whitespace
  qTagsList = qTagsList.filter(function (tag) { return tag !== '' }) // handles case where empty string

  if (!validateTags(qTagsList, theModel, checkingTags)) { return false }
  // clearInvalidInputs()
  const newQuestTags = []
  for (let i = 0; i < qTagsList.length; i++) {
    for (let j = 0; j < theModel.getNumTags(); j++) {
      if (qTagsList[i].toLowerCase() === theModel.getTagAt(j).name) {
        newQuestTags.push(theModel.getTagAt(j).tid)
        break
      }
    }
  }
  removeDuplicates(newQuestTags, 'tid')
  // console.log(newQuestTags);
  const newQuestion =
  {
    qid: 'q' + (theModel.getNumQuestions() + 1),
    title: qTitle,
    text: qText,
    tagIds: newQuestTags,
    askedBy: qUsername,
    askDate: new Date(),
    ansIds: [],
    views: 0
  }
  theModel.addQuestion(newQuestion)
  // console.log(theModel.getAllQstns());
  // console.log(theModel)
  //   console.log(updatedModel);
  setModel(theModel)
  return true
  //  TODO: LINK BACK AND LOAD THE QUESTION ON PAGE
}

// Check if inputs are valid and adds error
function validateInputs (qTitle, qText, qTags, qUsername, validSetters) {
  let valid = true

  if (!IfHyperLink(qText)) {
    const textDiv = document.getElementById('qTextError')
    textDiv.innerHTML = 'HyperLink constraint is violated'
    validSetters[1](false)
    valid = false
  }

  // let valid = true
  if (!qTitle || qTitle.replaceAll(' ', '').length === 0) {
    console.log('Need Title')
    validSetters[0](false)
    valid = false
  }
  if (!qText || qText.replaceAll(' ', '').length === 0) {
    console.log('Need Question')
    validSetters[1](false)
    valid = false
  }
  if (!qTags || qTags.replaceAll(' ', '').length === 0) {
    console.log('Need Tags')
    validSetters[2](false)
    valid = false
  }
  if (!qUsername || qUsername.replaceAll(' ', '').length === 0) {
    console.log('Need Username')
    validSetters[3](false)
    valid = false
  }
  console.log(JSON.stringify(valid) + ' pausechamp1')
  return valid
}

// export function clearInvalidInputs () {
//   const invalidDivs = document.getElementsByClassName('invalidInput')
//   for (let i = 0; i < invalidDivs.length; i++) {
//     invalidDivs[i].innerHTML = ''
//   }
// }

// Checks if Flags are valid and adds them to tag list
function validateTags (tagList, theModel, checkingTags) {
//   console.log(theModel)
  // let valid = true
  console.log(tagList)
  if (!tagList) { return false }
  if (tagList.length > 5) {
    console.log('Too many tags')
    checkingTags[0](false)
    return false
  }
  for (let i = 0; i < tagList.length; i++) {
    if (tagList[i].length > 10) {
      console.log('Tag size exceeded')
      checkingTags[1](false)
      return false
    }
    const tagFound = theModel.getAllTags().find(tag => tag.name === tagList[i].toLowerCase())
    if (tagFound == null) {
      const newTag =
      {
        tid: 't' + (theModel.getNumTags() + 1),
        name: tagList[i].toLowerCase()
      }
      theModel.addTag(newTag)
    }
  }
  return true
}

function removeDuplicates (theArrayObject) {
  for (let i = 0; i < theArrayObject.length; i++) {
    const current = theArrayObject[i]
    for (let j = i + 1; j < theArrayObject.length; j++) {
      while (theArrayObject[j] === current) {
        theArrayObject.splice(j, 1)
      }
    }
  }
};
