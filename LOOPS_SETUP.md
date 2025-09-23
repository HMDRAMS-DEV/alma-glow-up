# Loops Email Setup Guide

## How the Email Process Works

The quiz now correctly uses Loops **transactional emails** with template IDs, not basic contact creation.

## Required Setup Steps

### 1. Create Email Template in Loops

1. Go to your Loops dashboard
2. Navigate to **Transactional** emails
3. Create a new transactional email template
4. Design your email template using these **data variables**:

```
{{personalityType}}        - "builder", "lean-seeker", etc.
{{personalityName}}        - "The Builder", "The Lean Seeker", etc.
{{personalityTitle}}       - "The Builder"
{{personalityDescription}} - "Structured, goal-driven, performance-oriented."
{{macroProtein}}          - 40 (percentage)
{{macroCarbs}}            - 30 (percentage)
{{macroFat}}              - 30 (percentage)
{{personalityMessage}}    - "You thrive when you hit high protein consistently..."
```

### 2. Get Your Transactional ID

1. After creating your template, **publish it**
2. Copy the **Transactional ID** (looks like: `clfq6dinn000yl70fgwwyp82l`)

### 3. Update Environment Variables

Add both variables to:

**Local (.env.local):**
```
LOOPS_API_KEY=f3aeb0b035a6ae53e9506ba974d0dfa7
LOOPS_TRANSACTIONAL_ID=your_actual_transactional_id_here
```

**Vercel Environment Variables:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add both variables above

### 4. Email Template Suggestions

**Subject Line:**
`Your {{personalityName}} Nutrition Blueprint is Ready 🎯`

**Email Content Ideas:**
- Welcome them as their personality type
- Show their macro split prominently
- Explain what their personality type means
- Give specific action steps for their type
- Include Alma branding and next steps

## API Details

The quiz sends this data to Loops:
- **Endpoint:** `https://app.loops.so/api/v1/transactional`
- **Method:** POST with template ID and data variables
- **Contact Creation:** Automatically adds them to your audience with `addToAudience: true`

## Testing

Once you add the transactional ID, test the full flow to ensure emails are being sent correctly!