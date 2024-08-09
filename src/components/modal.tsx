import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: string;
  resultString: string;
}

const removeFields = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => removeFields(item));
  } else if (typeof data === 'object' && data !== null) {
    const { id, type, ...rest } = data;
    return Object.fromEntries(Object.entries(rest).map(([key, value]) => [key, removeFields(value)]));
  } else {
    return data;
  }
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, result, resultString }) => {
  if (!isOpen) return null;

  // Parse the result string to JSON and remove id/type fields
  const parsedResult = JSON.parse(result);
  const cleanedResult = removeFields(parsedResult);

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-950 bg-opacity-75 dark:bg-opacity-80"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Result</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal Body */}
          <div className="p-4 space-y-4">
            <SyntaxHighlighter
              language="json"
              style={solarizedlight}
              className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-gray-800 dark:text-gray-100"
            >
              {resultString}
            </SyntaxHighlighter>
            <SyntaxHighlighter
              language="json"
              style={solarizedlight}
              className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-gray-800 dark:text-gray-100"
            >
              {JSON.stringify(cleanedResult, null, 2)}
            </SyntaxHighlighter>
          </div>
          {/* Modal Footer */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
