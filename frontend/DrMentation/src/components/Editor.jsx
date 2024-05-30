export default function Editor({ content, onChange, textareaRef }) {
  return (
    <section className='flex-grow w-full max-w-4xl'>
      <textarea
        className='p-5 text-text w-full bg-transparent h-full resize-none focus:outline-none placeholder:text-lg placeholder:text-white placeholder:tracking-wider placeholder:opacity-80'
        placeholder='Markdown goes here...'
        onChange={(e) => onChange(e.target.value)}
        value={content}
        autoFocus
        ref={textareaRef}
      />
    </section>
  );
}

