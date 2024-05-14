import { CORE_CONCEPTS } from './data.js';
import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx';

function App() {
    function handleSelect(selectedButton) {
        console.log(selectedButton);
    }

    const buttons = ["Component", "JSX", "Props", "State"];

  return (
    <div>
      <Header />
      <main>
      <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map(CoreConcept)}
      </ul>
      </section>
      <section id="examples">
        <h2>Examples</h2>
        <menu>
           {buttons.map((x) => <TabButton onClick={() => handleSelect(x.toLowerCase())}>{x}</TabButton>)}
           <TabButton onClick={() => handleSelect('jsx')}>JSX</TabButton>
           <TabButton onClick={() => handleSelect('props')}>Props</TabButton>
           <TabButton onClick={() => handleSelect('state')}>Sate</TabButton>
        </menu>
          Dynamic Content   
      </section>
      </main>
    </div>
  );
}

export default App;
