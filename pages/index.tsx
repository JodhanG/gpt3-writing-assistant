import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';


const Home = () => {
  
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const userInput = e.target as HTMLTextAreaElement
    setUserInput(userInput.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>AI Product Advert Copywriter</h1>
          </div>
          <div className="header-subtitle">
            <h2>Input the product and what it does, we'll do the rest</h2>
            <h3>Example input:</h3>
            <p>Product: 2022 Porsche 911</p>
            <p>Tone: Mature, technical</p>
            <p>Features: Four wheel steering, V12 quad-turbo engine, 1000HP</p>

          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="Give some product details, features, fun facts, etc" className="prompt-box" value={userInput} onChange={onUserChangedText} />
          <div className="prompt-buttons">
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Home;
