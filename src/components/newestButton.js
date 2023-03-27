// this function is to order questions from newest to oldest
import deleteRows from '../components/deleteRows.js';
// import timeCheck from '../components/timeCheck';
// import addRow from '../components/addRow.js';
import Model from '../models/model.js'
import InitialHomePage from '../components/initialHomePage'
import SortQuestionByDate from '../components/sortQuestionByDate'

export default function NewestButton({theModel,settheModel}){
    let questions = theModel.data.questions;
    let sortedArr = SortQuestionByDate(questions);
    return sortedArr;
    // let sortedModel = new Model();
    // sortedModel.data.questions = sortedArr;
    // settheModel(theModel = sortedModel);
}
