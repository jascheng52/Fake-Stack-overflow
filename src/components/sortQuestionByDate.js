
export default function SortQuestionByDate (questionArr) {
  // let questionArr = theModel.data.questions;
  const secsSincePostedArr = []
  const currDate = new Date()
  for (let i = 0; i < questionArr.length; i++) {
    const dateStr = questionArr[i].askDate.toString()
    const dateObj = new Date(dateStr)
    const seconds = Math.abs(currDate - dateObj) / (1000)
    secsSincePostedArr.push(seconds)
  }
  let tempArr = [...secsSincePostedArr]
  tempArr = tempArr.sort(function (a, b) { return a - b })
  const sortedIndexArr = []
  for (let j = 0; j < tempArr.length; j++) {
    sortedIndexArr.push(secsSincePostedArr.indexOf(tempArr[j]))
  }
  const sortedQuestionArr = []
  for (let k = 0; k < sortedIndexArr.length; k++) {
    sortedQuestionArr.push(questionArr[sortedIndexArr[k]])
  }
  return sortedQuestionArr
}
