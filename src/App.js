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

function App () {
  const [theModel, settheModel] = useState(new Model())
  const [showQuestionPage, setshowQuestionPage] = useState(true);
  const [showTagsPage, setShowTagsPage] = useState(false);
  // const [lastQuestionArr, setLastQuestionArr] = useState([]);
  // const [lastAnswerPageEvent, setLastAnswerPageEvent] = useState(null);
  // const [currentQuestions, setCurrentQuestions] = useState(theModel.getAllQstns());
  return (
    <section className="fakeso">
      <Banner/>
      {/* <QuestionForm model = {theModel} setModel = {settheModel}/> */}
      <LeftSideMenu theModel = {theModel} showQuestionPage={showQuestionPage} setshowQuestionPage={setshowQuestionPage}
      showTagsPage={showTagsPage} setShowTagsPage={setShowTagsPage}/>
      {/* <AnswersForm/>  */}
      <InitialHomePage theModel = {theModel} showQuestionPage={showQuestionPage}/>
      <TagsPage model = {theModel} setModel = {settheModel} showTagsPage={showTagsPage}/>
    </section>
  )
}

export default App
