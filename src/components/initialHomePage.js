import React, { useState } from "react";
import AddRow from '../components/addRow.js';
import PropTypes from 'prop-types';
import NewestButton from '../components/newestButton.js';
import ActiveButton from '../components/activeButton';
import UnAnsweredButton from '../components/unAnsweredButton';
import SortQuestionByDate from "./sortQuestionByDate.js";
import Model from '../models/model.js'

InitialHomePage.propTypes = {
    theModel: PropTypes.object,
    questions: PropTypes.object,
    showQuestionPage: PropTypes.bool,
};

// function checkState(){
  
// }

export default function InitialHomePage({theModel,settheModel,showQuestionPage}) {
  function handleNewestBtnClick(){
    NewestButton({theModel,settheModel,showQuestionPage});
  }
  function handleActiveBtnClick(){
    ActiveButton({theModel,settheModel});
  }
  function handleUnAnsweredBtnClick(){
    UnAnsweredButton({theModel,settheModel});
  } 

    return (
      <div style={{ display: showQuestionPage ? "block" : "none" }} id="homepage">
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
            <LoadQuestions questions={theModel.data.questions} theModel={theModel}/>
          </table>
        </table>
      </div>
    );    
}


function LoadQuestions({questions,theModel})
{
    return questions.map(function(questRow, index){
      return <AddRow  key = {index} question={questRow} theModel={theModel}/>
    }
    ) 
}

// function handleRemoveRows() {
//   const rowsToRemove = document.querySelectorAll('.insertedRow');
//   rowsToRemove.forEach(row => row.remove());
// }

