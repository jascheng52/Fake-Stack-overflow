import Model from '../models/model.js';

export default function questionForm()
{
    return(
    <>
    <div className = "hidden" id = "newAnswerForm">
        <form className = "defaultPos" id = "answerToQuestion">
            <label className = "formTitle" for = "aUser"> Username*</label>
            <div className = "invalidInput" id = "aUserError"></div>
            <span className = "formEntry"><br/><input className = "formText" type="text" name = "aUser"  placeholder="Enter Username..."/></span>
        <br/>
        <br/>
        <label className = "formTitle" for = "aText">Answer Text*</label>
        <div className = "invalidInput" id = "aTextError"></div>
        <span className = "formEntry"><br/><textarea className = "formText textInput" name = "aText" type="text"  placeholder="Enter Response..."></textarea>
    </span>
    <br/>
    <span ><button type = "button" className = "formButton" id = "aButton"> Post Answer</button></span>
    </form>
    </div>
    </>
    )

}



