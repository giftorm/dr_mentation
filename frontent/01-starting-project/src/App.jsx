import { useState } from 'react';

import { EXAMPLES , CORE_CONCEPTS} from './data.js';
import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx';

function App() {
    const [ selectedTopic, setSelectedTopic ]  = useState();


    function handleSelect(selectedButton) {
        setSelectedTopic(selectedButton);
    }

    const buttons = ["components", "jsx", "props", "State"];
    let tab_content = <p>Please select a topic.</p>

    if (selectedTopic) {
        tab_content = (
        <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
                <code>
                    {EXAMPLES[selectedTopic].code}
                </code>
            </pre>
        </div> );
    }

  return (
    <div>
      <Header />
      <main>
      <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map((i) => (
            <CoreConcept key={i.title} {...i} />
        ))}
      </ul>
      </section>
      <section id="examples">
        <h2>Examples</h2>
        <menu>
           {buttons.map((x) => <TabButton key={x.toLowerCase()} isSelected={selectedTopic === x} onClick={() => handleSelect(x.toLowerCase())}>{x}</TabButton>)}
        </menu>
      {tab_content}
      </section>
      </main>
    </div>
  );
}

export default App;
