"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [url, setUrl] = useState("");
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerateText = async () => {
    try {
      const response = await axios.post('/api/scrape', { url });
      let data = response.data.data;
      if (data.length > 16000) {
        data = data.substring(0, 16000);
      }
      data = data + '\n' + 'summarizes this bbc article  ';
      const datas = await axios.post('/api/summarizes', { prompt: data });
      let ans = datas.data.choices[0].message.content.trim();
      setGeneratedText(ans);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: '80%', height: "100vh", marginTop: '20px', textAlign: 'center', marginLeft: '10%', fontSize: '1.25rem', fontWeight: 'bold' }}>
      <input style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }} value={url} onChange={(e) => setUrl(e.target.value)} placeholder='enter url here...' />
      <button style={{
        marginTop: '2%',
        justifySelf: 'center',
        background: 'blue',
        color: 'white',
        width: '25%',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        border: 'none',
        cursor: 'pointer'
      }} onClick={handleGenerateText}>Generate </button>
      <div>{generatedText}</div>
    </div>
  );
};

export default Page;
