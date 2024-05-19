import FileExplorer from './components/FileExplorer';
import Display from './components/Display';

export default function Page() {
    return (
        <div>
            <p>This is the body of the page.</p>
            <p>It should have two boxes, one to the left and the other to the right.</p>
            <p>The box to the left should be a "file explorer"</p>
            <p>The box to the right should be renered markdown based on a string fetched from an API.</p>
        <div className='bg-background'><p>Hello</p></div>
            <div className='flex flex-row space-x-4 m-4'>
                <FileExplorer />
                <Display />
            </div>
        </div>
    );
}
