import React, { useState } from 'react';

const buttonStyle = 'flex text-xl px-4 py-2 text-text rounded-md font-primary hover:bg-gray-700';

export default function DocumentForm({ document, onSave, onCancel }) {
  const [title, setTitle] = useState(document.title || '');

  function handleSave() {
    const updatedDocument = { ...document, title };
    onSave(updatedDocument);
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-primary w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Complete Document Details</h2>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button className={buttonStyle} onClick={onCancel}>Cancel</button>
          <button className={`${buttonStyle} ml-4`} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
