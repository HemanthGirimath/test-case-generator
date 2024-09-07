'use client'
import { useState, FormEvent } from 'react';
import TestCaseDisplay from './TestCaseDisplay';

export default function TestCaseGenerator() {
  const [context, setContext] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [testCases, setTestCases] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTestCases('');
    setProgress(0);

    try {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
          const base64Image = reader.result as string;
          
          const response = await fetch('/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              context,
              imageDataUrl: base64Image,
            }),
          });
          
          const data = await response.json();
          setTestCases(prevTestCases => prevTestCases + '\n\n' + data.testCases);
          setProgress(((i + 1) / images.length) * 100);
        };
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="context" className="block mb-2">Context</label>
        <input
          type="text"
          id="context"
          className="w-full p-2 border rounded text-black"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Enter context for test cases"
        />
      </div>
      <div>
        <label htmlFor="images" className="block mb-2">Upload Images</label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Test Cases'}
      </button>
    </form>
    {isLoading && (
      <div className="mt-4">
        <div className="w-full  rounded-full h-2.5 ">
          <div className="h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-center mt-2">Processing images: {Math.round(progress)}%</p>
      </div>
    )}
    {testCases && <TestCaseDisplay testCases={testCases} />}
  </div>
  );
}