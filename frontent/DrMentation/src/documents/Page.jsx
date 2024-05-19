import FileExplorer from './components/FileExplorer';
import Display from './components/Display';

export default function Page() {
    return (
        <div className='documentspage-wrapper text-text font-primary bg-background p-4'>
            <h1 className='font-bold size-12'>DOCS</h1>
            <div className='flex flex-row space-x-4'>
                <FileExplorer />
                <Display />
            </div>
        </div>
    );
}
