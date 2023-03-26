// This function is the left side menu
import TagsPage from './tagsPage'
import React from 'react'
// import Model from '../models/model.js';
// import hideAllHidden  from '../components/hideAllHidden.js';
// import addRow from '../components/addRow.js';
// import newestButton from '../components/newestButton.js';
// import PropTypes from 'prop-types';

// LeftSideMenu.propTypes = {
//     theModel: PropTypes.object.isRequired,
// };

export default function LeftSideMenu (model) {
  return (
        <>
        <div className = "leftSide">
        <table className ="left-table">
          <tbody>
            <tr key="row1">
            <td height='100' id="tableSide"><h2 style = {{ paddingLeft: '1vw' }}> Question </h2></td>
            </tr>
            <tr key="row2">
            <td height='100' id="tagsSide" onClick = {function () { TagsPage(model) }}><h2 style={{ paddingLeft: '1vw' }}> Tags </h2></td>
            </tr>
            <tr key="row3"></tr>
          </tbody>
        </table>
        </div>
        </>
  )
}
