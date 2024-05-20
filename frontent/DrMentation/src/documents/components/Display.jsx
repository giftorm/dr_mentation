import Markdown from "react-markdown";
import content from './markdown/file1';

function Display() {
    return(
        <div className='max-w-4xl border-secondary border-2 p-6'>
            <Markdown className='prose prose-invert bg-background'>{content}</Markdown>
        </div>
    );
}

export default Display;
