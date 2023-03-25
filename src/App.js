// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import React from 'react';
import './stylesheets/App.css';
// import FakeStackOverflow from './components/fakestackoverflow.js'
import Banner from './components/banner.js'
import QuestionForm from './components/question.js'
import AnswersForm from './components/answers.js'
import LeftMenu from './components/leftSideMenu.js'
import './stylesheets/index.css';
import Model from '../models/model.js';



function App() {
  const [theModel, settheModel] = useState(new Model());
  const [lastQuestionArr, setLastQuestionArr] = useState([]);
  const [lastAnswerPageEvent, setLastAnswerPageEvent] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState(theModel.getAllQstns());
  return (
    <section className="fakeso">
      <Banner />
      <QuestionForm/> 
      <LeftMenu model={theModel} setModel={settheModel}
      lastQues={lastQuestionArr} setLastQuest={setLastQuestionArr}
      lastAns={lastAnswerPageEvent} setLastAns={setLastAnswerPageEvent}
      currQues={currentQuestions} setCurrQues={setCurrentQuestions}/>
      <AnswersForm/> 

    </section>
  );
}

export default App;
