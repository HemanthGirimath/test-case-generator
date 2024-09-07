import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  const { context, imageDataUrl } = await request.json();

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Context: ${context}\nGenerate test cases for the feature shown in the image. Include a description, pre-conditions, testing steps, and expected results for each test case.`
            },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl
              }
            }
          ]
        }
      ],
      model: "llava-v1.5-7b-4096-preview",
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    return NextResponse.json({ testCases: chatCompletion.choices[0]?.message.content });
  } catch (error) {
    console.error('Error generating test cases:', error);
    return NextResponse.json({ error: 'Error generating test cases' }, { status: 500 });
  }
}