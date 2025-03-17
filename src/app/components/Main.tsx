'use client';

import React from 'react'
import { useState, FormEvent } from 'react';

const Hero = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    if (res.ok) {
      setResponse(data.result.content);
    } else {
      console.error(data.error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="p-8 w-full">
        <p className="text-3xl text-center">This is deepseek clone - Chatbot</p>
        <p className="text-center">How can i help you?</p>
        <p>{response}</p>
        <div className="sticky top-1/2">
          <div className="">
            <form onSubmit={handleSubmit}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="block w-full outline-2 p-2 border rounded-2xl"
              />
              <button type='submit' className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] ">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Generate
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
