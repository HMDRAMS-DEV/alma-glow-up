import { NextRequest, NextResponse } from 'next/server';
import { PersonalityType } from '@/types/quiz';

interface SubmitQuizRequest {
  email: string;
  personalityType: PersonalityType;
}

export async function POST(request: NextRequest) {
  try {
    const { email, personalityType }: SubmitQuizRequest = await request.json();

    if (!email || !personalityType) {
      return NextResponse.json(
        { error: 'Email and personality type are required' },
        { status: 400 }
      );
    }

    // Loops API integration
    const loopsApiKey = process.env.LOOPS_API_KEY;
    if (!loopsApiKey) {
      console.error('LOOPS_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Add contact to Loops
    const loopsResponse = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${loopsApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        personalityType: personalityType.id,
        personalityName: personalityType.name,
        personalityDescription: personalityType.description,
        macroProtein: personalityType.macroSplit.protein,
        macroCarbs: personalityType.macroSplit.carbs,
        macroFat: personalityType.macroSplit.fat,
        personalityMessage: personalityType.message,
      }),
    });

    if (!loopsResponse.ok) {
      const errorData = await loopsResponse.text();
      console.error('Loops API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submit quiz error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}