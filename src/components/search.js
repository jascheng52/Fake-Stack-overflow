import React from 'react'
import PropTypes from 'prop-types'
import { CheckState } from './initialHomePage.js'
import { States, StatusEnum } from './questionArrayStates'

export function enterKey (e, setSearch, setState, setButtonState, searchState) {
  if (e.key === 'Enter') {
    setState(States.SEARCHPAGE)
    setButtonState(StatusEnum.NEWEST)
    setSearch(!searchState)
  }
}

SearchPage.propTypes = {
  theModel: PropTypes.object,
  buttonState: PropTypes.number,
  settheModel: PropTypes.func,
  setButtonState: PropTypes.func,
  questionClickedOn: PropTypes.func,
  setQuestionClickedOn: PropTypes.func,
  state: PropTypes.number,
  setState: PropTypes.func
}

export default function SearchPage ({
  theModel, settheModel, buttonState, setButtonState,
  questionClickedOn, setQuestionClickedOn, state, setState
}) {
  console.log('should be searching' + state)
  if (state !== States.SEARCHPAGE) {
    return null
  }
  function handleNewestBtnClick () {
    setButtonState(StatusEnum.NEWEST)
  }
  function handleActiveBtnClick () {
    setButtonState(StatusEnum.ACTIVE)
  }
  function handleUnAnsweredBtnClick () {
    setButtonState(StatusEnum.UNANSWERED)
  }
  function handleAskQuestionClick () {
    setState(States.QUESTIONFORM)
  }
  NumQuestion.propTypes = {
    questions: PropTypes.array
  }

  function NumQuestion ({ questions }) {
    if (questions.length === 1) {
      return <h3 id="numQuestions">1 question</h3>
    } else {
      return <h3 id="numQuestions">0 questions</h3>
    }
  }
  const searchedQuestion = loadSearch(theModel)
  console.log(searchedQuestion)
  return (
          <div id="homepage">
              <table className="defaultPos" id="allQuestions">
                  <thead>
                      <tr className="topRow">
                      <td height='100' colSpan="8"><h2 id="typeDisplayed"> Search Results</h2></td>
                      <td colSpan="1" style={{ textAlign: 'right', width: 'auto' }}>
                          <button className="ask-q-button" id="homeQbutton" style={{ float: 'right' }} onClick={handleAskQuestionClick}> Ask Question </button>
                      </td>
                      </tr>
                      <tr className="topRow">
                          <td height='100' style={{ textAlign: 'left', width: '100%' }} colSpan="8">
                              <NumQuestion questions ={searchedQuestion}/>
                              <div style={{ float: 'right', marginTop: '-40px' }}>
                              <div className="three-cell" style={{ display: 'inline-block' }} id="homePageNewestBtn" onClick={handleNewestBtnClick}>Newest</div>
                              <div className="three-cell" style={{ display: 'inline-block' }} id="activeBtn" onClick={handleActiveBtnClick}>Active</div>
                              <div className="three-cell" style={{ display: 'inline-block' }} id="unansweredBtn" onClick={handleUnAnsweredBtnClick}>Unanswered</div>
                              </div>
                          </td>
                      </tr>
        </thead>
        <table className = "defaultQuestTable">
          <CheckState buttonState={buttonState} theModel={theModel} settheModel={settheModel}
            questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn}
            questions={searchedQuestion} state = {state} setState={setState}/>
        </table>
      </table>
    </div>
  )
}

function loadSearch (theModel) {
  const search = document.getElementById('searchText')
  // console.log(theModel)
  // console.log(search)
  if (!search) { return [] }
  let searchText = search.value
  console.log(searchText)
  const tagsInSearch = getTagsSearch(searchText, theModel)
  searchText = removeTagsSearch(searchText)
  // console.log(tagsInSearch)
  // console.log(searchText)
  let keywordsList = searchText.split(/\s+/)
  keywordsList = keywordsList.filter(str => str)
  console.log(keywordsList)
  const questions = theModel.getAllQstns()
  const filteredQuestionsTag = questions.filter(filterByTagList(tagsInSearch))
  const filteredQuestionsKey = questions.filter(filterKeywords(keywordsList))
  console.log(filteredQuestionsKey)

  const filteredQuestions = filteredQuestionsTag.concat(filteredQuestionsKey)
  for (let i = 0; i < filteredQuestions.length; i++) {
    for (let j = i + 1; j < filteredQuestions.length; j++) {
      if (theModel.isEqualQuestions(filteredQuestions[i], filteredQuestions[j])) { filteredQuestions.splice(j, 1) }
    }
  }

  console.log(filteredQuestions)
  return filteredQuestions
  //  TODO: LINK BACK AND LOAD THE ANSWER ON PAGE
}

function getTagsSearch (searchText, theModel) {
  let text = searchText
  const tagList = []
  while (text.indexOf('[') > -1) {
    const start = text.indexOf('[')
    const end = text.indexOf(']')
    if (end === -1) { break }
    const tagName = text.substring(start + 1, end)
    const tagId = theModel.getTagIDFromName(tagName)
    if (tagId) { tagList.push(tagId) }
    text = text.substring(end + 1)
  }
  return tagList
}

function removeTagsSearch (searchText) {
  let text = searchText
  while (text.indexOf('[') > -1) {
    const start = text.indexOf('[')
    const end = text.indexOf(']')
    if (end === -1) { break } else {
      const leftHalf = text.substring(0, start)
      const rightHalf = text.substring(end + 1)
      text = leftHalf + ' ' + rightHalf
    }
  }
  return text
}

function filterByTagList (tagsInSearch) {
  return function (question) {
    const questionTags = question.tagIds
    for (let i = 0; i < tagsInSearch.length; i++) {
      if (questionTags.includes(tagsInSearch[i])) { return true }
    }
    return false
  }
}

function filterKeywords (keywordsList) {
  return function (question) {
    const questionText = question.text
    const questionsTitle = question.title
    for (let i = 0; i < keywordsList.length; i++) {
      let currWord = keywordsList[i]
      currWord = currWord.toLowerCase()
      const characters = 'zxcvbnmasdfghjklqwertyuiop1234567890'
      const questionLower = questionText.toLowerCase()
      if (questionLower.indexOf(currWord) > -1) {
        let index = questionLower.indexOf(currWord)
        index += currWord.length
        if (index >= questionLower.length) { return true }
        const character = questionLower.charAt(index)
        if (characters.indexOf(character) === -1) { return true }
      }
      const titleLower = questionsTitle.toLowerCase()
      if (titleLower.indexOf(currWord) > -1) {
        let index = titleLower.indexOf(currWord)
        index += currWord.length
        if (index >= titleLower.length) { return true }
        const character = titleLower.charAt(index)
        if (characters.indexOf(character) === -1) { return true }
      }
    }
    return false
  }
}
