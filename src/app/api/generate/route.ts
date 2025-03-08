import { NextResponse } from 'next/server';
import OpenAI from 'openai';

interface GenerateRequest {
  prompt: string;
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY,
  // defaultHeaders: {
  //   'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
  //   'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
  // },
});


async function main(text:string) {
  console.log(process.env.OPENAI_API_KEY)
  const completion = await openai.chat.completions.create({
    model: 'deepseek/deepseek-r1:free',
    messages: [
      {
        role: 'user',
        content: text,
      },
    ],
  });
  console.log(completion.choices[0].message);
  return completion.choices[0].message;

}


export async function POST(request: Request) {

  const body: GenerateRequest = await request.json();
  console.log(body)
  if (!body.prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  const ans=await main(body.prompt);

  return NextResponse.json({ result: ans });
}

