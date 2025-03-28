import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

interface AnthropicResponse {
  content: { text: string }[];
}

interface ErrorResponse {
  error?: {
    message?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Valid text content is required' }, { status: 400 });
    }

    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicApiKey) {
      return NextResponse.json({ error: 'Anthropic API key is not configured' }, { status: 500 });
    }

    const categories = ['Sleep Issues', 'Anxiety', 'Depression', 'Stress', 'Self-Harm', 'Emotional Distress', 'None'];

    const prompt = `
      Analyze the following social media post for signs of mental health issues.
      Categorize it into one or more of these categories: ${categories.join(', ')}.
      For each applicable category, provide a confidence score (0-100) and a brief explanation.
      If multiple categories apply, rank them by confidence.
      If no categories apply, indicate "None" with a brief explanation.

      Post: "${text}"

      Respond in the following JSON format:
      {
        "categories": [
          {
            "name": "Category Name",
            "confidence": score,
            "explanation": "Brief explanation of why this category applies"
          }
        ],
        "summary": "A brief overall assessment of the post's mental health indicators"
      }
    `;

    const response = await axios.post<AnthropicResponse>(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
        system: 'You are a mental health analysis assistant that detects signs of mental health issues in social media posts. Always respond with a valid JSON object in the requested format.',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01',
        },
      }
    );

    const responseContent = response.data.content[0].text;
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : responseContent;
    const analysis = JSON.parse(jsonString);
    return NextResponse.json(analysis);
  } catch (error: unknown) {
    console.error('Error analyzing text with Claude:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetail =
      error instanceof AxiosError && error.response?.data
        ? (error.response.data as ErrorResponse).error?.message || errorMessage
        : errorMessage;
    return NextResponse.json({ error: 'An error occurred during analysis', detail: errorDetail }, { status: 500 });
  }
}