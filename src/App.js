// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
// import React from 'react'
import './stylesheets/App.css'
// import FakeStackOverflow from './components/fakestackoverflow.js'
import Banner from './components/banner.js'
// import QuestionForm from './components/question.js'
// import AnswersForm from './components/answers.js'
import TagsPage from './components/tagsPage.js'
// import LeftMenu from './components/leftSideMenu.js'
import './stylesheets/index.css'
import Model from './models/model.js'
import { React, useState } from 'react'
import LeftSideMenu from './components/leftSideMenu'
import InitialHomePage from './components/initialHomePage'
// import SortQuestionByDate from "./components/sortQuestionByDate.js";
import StatusEnum from "./components/questionArrayStates";
import LoadAnswerPage from './components/loadAnswerPage';

function App () {
  const [theModel, settheModel] = useState(new Model())  
  const [showQuestionPage, setShowQuestionPage] = useState(true);
  const [showTagsPage, setShowTagsPage] = useState(false);
  const [buttonState,setButtonState] = useState(StatusEnum.NEWEST);
  const [showAnswerPage, setShowAnswerPage] = useState(false);
  const [questionClickedOn, setQuestionClickedOn] = useState({});

  return (
    <section className="fakeso">
      <Banner/>
      {/* <QuestionForm model = {theModel} setModel = {settheModel}/> */}
      <LeftSideMenu theModel = {theModel} settheModel={settheModel} showQuestionPage={showQuestionPage} setShowQuestionPage={setShowQuestionPage}
      showTagsPage={showTagsPage} setShowTagsPage={setShowTagsPage} setButtonState={setButtonState} setShowAnswerPage={setShowAnswerPage}/>
      {/* <AnswersForm/>  */}
      <InitialHomePage theModel = {theModel} settheModel={settheModel} showQuestionPage={showQuestionPage} buttonState={buttonState} 
      setButtonState={setButtonState} setShowQuestionPage={setShowQuestionPage} showAnswerPage={showAnswerPage} setShowAnswerPage={setShowAnswerPage}
      questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn}/>
      <TagsPage model = {theModel} setModel = {settheModel} showTagsPage={showTagsPage}/>
    </section>
  )
}

export default App
