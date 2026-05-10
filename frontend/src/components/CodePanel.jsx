import { useState, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodePanel({ metadata, codeLine }) {
  const [activeTab, setActiveTab] = useState('pseudocode');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!metadata) return;
    const text = activeTab === 'pseudocode' ? metadata.pseudocode : activeTab === 'cpp' ? metadata.cppCode : metadata.bsmjaCode;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [metadata, activeTab]);

  if (!metadata) {
    return (
      <div className="card flex items-center justify-center min-h-[200px]">
        <p className="text-gray-400 dark:text-gray-500 text-sm">Select an algorithm to view code</p>
      </div>
    );
  }

  const currentCode = activeTab === 'pseudocode' ? metadata.pseudocode : activeTab === 'cpp' ? metadata.cppCode : metadata.bsmjaCode;
  const cppLines = metadata.cppLines || [];

  return (
    <div className="card flex flex-col h-full">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
          <button
            onClick={() => setActiveTab('pseudocode')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'pseudocode'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Pseudocode
          </button>
          <button
            onClick={() => setActiveTab('cpp')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'cpp'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            C++
          </button>
          <button
            onClick={() => setActiveTab('bsmja')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'bsmja'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            بصمجه
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300
                     flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code display */}
      {activeTab === 'pseudocode' ? (
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language="text"
            style={oneDark}
            customStyle={{ margin: 0, borderRadius: '0.5rem', fontSize: '0.8125rem', background: '#1e1e2e' }}
            showLineNumbers
          >
            {metadata.pseudocode}
          </SyntaxHighlighter>
        </div>
      ) : activeTab === 'cpp' ? (
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language="cpp"
            style={oneDark}
            customStyle={{ margin: 0, borderRadius: '0.5rem', fontSize: '0.8125rem', background: '#1e1e2e' }}
            showLineNumbers
            wrapLines
            lineProps={(lineNumber) => {
              if (codeLine !== undefined && lineNumber === codeLine + 1) {
                return {
                  style: {
                    backgroundColor: 'rgba(250, 204, 21, 0.2)',
                    borderLeft: '3px solid #eab308',
                    display: 'block',
                  },
                };
              }
              return {};
            }}
          >
            {metadata.cppCode}
          </SyntaxHighlighter>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language="cpp"
            style={oneDark}
            customStyle={{ margin: 0, borderRadius: '0.5rem', fontSize: '0.8125rem', background: '#1e1e2e' }}
            showLineNumbers
          >
            {metadata.bsmjaCode}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
