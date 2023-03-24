// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
import FakeStackOverflow from './components/fakestackoverflow.js'
import Banner from './components/banner.js'
import QuestionForm from './components/question.js'
import AnswersForm from './components/answers.js'
import './stylesheets/index.css';



function App() {
  return (
    <section className="fakeso">
      <Banner />
      <QuestionForm/> 
      {/* <AnswersForm/> */}
    </section>
  );
}

export default App;
