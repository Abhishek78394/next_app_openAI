import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';


export async function POST(req: NextRequest) {
    try {   
        const reqBody = await req.json();
        let {prompt} = reqBody
        const requestConfig = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}` 
            }
          };
        
          const requestData = {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant."
              },
              {
                role: "user",
                content: prompt
              },             
            ]
          };
          const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, requestConfig);
          
          return NextResponse.json(response.data);
  
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: "An error occurred while processing the request." }, 
            { status: 500 } 
        );
    }
}