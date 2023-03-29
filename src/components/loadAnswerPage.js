import React from 'react'
import timeCheck from '../components/timeCheck'
import PropTypes from 'prop-types'
import { States } from '../components/questionArrayStates'
import IfHyperLink from './checkIfHyperLink'

LoadAnswerPage.propTypes = {
  theModel: PropTypes.object,
  questionClickedOn: PropTypes.object,
  showAnswerPage: PropTypes.bool,
  state: PropTypes.number,
  setState: PropTypes.func
}

// questionClickedOn.questionClickedOn.ansIds.length because questionClickedOn is an object containing the key questionClickedOn with the actual data
function AmountOfAnswers (questionClickedOn) {
  const numQuestions = questionClickedOn.questionClickedOn.ansIds.length
  return (
        <div className="tagHeader numAnswersCss" height='100' id="numAnswers" style={{ marginRight: 'auto' }}>
            {numQuestions} Answers
        </div>
  )
}

function QuestionTitle (questionClickedOn) {
  const questionString = questionClickedOn.questionClickedOn.title
  return (
        <div className="tagHeader numAnswersCss" height='100' id="numAnswers" style={{ marginRight: 'auto' }}>
            {questionString}
        </div>
  )
}

// adds NumViews Questions and AskDate
function AddSecondRow (questionClickedOn) {
  const object = questionClickedOn.questionClickedOn
  console.log(JSON.stringify(object.text) + ' pausechamp1')

  let timeStr = ''
  const dateArr = object.askDate.toString().split(' ')
  const dateStr = object.askDate.toString()
  const dateObj = new Date(dateStr)
  timeCheck.checkUnderTwentyFourHours(dateObj)
  if (timeCheck.checkOverOneYear(dateObj)) {
    const datePrint = dateArr[1] + ' ' + dateArr[2] + ',' + dateArr[3] + ' at ' + dateArr[4]
    timeStr = datePrint
  } else if (timeCheck.checkUnderTwentyFourHours(dateObj)) {
    const datePrint = timeCheck.underTwentyFourReturn(dateObj)
    timeStr = datePrint
  } else {
    const datePrint = dateArr[1] + ' ' + dateArr[2] + ' at ' + dateArr[4]
    timeStr = datePrint
  }
  if (IfHyperLink(object.text)) {
    const regex = /\[(.*?)\]\((.*?)\)/
    const matches = object.text.match(regex)
    const linkText = matches[1]
    const linkUrl = matches[2]
    console.log(linkText + ' LINKTEST')
    console.log(linkUrl + ' LINKURL')
    const text = object.text
    console.log(text + 'Pogggg')
    const indexLeftBrac = text.indexOf('[')
    const firstPartOfTheText = text.substring(0, indexLeftBrac)
    const indexOfRightParen = text.indexOf(')')
    const secondPartOfTheText = text.substring(indexOfRightParen + 1, text.length)
    return (
      <div className="question-info-row1">
        <div className="viewsBox"> {object.views} Views </div>
        <div className="textBox"> {firstPartOfTheText} <a href={linkUrl}> {linkText} </a> {secondPartOfTheText} </div>
        <div className="timeBox"><span className="askedBy">{object.askedBy}</span> asked {timeStr}</div>
      </div>
    )
  }

  return (
        <div className="question-info-row1">
          <div className="viewsBox"> {object.views} Views </div>
          <div className="textBox">{object.text}</div>
          <div className="timeBox"><span className="askedBy">{object.askedBy}</span> asked {timeStr}</div>
        </div>
  )
}

function AddAllAnswers ({ questionClickedOn, theModel }) { // adds all answers from an array with question
  function findIndex (ansId, { theModel }) {
    const obj = theModel.data.answers
    for (let x = 0; x < obj.length; x++) {
      if (ansId === obj[x].aid) {
        return x
      }
    }
    return 'error'
  }

  console.log(JSON.stringify(questionClickedOn.text) + ' pausechamp995')

  let arr = questionClickedOn.ansIds
  console.log(JSON.stringify(arr) + ' pausechamp1')
  arr = sortAnswerByDate(arr, { theModel })
  const temp = []

  for (let x = 0; x < arr.length; x++) {
    const aid = arr[x]
    const indexOfAnsId = findIndex(aid, { theModel })
    const object = theModel.data.answers[indexOfAnsId]
    let timeStr = ''
    const dateArr = object.ansDate.toString().split(' ')
    const dateStr = object.ansDate.toString()
    const dateObj = new Date(dateStr)
    timeCheck.checkUnderTwentyFourHours(dateObj)
    if (timeCheck.checkOverOneYear(dateObj)) {
      const datePrint = dateArr[1] + ' ' + dateArr[2] + ',' + dateArr[3] + ' at ' + dateArr[4]
      timeStr = datePrint
    } else if (timeCheck.checkUnderTwentyFourHours(dateObj)) {
      const datePrint = timeCheck.underTwentyFourReturn(dateObj)
      timeStr = datePrint
    } else {
      const datePrint = dateArr[1] + ' ' + dateArr[2] + ' at ' + dateArr[4]
      timeStr = datePrint
    }
    if (IfHyperLink(object.text)) {
      const regex = /\[(.*?)\]\((.*?)\)/
      const matches = object.text.match(regex)
      const linkText = matches[1]
      const linkUrl = matches[2]
      console.log(linkText + ' LINKTEST')
      console.log(linkUrl + ' LINKURL')
      const text = object.text
      console.log(text + 'Pogggg')
      const indexLeftBrac = text.indexOf('[')
      const firstPartOfTheText = text.substring(0, indexLeftBrac)
      const indexOfRightParen = text.indexOf(')')
      const secondPartOfTheText = text.substring(indexOfRightParen + 1, text.length)
      temp.push(
        <div className="answerToQuestion" key={aid}>
            <div className="textBoxAnswer">{firstPartOfTheText} <a href={linkUrl}> {linkText} </a> {secondPartOfTheText} </div>
            <div className="timeBoxAnswer"><span className="ansBy">{object.ansBy}</span> answered {timeStr}</div>
        </div>
      )
    } else {
      temp.push(
        <div className="answerToQuestion" key={aid}>
            <div className="textBoxAnswer">{object.text}</div>
            <div className="timeBoxAnswer"><span className="ansBy">{object.ansBy}</span> answered {timeStr}</div>
        </div>
      )
    }
  }
  return temp
}

function sortAnswerByDate (questionArr, { theModel }) { // sorts all answers by date
  const secsSincePostedArr = []
  const currDate = new Date()
  const modelAns = theModel.data.answers
  for (let i = 0; i < questionArr.length; i++) {
    const dateStr = modelAns[i].ansDate.toString()
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
  return sortedQuestionArr
}

// questionClickedOn is the question object
export default function LoadAnswerPage ({ questionClickedOn, theModel, state, setState }) {
  function handleAnswerQuestionClick () {
    setState(States.ANSWERFORM)
  }
  function handleAskQuestionClick () {
    setState(States.QUESTIONFORM)
  }
  if (state !== States.ANSWERPAGE) {
    return null
  }
  return (
        <>
        <div id = "answerPage">
        <div className="right-table defaultPos">
            <div className = "flexAnswerDisplay">
            <AmountOfAnswers questionClickedOn={questionClickedOn}/>
            <QuestionTitle questionClickedOn={questionClickedOn}/>
            <div className = "tagHeader askQuestionButtonAp" style={{ marginLeft: 'auto' }}><button className="ask-q-button" id = "homeQbutton3"
            onClick={handleAskQuestionClick} >Ask Question</button></div>
            </div>
            <AddSecondRow questionClickedOn={questionClickedOn}/>
            <AddAllAnswers questionClickedOn={questionClickedOn} theModel={theModel}/>
            <div id="answerQuestionBtn"><button className="ask-q-button" onClick={handleAnswerQuestionClick}>Answer Question</button></div>
        </div>
        </div>
        </>
  )
}
