// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
import FakeStackOverflow from './components/fakestackoverflow.js'
import Banner from './components/banner.js'

function App() {
  return (
    <section className="fakeso">
      <Banner />
    </section>
  );
}

export default App;
