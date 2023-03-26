// this function is to order questions from newest to oldest
import deleteRows from '../components/deleteRows.js';
import timeCheck from '../components/timeCheck';
import addRow from '../components/addRow.js';

export default function NewestButton({theModel, currentQuestions}){
    //document.getElementById("homePageNewestBtn").removeEventListener("click",function (){return NewestButton(currentQuestions)} );
    deleteRows();
    let sortedArr = timeCheck.sortQuestionsByDate(currentQuestions);
    addRow(sortedArr);
    currentQuestions = theModel.getAllQstns();
    //document.getElementById("homePageNewestBtn").addEventListener("click",function (){return NewestButton(currentQuestions)} );
}

// export default function NewestButton(questions){
//     document.getElementById("homePageNewestBtn").removeEventListener("click",function (){return NewestButton(currentQuestions)} );
//     currentQuestions = questions;
//     console.log(currentQuestions);
//     deleteRows();
//     let sortedArr = timeCheck.sortQuestionsByDate(questions);
//     addRow(sortedArr);
//     currentQuestions = theModel.getAllQstns();
//     document.getElementById("homePageNewestBtn").addEventListener("click",function (){return NewestButton(currentQuestions)} );
// }