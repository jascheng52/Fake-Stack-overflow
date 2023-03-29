import SortQuestionByDate from '../components/sortQuestionByDate'

export default function NewestButton ({ theModel, settheModel, questions }) {
  const sortedArr = SortQuestionByDate(questions)
  return sortedArr
}
