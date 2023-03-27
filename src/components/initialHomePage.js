import React from 'react'
import AddRow from '../components/addRow.js'
import PropTypes from 'prop-types'
import NewestButton from '../components/newestButton.js'
import ActiveButton from '../components/activeButton'
import UnAnsweredButton from '../components/unAnsweredButton'
// import SortQuestionByDate from "./sortQuestionByDate.js";
// import Model from '../models/model.js'
import StatusEnum from "../components/questionArrayStates";
import LoadAnswerPage from '../components/loadAnswerPage';

InitialHomePage.propTypes = {
  theModel: PropTypes.object,
  questions: PropTypes.object,
  showQuestionPage: PropTypes.bool,
  setShowQuestionPage: PropTypes.bool,
  buttonState: PropTypes.bool,
  settheModel: PropTypes.func,
  setButtonState: PropTypes.func
}

CheckState.propTypes = {
  buttonState: PropTypes.number,
  theModel: PropTypes.object,
  settheModel: PropTypes.func
}

function CheckState ({ buttonState, theModel, settheModel, setShowQuestionPage, showAnswerPage, setShowAnswerPage
  ,questionClickedOn,setQuestionClickedOn}) { 
  let sortedArr1
  let sortedArr2
  let sortedArr3
  switch (buttonState) {
    case StatusEnum.NEWEST:
      sortedArr1 = NewestButton({ theModel, settheModel })
      // console.log(JSON.stringify(sortedArr1));
      return <LoadQuestions questions={sortedArr1} theModel={theModel} setShowQuestionPage={setShowQuestionPage}
      showAnswerPage={showAnswerPage} setShowAnswerPage={setShowAnswerPage} questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn}
      />
    case StatusEnum.ACTIVE:
      sortedArr2 = ActiveButton({ theModel, settheModel })
      return <LoadQuestions questions={sortedArr2} theModel={theModel} setShowQuestionPage={setShowQuestionPage}
      showAnswerPage={showAnswerPage} setShowAnswerPage={setShowAnswerPage} questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn}
      />

    case StatusEnum.UNANSWERED:
      sortedArr3 = UnAnsweredButton({ theModel, settheModel })
      return <LoadQuestions questions={sortedArr3} theModel={theModel} setShowQuestionPage={setShowQuestionPage}
      showAnswerPage={showAnswerPage} setShowAnswerPage={setShowAnswerPage} questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn}
      />

    default:
      break
  }
}

export default function InitialHomePage({theModel,settheModel,showQuestionPage,setShowQuestionPage,buttonState,setButtonState,
  showAnswerPage,setShowAnswerPage,questionClickedOn,setQuestionClickedOn}) {
  function handleNewestBtnClick(){
    setButtonState(StatusEnum.NEWEST);
  }
  function handleActiveBtnClick () {
    setButtonState(StatusEnum.ACTIVE)
  }
  function handleUnAnsweredBtnClick () {
    setButtonState(StatusEnum.UNANSWERED)
  }
  if (showAnswerPage){
    return <LoadAnswerPage showAnswerPage={showAnswerPage} questionClickedOn={questionClickedOn}/>;
  } 

  return (
      <div style={{ display: showQuestionPage ? 'block' : 'none' }} id="homepage">
        <table className="defaultPos" id="allQuestions">
          <thead>
            <tr className="topRow">
              <td height='100' colSpan="8"><h2 id="typeDisplayed"> All Questions</h2></td>
              <td colSpan="1" style={{ textAlign: 'right', width: 'auto' }}>
                <button className="ask-q-button" id="homeQbutton" style={{ float: 'right' }}> Ask Question </button>
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
            <CheckState buttonState={buttonState} theModel={theModel} settheModel={settheModel} setShowQuestionPage={setShowQuestionPage}
            showAnswerPage={showAnswerPage} setShowAnswerPage={setShowAnswerPage} questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn}
            />
          </table>
        </table>
      </div>
  )
}


function LoadQuestions({questions, theModel, setShowQuestionPage,showAnswerPage,setShowAnswerPage,questionClickedOn,setQuestionClickedOn}) {
  return questions.map(function(questRow, index) {
    return <AddRow key={index} question={questRow} theModel={theModel} setShowQuestionPage={setShowQuestionPage}
    showAnswerPage={showAnswerPage} setShowAnswerPage={setShowAnswerPage} questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn}
    />
  });
}

// function handleRemoveRows() {
//   const rowsToRemove = document.querySelectorAll('.insertedRow');
//   rowsToRemove.forEach(row => row.remove());
// }
