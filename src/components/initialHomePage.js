import React from 'react'
import AddRow from '../components/addRow.js'
import PropTypes from 'prop-types'
import NewestButton from '../components/newestButton.js'
import ActiveButton from '../components/activeButton'
import UnAnsweredButton from '../components/unAnsweredButton'
// import SortQuestionByDate from "./sortQuestionByDate.js";
// import Model from '../models/model.js'
import { StatusEnum, States } from '../components/questionArrayStates'
// import LoadAnswerPage from '../components/loadAnswerPage'

InitialHomePage.propTypes = {
  theModel: PropTypes.object,
  questions: PropTypes.array,
  buttonState: PropTypes.number,
  settheModel: PropTypes.func,
  setButtonState: PropTypes.func,
  questionClickedOn: PropTypes.object,
  setQuestionClickedOn: PropTypes.func,
  state: PropTypes.number,
  setState: PropTypes.func
}

CheckState.propTypes = {
  theModel: PropTypes.object,
  buttonState: PropTypes.number,
  settheModel: PropTypes.func,
  questionClickedOn: PropTypes.object,
  setQuestionClickedOn: PropTypes.func,
  questions: PropTypes.array,
  state: PropTypes.number,
  setState: PropTypes.func
}

export function CheckState ({
  buttonState, theModel, settheModel, questionClickedOn, setQuestionClickedOn, questions, state, setState
}) {
  // console.log("here")
  let sortedArr1
  let sortedArr2
  let sortedArr3
  console.log('adsadasdasdas')
  switch (buttonState) {
    case StatusEnum.NEWEST:
      sortedArr1 = NewestButton({ theModel, settheModel, questions })
      return <LoadQuestions questions={sortedArr1} theModel={theModel} questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn}
      state={state} setState={setState} settheModel={settheModel}/>
    case StatusEnum.ACTIVE:
      sortedArr2 = ActiveButton({ theModel, settheModel, questions })
      return <LoadQuestions questions={sortedArr2} theModel={theModel} questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn}
      state={state} setState={setState} settheModel={settheModel}/>

    case StatusEnum.UNANSWERED:
      sortedArr3 = UnAnsweredButton({ theModel, settheModel, questions })
      return <LoadQuestions questions={sortedArr3} theModel={theModel} questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn}
      state={state} setState={setState} settheModel={settheModel}/>

    default:
      break
  }
}

export default function InitialHomePage ({
  theModel, settheModel, buttonState, setButtonState, questionClickedOn, setQuestionClickedOn, state, setState
}) {
  // console.log(JSON.stringify(questionClickedOn) + ' pausechamp999')
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
  if (state !== States.QUESTIONPAGE) {
    return null
  }
  return (
      <div id="homepage">
        <table className="defaultPos" id="allQuestions">
          <thead>
            <tr className="topRow">
              <td height='100' colSpan="8"><h2 id="typeDisplayed"> All Questions</h2></td>
              <td colSpan="1" style={{ textAlign: 'right', width: 'auto' }}>
                <button className="ask-q-button" id="homeQbutton" style={{ float: 'right' }} onClick={handleAskQuestionClick}> Ask Question </button>
              </td>
            </tr>
            <tr className="topRow">
              <td height='100' style={{ textAlign: 'left', width: '100%' }} colSpan="8">
                <h3 id="numQuestions"> {theModel.data.questions.length} questions</h3>
                <div style={{ float: 'right', marginTop: '-40px' }}>
                  <div className="three-cell" style={{ display: 'inline-block' }} id="homePageNewestBtn" onClick={handleNewestBtnClick}>Newest</div>
                  <div className="three-cell" style={{ display: 'inline-block' }} id="activeBtn" onClick={handleActiveBtnClick}>Active</div>
                  <div className="three-cell" style={{ display: 'inline-block' }} id="unansweredBtn" onClick={handleUnAnsweredBtnClick}>Unanswered</div>
                </div>
              </td>
            </tr>

          </thead>
          <table className = "defaultQuestTable">
            <CheckState buttonState={buttonState} theModel={theModel} settheModel={settheModel} questionClickedOn={questionClickedOn}
            setQuestionClickedOn={setQuestionClickedOn} questions={theModel.data.questions} state={state} setState={setState}
            />
          </table>
        </table>
      </div>
  )
}

function LoadQuestions ({ questions, theModel, questionClickedOn, setQuestionClickedOn, state, setState, settheModel }) {
  return questions.map(function (questRow, index) {
    return <AddRow key={index} question={questRow} theModel={theModel} questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn}
    state={state} setState={setState} settheModel={settheModel}/>
  })
}

// function handleRemoveRows() {
//   const rowsToRemove = document.querySelectorAll('.insertedRow');
//   rowsToRemove.forEach(row => row.remove());
// }
