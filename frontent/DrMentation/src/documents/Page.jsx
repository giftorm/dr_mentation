import Display from './components/Display';
import { RiEditLine } from "react-icons/ri";


export default function Page() {
    return (
        <>
            <div className='flex justify-center'>
                <button className='text-white m-2'><RiEditLine /></button>
            </div>
            <div className='documentspage-wrapper pl-4 pr-4 place-items-center flex justify-center'>
                <Display />
            </div>
        </>
    );
}
