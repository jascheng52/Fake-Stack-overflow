import React from 'react'
import PropTypes from 'prop-types'

TagsPage.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func
}
export default function TagsPage ({ model, setModel, showTagsPage }) {
  return (
    <>
        <div style={{ display: showTagsPage ? "block" : "none" }} className = 'hidden' id = "tagsPage">

            <div className="right-table defaultPos">
                <div>
                    <div className = "tagHeader" height='100' ><h2 id = "numTagsHeader">  Tags </h2></div>
                    <div className = "tagHeader" style ={{ paddingLeft: '40%' }}><h2> All Tags </h2></div>
                    <div className = "tagHeader" style = {{ float: 'right', paddingTop: '10px' }}><button className="ask-q-button" id = "homeQbutton4" >Ask Question</button></div>
                </div>

            </div>
            <div className = "defaultStartTable" id = "defaultStartTable">
              <BuildTagTable theModel={model}/>
            </div>

        </div>
    </>
  )
}

TagCell.propTypes = {
  theModel: PropTypes.object,
  tagCell: PropTypes.object
}
function TagCell ({ tagCell, theModel }) {
  console.log(tagCell)
  if (!tagCell) {
    return (
            <>
                <div className = "flexItemTagEmpty">
                    <div className = "tagWrapper">
                        <div className = " flexTagName itemElements"></div>
                        <div className = "numTag itemElements"></div>
                    </div>
                </div>

            </>
    )
  }
  const tagName = tagCell.name
  const tagCount = theModel.getCountTag(tagCell.tid)
  console.log(tagName)
  if (tagCount !== 0) {
    if (tagCount === 1) {
      return (
                <>
                    <div className = "flexItemTag">
                        <div className = "tagWrapper">
                            <div className = " flexTagName itemElements">{tagName}</div>
                            <div className = "numTag itemElements">{tagCount} question</div>
                        </div>
                    </div>

                </>
      )
    } else {
      return (
                <>
                    <div className = "flexItemTag">
                        <div className = "tagWrapper">
                            <div className = " flexTagName itemElements">{tagName}</div>
                            <div className = "numTag itemElements">{tagCount}questions</div>
                        </div>
                    </div>

                </>
      )
    }
  }
}

TagRow.propTypes = {
  theModel: PropTypes.object,
  tagRow: PropTypes.array
}

function TagRow ({ tagRow, theModel }) {
  if (!tagRow) { return null }
  return tagRow.map(function (tagCell, index) {
    if (!tagCell) { return <TagCell key={index} tagCell={null} theModel={theModel} /> } else { return <TagCell key={index} tagCell={tagCell} theModel={theModel} /> }
  })
}

function BuildTagTable ({ theModel }) {
  // let table = document.getElementById("defaultStartTable");
  // table.innerHTML = "";
  // console.log(table);
  const numTags = theModel.getNumTags()
  const listRows = []
  let i = 0
  while (i < numTags) {
    // eslint-disable-next-line prefer-const
    let rowList = []
    let j = i
    let numAdded = 0
    while (numAdded < 3) {
      rowList.push(theModel.getTagAt(j))
      numAdded++
      j++
    }
    listRows.push(rowList)
    i = i + 3
  }
  // console.log(listRows)
  return listRows.map(function (tagRow, index) {
    // console.log(tagRow)
    // eslint-disable-next-line brace-style
    if (!tagRow) { return <div key = {index}className='flexContainerRow'><TagRow tagRow = {null} theModel = {theModel}/></div> }
    // eslint-disable-next-line block-spacing
    else { return <div key = {index}className='flexContainerRow'><TagRow tagRow = {tagRow} theModel = {theModel} /></div>}
  })
}

// function redirectTag(tagName)
// {
//     console.log(tagName);
//     let tagID = theModel.getTagIDFromName(tagName);
//     let filteredQuest = theModel.filterQuestByTagID(tagID);

//     hideAllHidden();
//     addRow(filteredQuest);
//     if(filteredQuest.length === 1)
//         document.getElementById("numQuestions").innerHTML = 1 + " Question";
//     else
//         document.getElementById("numQuestions").innerHTML = filteredQuest.length + " Questions";
//     document.getElementById("homepage").style.display = "block";
//     document.getElementById("typeDisplayed").innerHTML = "All " + tagName + " Questions";
//     let qst = document.getElementById("tableSide");
//     qst.style.backgroundColor = "gray";
//     let tag = document.getElementById("tagsSide");
//     tag.style.backgroundColor = "transparent";
//     newestButton(filteredQuest);
// }
