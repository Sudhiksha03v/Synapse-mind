import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface OpenAIResponse {
  choices: { message: { content: string } }[];
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Analyze this social media post for mental health indicators. Return a JSON object with categories (e.g., Depression, Anxiety) including confidence scores (0-100) and explanations, plus a summary.',
        },
        { role: 'user', content: text },
      ],
      response_format: { type: 'json_object' },
    }) as OpenAIResponse;

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('OpenAI API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze post';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}