import React from 'react';
import MonacoEditor from 'react-monaco-editor';

interface CodeEditorProps {
  // Define any props you need, like value, language, options, etc.
  code: string;
  onChange: (newValue: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <MonacoEditor
    
      width="100%"
      height="100%"
      language="json"
      theme="vs"
      value={code}
      options={{
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
        scrollBeyondLastLine: true,
      }}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
