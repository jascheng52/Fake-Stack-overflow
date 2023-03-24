import Model from '../models/model.js';

export default function questionForm()
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
        <span ><button type = "button" className = "formButton" id = "qButton"> Post Question</button></span> <div id = "qRequired"> * indicates mandatory fields</div>
        </form>
        </div>
    </>
    )

} 