import { React, Fragment } from 'react';
import Header from './components/Header';
import Page from './documents/Page';

function App() {
    return (
        <Fragment>
        <div className='bg-background'>
            <Header />
            <Page />
            <div className="bg-background min-h-screen">
                <p className="text-red-500">This is an example.</p>
            </div>
        </div>
        </Fragment>
    );
}

export default App;

