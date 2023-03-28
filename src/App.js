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
import { StatusEnum, States } from './components/questionArrayStates'

// eslint-disable-next-line no-unused-vars
import LoadAnswerPage from './components/loadAnswerPage'
import QuestionForm from './components/question'
// import SearchPage from './components/search'

function App () {
  const [theModel, settheModel] = useState(new Model())
  const [buttonState, setButtonState] = useState(StatusEnum.NEWEST)
  const [questionClickedOn, setQuestionClickedOn] = useState({})
  const [state, setState] = useState(States.QUESTIONPAGE)

  return (
    <section className="fakeso">
      <Banner setShowPage={setShowSearchPage}/>
      {/* <QuestionForm model = {theModel} setModel = {settheModel}/> */}
      <LeftSideMenu theModel = {theModel} settheModel={settheModel} setButtonState={setButtonState}
      state={state} setState={setState}/>
      {/* <AnswersForm/>  */}
      <InitialHomePage theModel = {theModel} settheModel={settheModel} buttonState={buttonState} setButtonState={setButtonState}
      questionClickedOn={questionClickedOn} setQuestionClickedOn={setQuestionClickedOn} state={state} setState={setState}
      />
      <TagsPage model = {theModel} setModel = {settheModel} state={state} setState={setState}/>
      {/* <SearchPage theModel={theModel} settheModel={settheModel} buttonState = {buttonState} setButtonState={setButtonState} showSearchPage = {showSearchPage}/> */}
      <LoadAnswerPage questionClickedOn={questionClickedOn} theModel={theModel} state={state} setState={setState}/>;
      <QuestionForm theModel = {theModel} settheModel={settheModel} state={state} setState={setState} />
    </section>
  )
}

export default App
