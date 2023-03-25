// This function is the left side menu
import React from 'react';
// import Model from '../models/model.js';
// import hideAllHidden  from '../components/hideAllHidden.js';
// import addRow from '../components/addRow.js';
// import newestButton from '../components/newestButton.js';
// import PropTypes from 'prop-types';

// LeftSideMenu.propTypes = {
//     theModel: PropTypes.object.isRequired,
// };

export default function LeftSideMenu(){

    return (
        <>
        <div className = "leftSide">
        <table className ="left-table">
            <tr>
            <td height='100' id="tableSide"><h2> Question </h2></td>   
            </tr>
            <tr>
            <td height='100' id="tagsSide"><h2> Tags </h2></td>   
            </tr>
            <tr></tr>
        </table>
        </div>
        </>
    );
}
