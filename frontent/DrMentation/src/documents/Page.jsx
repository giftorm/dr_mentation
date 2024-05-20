import { useState } from 'react';
import Display from './components/Display';
import MDEditor from '@uiw/react-md-editor';
import content from './components/markdown/file1';


export default function Page() {
    const [ editorMode, setEditorMode ] = useState(false);
    let [ value, setValue ] = useState(content);

    function handleEditorMode() {
        if ( editorMode ) {
            setEditorMode(false);
        } else {
            setEditorMode(true);
        }
    }

    return (
        <>
            <div className='flex justify-center'>
                <button onClick={handleEditorMode} className='text-white m-2 underline font-header'>{editorMode ? 'edit' : 'close'}</button>
                {editorMode ? <></> : <button onClick={handleEditorMode} className='text-white m-2 underline font-header'>save</button>}
            </div>
            <div className='documentspage-wrapper pl-4 pr-4 place-items-center flex justify-center'>
                {editorMode ? <Display content={value} /> :
                <>
                    <MDEditor
                        value={value}
                        onChange={setValue}
                    />
                </>
                }
            </div>
        </>
    );
}
