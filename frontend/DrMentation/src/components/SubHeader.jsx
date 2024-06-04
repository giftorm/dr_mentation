function SubHeader({ editMode, onSave, onCancel, onNew, onEdit, onHide, preview, source, onToggleExplorer, setSource, textareaRef }) {
  const buttonStyle = 'flex text-xl px-4 py-2 text-text rounded-md font-primary hover:bg-gray-700';

  function applyFormat(fix, preOnly) {
    console.log(source)
    const { selectionStart, selectionEnd } = textareaRef.current;
    let newText;
    if (preOnly) {
      newText = source.content.slice(0, selectionStart) + fix + source.content.slice(selectionStart, selectionEnd) + source.content.slice(selectionEnd);
    } else {
      newText = source.content.slice(0, selectionStart) + fix + source.content.slice(selectionStart, selectionEnd) + fix + source.content.slice(selectionEnd);
    }
    setSource(newText);

    setTimeout(() => {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = selectionStart + fix.length;
      textareaRef.current.selectionEnd = selectionEnd + fix.length;
    }, 0);
  };


  if (editMode) {
    const btns = [
      { name: 'B', syntax: '**', preOnly: false },
      { name: 'I', syntax: '*', preOnly: false },
      { name: 'S', syntax: '~', preOnly: false },
      { name: 'H1', syntax: '# ', preOnly: true },
    ];

    return (
      <header className='flex items-center h-14 sticky border-t-2 justify-center'>
        <div className='flex space-x-4'>
          {btns.map((btn) => (
            <button key={btn.syntax} className={buttonStyle} onClick={() => applyFormat(btn.syntax, btn.preOnly)}>
              {btn.name}
            </button>
          ))}
          <button key='save' className={buttonStyle} onClick={onSave}>
            save
          </button>
          <button key='cancel' className={buttonStyle} onClick={onCancel}>
            cancel
          </button>
          <button key='preview' className={buttonStyle} onClick={() => onHide(!preview)}>
           {preview ? 'hide' : 'preview'}
        </button>
        </div>
      </header>
    );
  }

  return (
    <header className='flex items-center h-14 sticky border-t-2 justify-center'>
      <div className='flex space-x-4'>
        <button key='explorer' className={buttonStyle} onClick={onToggleExplorer}>
          explorer
        </button>
        <button key='new' className={buttonStyle} onClick={onNew}>
          new
        </button>
        <button key='edit' className={buttonStyle} onClick={onEdit}>
          edit
        </button>
      </div>
    </header>
  );
}

export default SubHeader;
