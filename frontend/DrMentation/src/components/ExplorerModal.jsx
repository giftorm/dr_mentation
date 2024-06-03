const buttonStyle = 'flex text-xl px-4 py-2 text-text rounded-md font-primary hover:bg-gray-700';


export default function ExplorerModal({onToggle}) {
return (
    <div className="bg-primarytint fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" onClick={onToggle}>
      <div className="bg-primary w-full max-w-3xl h-[70vh] p-6 rounded-lg shadow-lg" onClick={null}>
        <div className="flex justify-end">
          <button key={"ToggleExplorer"} className={buttonStyle} onClick={onToggle}>
            close
          </button>
        </div>
        <div className="mt-4">
            kalle
        </div>
      </div>
    </div>
  );
};
