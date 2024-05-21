function SubHeader({ editMode, onSave, onExit, onNew, onEdit, feedElement }) {
  const buttonStyle = 'flex text-xl px-4 py-2 text-text rounded-md font-primary hover:bg-gray-700';

  if (editMode) {
    const btns = [
      { name: 'B', syntax: '**Bold**' },
      { name: 'I', syntax: '*Italic*' },
      { name: 'S', syntax: '~Strikethrough~' },
      { name: 'H1', syntax: '# ' },
    ];

    return (
      <header className='flex items-center h-14 sticky border-t-2 justify-center'>
        <div className='flex space-x-4'>
          {btns.map((btn) => (
            <button key={btn.syntax} className={buttonStyle} onClick={() => feedElement(btn.syntax)}>
              {btn.name}
            </button>
          ))}
          <button key='save' className={buttonStyle} onClick={onSave}>
            save
          </button>
          <button key='exit' className={buttonStyle} onClick={onExit}>
            exit
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className='flex items-center h-14 sticky border-t-2 justify-center'>
      <div className='flex space-x-4'>
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
