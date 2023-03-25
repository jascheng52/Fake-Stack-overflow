import Model from '../models/model.js';

export default function questionForm({model, setModel})
{
    return(
    <>
        <div className = "hidden" id = "newQuestionForm">
            <form className = "defaultPos" id = "questionForm">
            <label className = "formTitle" for = "qTitle"> Question Title*</label>
            <div clclassNameass = "questionInfo">  Limit title to 100 characters or less</div>
            <div className = "invalidInput" id = "qTitleError"></div>
            <span className = "formEntry"><input id = "questionTitle" className = "formText" type="text" name = "qTitle" maxlength="100" required placeholder="Enter Title..."/></span>
        <br/>

            <label className = "formTitle" for = "qText"> Question Text*</label>
            <div className = "questionInfo">  Add Details</div>
            <div className = "invalidInput" id = "qTextError"></div>
            <span className = "formEntry"><br/><textarea className = "formText textInput" name = "qText" type="text"  placeholder="Enter Response..."></textarea></span>
        <br/>

            <label className = "formTitle" for = "qTag">Tags*</label>
            <div className = "questionInfo">  Add key words separated by whitespace</div>
            <div className = "invalidInput" id = "qTagsError"></div>
            <span className = "formEntry"><input className = "formText" type="text" name = "qTag"  placeholder="Enter Tags..."/></span>

        <br/>

            <label className = "formTitle" for = "qUsername"> Username*</label>
        <br/>
        <br/>
            <div className = "invalidInput" id = "qUserError"></div>
            <span className = "formEntry"><input className = "formText" type="text" name = "qUserName" placeholder="Enter Text..."/></span>
        <br/>
        <br/>
        <span ><button type = "button" className = "formButton" id = "qButton" onClick={function(){return getQuestion(model,setModel)}}> Post Question</button></span> <div id = "qRequired"> * indicates mandatory fields</div>
        </form>
        </div>
    </>
    )

}


//adds questions and tags to model from form
function getQuestion(theModel, setModel)
{
  let qFormData = document.getElementById("questionForm");
  let qTitle = qFormData[0].value;
  let qText = qFormData[1].value;
  let qTags = qFormData[2].value;
  let qUsername = qFormData[3].value;
  
  if(!validateInputs(qTitle,qText,qTags,qUsername))
    return 
  clearInvalidInputs();
  let qTagsList = qTags.split(/\s+/);     //split by all whitespace
  qTagsList = qTagsList.filter(function(tag){return tag !== ""}) //handles case where empty string

  if(!validateTags(qTagsList,theModel))
    return
  clearInvalidInputs();
  let newQuestTags = [];
  for(let i = 0; i < qTagsList.length; i++)
  {
    for(let j = 0; j < theModel.getNumTags(); j++)
    {
      if(qTagsList[i].toLowerCase() === theModel.getTagAt(j).name)
      {
        newQuestTags.push(theModel.getTagAt(j).tid);
        break;
      }
    }
  }
  removeDuplicates(newQuestTags,"tid")
  // console.log(newQuestTags);
  let newQuestion = 
  {
    qid: "q" + (theModel.getNumQuestions() + 1),
    title: qTitle,
    text: qText,
    tagIds: newQuestTags,
    askedBy : qUsername,
    askDate: new Date(),
    ansIds: [],
    views: 0,
  }
  theModel.addQuestion(newQuestion);
  // console.log(theModel.getAllQstns());
  console.log(theModel);
//   console.log(updatedModel);
  setModel(theModel);
//   homePage();
  qFormData.reset();
}

//Check if inputs are valid and adds error
function validateInputs(qTitle, qText,qTags,qUsername)
{
  //Check if empty
  let valid = true;
  if(!qTitle || qTitle.replaceAll(" ", "").length === 0)
  {
    console.log("Need Title");
    let titleDiv = document.getElementById("qTitleError");
    titleDiv.innerHTML = "Need Title"
    valid = false;
  }
  if(!qText || qText.replaceAll(" ", "").length === 0)
  {
    console.log("Need Question");
    let textDiv = document.getElementById("qTextError");
    textDiv.innerHTML = "Need to fill response"
    valid = false;
  }
  if(!qTags || qTags.replaceAll(" ", "").length === 0)
  {
    console.log("Need Tags");
    let tagsDiv = document.getElementById("qTagsError");
    tagsDiv.innerHTML = "Need to give tags"
    valid = false;
  }
  if(!qUsername || qUsername.replaceAll(" ", "").length === 0) 
  {
    console.log("Need Username");
    let userDiv = document.getElementById("qUserError");
    userDiv.innerHTML = "Need to give username"
    valid = false;
  }
  return valid
}

export function clearInvalidInputs()
{
  let invalidDivs = document.getElementsByClassName("invalidInput");
  for(let i = 0; i < invalidDivs.length ; i++)
  {
    invalidDivs[i].innerHTML = "";
  }

}

//Checks if Flags are valid and adds them to tag list
function validateTags(tagList, theModel)
{
//   console.log(theModel)
  let valid = true;
  console.log(tagList);
  if(!tagList)
    return false
  if(tagList.length === 0)
  {
    console.log("Need Tags");
    let tagsDiv = document.getElementById("qTagsError");
    tagsDiv.innerHTML = "Need to give tags"
    valid = false;
  }
  let tagsDiv = document.getElementById("qTagsError");
  if (tagList.length > 5)
  {
    console.log("Too many tags")
    tagsDiv.innerHTML = "Maximum of 5 tags"
    return false;
  }
  for(let i = 0; i < tagList.length; i++)
  {
    if(tagList[i].length >10)
    {
      console.log("Tag size exceeded")
      tagsDiv.innerHTML = "Tag character limit is 10"
      return false;
    }
    let tagFound = theModel.getAllTags().find(tag => tag.name === tagList[i].toLowerCase());
    if(tagFound == null)
    {
      let newTag = 
      {
        tid: "t" +  (theModel.getNumTags() + 1),
        name: tagList[i].toLowerCase(),
      }
      theModel.addTag(newTag);
    }
  }
  return true
}

function removeDuplicates(theArrayObject)
{
    for(let i = 0; i < theArrayObject.length; i++)
    {
        let current = theArrayObject[i];
        for(let j = i+ 1; j < theArrayObject.length; j++)
        {
            while(theArrayObject[j] === current)
            {
                theArrayObject.splice(j,1);
            }
        }
    }

};