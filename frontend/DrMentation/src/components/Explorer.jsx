export default function Explorer(onClose) {
return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl h-[70vh] p-6 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            "KALLES AKSN"
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};
