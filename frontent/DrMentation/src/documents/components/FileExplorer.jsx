function FileExplorer() {

    const files = [ 'File 1', 'Kalles Ankan', 'Io' ]

    return (
        <div className='bg-background basis-1/4 p-1'>
            <div>
                <ul>
                    {files.map((file, index) => (
                        <li key={index} className='text-center border-2 rounded-3xl hover:bg-primary mb-2'>{file}</li>

                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FileExplorer;
