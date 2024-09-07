import Head from 'next/head';
import TestCaseGenerator from '../app/components/testCaseGenerator';

export default function Home() {
  return (
    <div className="min-h-screen p-4">
      <Head>
        <title>Test Case Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6">Test Case Generator</h1>
        <TestCaseGenerator />
      </main>
    </div>
  );
}