import React from 'react';

interface TestCaseDisplayProps {
  testCases: string;
}

const TestCaseDisplay: React.FC<TestCaseDisplayProps> = ({ testCases }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Generated Test Cases:</h2>
      <pre className=" p-4 rounded overflow-auto whitespace-pre-wrap">{testCases}</pre>
    </div>
  );
};

export default TestCaseDisplay;