import React, { useState} from 'react';
import AddRow from '../components/addRow.js';
import PropTypes from 'prop-types';

InitialHomePage.propTypes = {
    theModel: PropTypes.object,
    questions: PropTypes.object,
};

export default function InitialHomePage({theModel,showQuestionPage}) {
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
                  <div className="three-cell" style={{ display: 'inline-block' }} id="homePageNewestBtn">Newest</div>
                  <div className="three-cell" style={{ display: 'inline-block' }} id="activeBtn">Active</div>
                  <div className="three-cell" style={{ display: 'inline-block' }} id="unansweredBtn">Unanswered</div>
                </div>
              </td>
            </tr>
            
          </thead> 
          <table className = "defaultQuestTable">
            <LoadQuestions theModel={theModel}/>
          </table>
        </table>
      </div>
    );    
}

function LoadQuestions({theModel})
{
    return theModel.data.questions.map(function(questRow, index){
        return <AddRow  key = {index} question={questRow} theModel={theModel}/>
    }
    ) 
}
