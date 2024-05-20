import React from 'react';
import Header from './components/Header';
import Page from './documents/Page';

function App() {
    return (
        <div className='bg-background'>
            <Header />
            <Page />
            <div className="bg-background min-h-screen">
                <p className="text-red-500">This is an example.</p>
            </div>
        </div>
    );
}

export default App;

