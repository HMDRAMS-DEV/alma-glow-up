# Alma Food Personality Quiz - Setup Guide

## Overview

This is a mobile-responsive Next.js quiz application that helps users discover their "food personality" and maps them to personalized macro split recommendations. The quiz integrates with Loops for automated email marketing.

## Features

✅ **Complete Quiz Flow**
- Welcome screen with Alma branding
- 5-question personality assessment
- Email collection
- Personalized results display

✅ **Mobile Responsive Design**
- Optimized for all screen sizes
- Touch-friendly interface
- Responsive typography and layout

✅ **4 Personality Types**
1. **The Builder** (40% protein, 30% carbs, 30% fat)
2. **The Lean Seeker** (35% protein, 25% carbs, 40% fat)
3. **The Energizer** (30% protein, 40% carbs, 30% fat)
4. **The Harmonizer** (30% protein, 35% carbs, 35% fat)

✅ **Loops Integration**
- Automatic contact creation
- Personalized data capture
- Email automation ready

## Loops API Setup

1. **Get your Loops API key**
   - Log into your Loops account
   - Go to API settings
   - Copy your API key

2. **Update environment variables**
   ```bash
   # Edit .env.local
   LOOPS_API_KEY=your_actual_api_key_here
   ```

3. **Restart your development server**
   ```bash
   npm run dev
   ```

## Data Sent to Loops

For each quiz completion, the following data is sent to Loops:

```json
{
  "email": "user@example.com",
  "personalityType": "builder",
  "personalityName": "The Builder",
  "personalityDescription": "Structured, goal-driven, performance-oriented.",
  "macroProtein": 40,
  "macroCarbs": 30,
  "macroFat": 30,
  "personalityMessage": "You thrive when you hit high protein consistently — Alma can make it effortless."
}
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npm run build && git add . && git commit -m "Deploy" && git push
```

## Usage at Events

The quiz works perfectly for booth/event usage:
- Fast loading and responsive
- Clear call-to-action
- Professional branding
- Immediate value delivery
- Lead capture with personalization

## Next Steps

1. Add your actual Loops API key to `.env.local`
2. Test the complete flow
3. Deploy to production
4. Set up Loops email automation sequences for each personality type