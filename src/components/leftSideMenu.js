// This function is the left side menu
import React, { useState } from 'react'
// import QuestionPage from '../components/questionPage';
// import InitialHomePage from '../components/initialHomePage';
// import TagsPage from './tagsPage'
// import Model from '../models/model.js';
// import hideAllHidden  from '../components/hideAllHidden.js';
// import addRow from '../components/addRow.js';
// import newestButton from '../components/newestButton.js';
import PropTypes from 'prop-types'
import StatusEnum from '../components/questionArrayStates'

LeftSideMenu.propTypes = {
  theModel: PropTypes.object,
  showQuestionPage: PropTypes.func,
  setShowQuestionPage: PropTypes.func,
  showTagsPage: PropTypes.func,
  setShowTagsPage: PropTypes.func,
  setButtonState: PropTypes.func,
  setShowAnswerPage: PropTypes.func
}

export default function LeftSideMenu ({
  theModel, showQuestionPage, setShowQuestionPage, showTagsPage, setShowTagsPage, setButtonState,
  setShowAnswerPage
}) {
  const [selectedSection, setSelectedSection] = useState('tableSide')
  function handleQuestionClick () {
    setShowQuestionPage(showQuestionPage = true)
    setShowTagsPage(showTagsPage = false)
    setSelectedSection('tableSide')
    setShowAnswerPage(false)
    setButtonState(StatusEnum.NEWEST)
  }
  function handleTagsClick () {
    setShowQuestionPage(showQuestionPage = false)
    setShowTagsPage(showTagsPage = true)
    setSelectedSection('tagsSide')
    setShowAnswerPage(false)
  }
  return (
        <>
        <div className = "leftSide">
        <table className ="left-table">
          <tbody>
            <tr key="row1">
            <td height='100' id="tableSide" onClick={handleQuestionClick} className={selectedSection === 'tableSide' ? 'selectedLeftSideTable' : null}>
              <h2 style = {{ paddingLeft: '1vw' }}> Question </h2></td>
            </tr>
            <tr key="row2">
            <td height='100' id="tagsSide" onClick={handleTagsClick} className={selectedSection === 'tagsSide' ? 'selectedLeftSideTable' : null}>
              <h2 style={{ paddingLeft: '1vw' }}> Tags </h2></td>
            </tr>
            <tr key="row3"></tr>
          </tbody>
        </table>
        </div>
        </>
  )
}
