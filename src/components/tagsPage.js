import Model from '../models/model.js';



export default function tagsPage({model, setModel})
{
    return(
    <>
        <div className = 'hidden'  id = "tagsPage">

            <div className="right-table defaultPos">
                <div>
                    <div className = "tagHeader" height='100' ><h2 id = "numTagsHeader">  Tags </h2></div>
                    <div className = "tagHeader" style ={{paddingLeft: "40%"}}><h2> All Tags </h2></div>
                    <div className = "tagHeader" style = {{float: "right", paddingTop: "10px"}}><button className="ask-q-button" id = "homeQbutton4" >Ask Question</button></div>
                </div>
            </div>
            {/* <div className = "defaultStartTable" id = "defaultStartTable">
    
            </div> */}
        </div>
    </>
        )
}


function createTagItem(tagFullName, tagCount)
{

    let tagItem = document.createElement("div");
    tagItem.className = "flexItemTag"

    let tagName = document.createElement("div");
    tagName.className = "flexTagName itemElements";
    tagName.innerHTML = tagFullName

    let tagNum = document.createElement("div");
    tagNum.className = "numTag itemElements";
    tagNum.innerHTML = tagCount;
    if(tagCount !== "")
        if(tagCount == 1)
            tagNum.innerHTML += " question";
        else
            tagNum.innerHTML += " questions";
    else
        tagItem.className = "flexItemTagEmpty"

    let tagItemName = document.createElement("div")
    tagItemName.appendChild(tagName);
    tagItemName.appendChild(tagNum);
    tagItemName.className = "tagWrapper"


    tagName.addEventListener("click", function(){return redirectTag(tagFullName)})
    tagItem.appendChild(tagItemName);
    // tagItem.appendChild(tagName);
    // tagItem.appendChild(tagNum);

    return tagItem
}

function createTagRow(tagNum)
{
    console.log(theModel);
    let tagIndex = tagNum;
    let tagRow = document.createElement("div");
    tagRow.className = "flexContainerRow";
    
    for(let i = 0; i < 3; i++)
    {
        let tagItem = null;
        if(theModel.getNumTags() > tagIndex)
        {
            let x = theModel.getTagAt(tagIndex);
            let tagId = theModel.getTagAt(tagIndex)["tid"];
            let tagCount = numTagsinQuestion(tagId);
            let tagFullName = theModel.getTagAt(tagIndex)["name"];
            tagItem = createTagItem(tagFullName, tagCount);
        }
        else
        {
            tagItem = createTagItem("", "");
        }
        tagRow.appendChild(tagItem);
        tagIndex++;
    }
    return tagRow;
}


export function buildTagTable()
{
    let table = document.getElementById("defaultStartTable");
    table.innerHTML = "";
    console.log(table);
    let numTags = theModel.getNumTags();
    let numRows = Math.floor(numTags/3);
    if(numTags % 3 > 0)
        numRows++;
    let tagNum = 0; //index of the tag
    for(let i  = 0; i < numRows; i++)
    {
        let newRow = createTagRow(tagNum);
        table.appendChild(newRow);
        tagNum += 3;
    }

}

//count occurence of tag in questions
function numTagsinQuestion(tagId)
{
    let questions = theModel.getAllQstns();
    let counter = 0;
    for(let i = 0; i < questions.length; i++)
    {
        let questionTags = questions[i].tagIds;
        for(let j = 0; j < questionTags.length; j++)
        {
            if(questionTags[j] === tagId)
                counter++;
        }
    }
    return counter;
}

function redirectTag(tagName)
{
    console.log(tagName);
    let tagID = theModel.getTagIDFromName(tagName);
    let filteredQuest = theModel.filterQuestByTagID(tagID);
    
    hideAllHidden();
    addRow(filteredQuest);
    if(filteredQuest.length === 1)
        document.getElementById("numQuestions").innerHTML = 1 + " Question";
    else
        document.getElementById("numQuestions").innerHTML = filteredQuest.length + " Questions";
    document.getElementById("homepage").style.display = "block";
    document.getElementById("typeDisplayed").innerHTML = "All " + tagName + " Questions";
    let qst = document.getElementById("tableSide");
    qst.style.backgroundColor = "gray";
    let tag = document.getElementById("tagsSide");
    tag.style.backgroundColor = "transparent";
    newestButton(filteredQuest);
}



