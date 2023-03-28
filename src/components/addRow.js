// THIS FUNCTION ADDS A ROW
import React from 'react'
// import deleteRows from '../components/deleteRows.js';
// import Model from '../models/model.js';
import timeCheck from '../components/timeCheck'
import PropTypes from 'prop-types'
// eslint-disable-next-line no-unused-vars
import LoadAnswerPage from '../components/loadAnswerPage'

AddRow.propTypes = {
  theModel: PropTypes.object,
  question: PropTypes.object,
  setshowQuestionPage: PropTypes.func,
  showAnswerPage: PropTypes.func,
  setShowAnswerPage: PropTypes.func
}

AddRow.propTypes = {

}

function getTagName (tid, theModel) {
  const tagsArr = theModel.data.tags
  for (let i = 0; i < tagsArr.length; i++) {
    const id = tagsArr[i].tid
    if (id === tid) {
      return tagsArr[i].name
    }
  }
}

function AddRow ({ question, theModel, setshowQuestionPage, showAnswerPage, setShowAnswerPage }) {
  function handleOpenAnswerPage () {
    setshowQuestionPage(false)
    setShowAnswerPage(true)
  }

  if (!question) {
    return null
  }
  const qid = question.qid
  const num = qid.replace(/\D/g, '')
  const names = question.tagIds.map(tagId => getTagName(tagId, theModel))
  const dateArr = question.askDate.toString().split(' ')
  const dateStr = question.askDate.toString()
  const dateObj = new Date(dateStr)

  let datePrint
  if (timeCheck.checkOverOneYear(dateObj)) {
    datePrint = dateArr[1] + ' ' + dateArr[2] + ',' + dateArr[3] + ' at ' + dateArr[4]
  } else if (timeCheck.checkUnderTwentyFourHours(dateObj)) {
    datePrint = timeCheck.underTwentyFourReturn(dateObj)
  } else {
    datePrint = dateArr[1] + ' ' + dateArr[2] + ' at ' + dateArr[4]
  }
  return (
      <tr key={num - 1} className="insertedRow" id={num - 1}>
        <td className="newCellOne">{question.ansIds.length} answers {question.views} views</td>
        <td className="newCellTwo">
          <div style={{ overflowWrap: 'break-word' }} onClick={handleOpenAnswerPage}>{question.title}</div>
          <div>
            {names.map((tag) => (
              <span key={tag} className="tagsCss">{tag}</span>
            ))}
          </div>
        </td>
        <td className="newCellFour" style={{ overflowWrap: 'break-word' }}>
          {question.askedBy} asked
        </td>
        <td className="newCellFive">{datePrint}</td>
      </tr>
  )
}

export default AddRow
