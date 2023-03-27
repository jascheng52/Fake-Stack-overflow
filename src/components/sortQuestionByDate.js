

export default function SortQuestionByDate(questionArr){
    // let questionArr = theModel.data.questions;
    let secsSincePostedArr = [];
    const currDate = new Date();
    for (let i = 0; i < questionArr.length; i++){
      let dateStr = questionArr[i].askDate.toString();
      const dateObj = new Date(dateStr);
      let seconds = Math.abs(currDate - dateObj) / (1000);
      secsSincePostedArr.push(seconds);
    }
    let tempArr = [...secsSincePostedArr];
    tempArr = tempArr.sort(function(a, b){return a-b;});
    let sortedIndexArr = [];
    for (let j = 0; j < tempArr.length; j++){
      sortedIndexArr.push(secsSincePostedArr.indexOf(tempArr[j])); 
    }
    let sortedQuestionArr = [];
    for (let k = 0; k < sortedIndexArr.length; k++){
      sortedQuestionArr.push(questionArr[sortedIndexArr[k]]);
    }
    return sortedQuestionArr;
}