// This function is the left side menu
import React, { useState } from "react";
import QuestionPage from '../components/questionPage';
// import hideAllHidden  from '../components/hideAllHidden.js';
// import addRow from '../components/addRow.js';
// import newestButton from '../components/newestButton.js';
import PropTypes from 'prop-types';

LeftSideMenu.propTypes = {
    theModel: PropTypes.object,
};

export default function LeftSideMenu({ theModel }) {
    const [showQuestionPage, setShowQuestionPage] = useState(false);
  
    const handleQuestionClick = () => {
      setShowQuestionPage(true);
    };
  
    if (showQuestionPage) {
      return <QuestionPage theModel={theModel} />;
    }
  
    return (
      <>
        <div className="leftSide">
          <table className="left-table">
            <tr>
              <td height="100" id="tableSide" onClick={handleQuestionClick}>
                <h2>Question</h2>
              </td>
            </tr>
            <tr>
              <td height="100" id="tagsSide">
                <h2> Tags </h2>
              </td>
            </tr>
            <tr></tr>
          </table>
        </div>
      </>
    );
  }
