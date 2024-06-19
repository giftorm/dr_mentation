export default function Editor({ content, onChange, textareaRef }) {
    return (
        <section className='flex flex-1 w-max max-w-3xl'>
            <textarea
                className='mr-5 p-5 rounded-3xl text-text bg-backgroundtint w-full h-full resize-none focus:outline-none placeholder:text-lg placeholder:text-white placeholder:tracking-wider placeholder:opacity-80'
                placeholder='Markdown goes here...'
                onChange={(e) => onChange(e.target.value)}
                value={content}
                autoFocus
                ref={textareaRef}
            />
        </section>
    );
}

