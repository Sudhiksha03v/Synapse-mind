import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Valid text content is required' },
        { status: 400 }
      );
    }

    // Define the categories for mental health analysis
    const categories = [
      'Sleep Issues',
      'Anxiety',
      'Depression',
      'Stress',
      'Self-Harm',
      'Emotional Distress',
      'None'
    ];

    // Create a prompt for the LLM
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

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
      response_format: { type: 'json_object' },
    });

    // Parse the response
    const responseContent = completion.choices[0].message.content;
    
    if (!responseContent) {
      return NextResponse.json(
        { error: 'Failed to analyze text' },
        { status: 500 }
      );
    }

    try {
      const analysis = JSON.parse(responseContent);
      return NextResponse.json(analysis);
    } catch (e) {
      return NextResponse.json(
        { error: 'Failed to parse analysis result', detail: responseContent },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error analyzing text:', error);
    return NextResponse.json(
      { error: 'An error occurred during analysis', detail: error.message },
      { status: 500 }
    );
  }
} 