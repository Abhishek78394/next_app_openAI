import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest, res: NextResponse) {
//   try {
//     const reqBody = await req.json();
//     if (!reqBody || typeof reqBody.url !== "string") {
//       return new Response(
//         JSON.stringify({
//           error:
//             "Invalid request body. 'url' field is required and must be a string.",
//         }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }
   
//     const browser = await puppeteer.launch();
//     console.log("object")
//     const page = await browser.newPage();
//     await page.setDefaultNavigationTimeout(60000); 
//     await page.goto(reqBody.url);
//     await page.waitForSelector('[data-component="text-block"]');

//     const content: string[] = await page.evaluate(() => {
//       function extractText(element: Element): string {
//         let textContent = "";

//         textContent += element.textContent?.trim() ?? "";

//         for (let i = 0; i < element.children.length; i++) {
//           textContent += extractText(element.children[i] as Element);
//         }

//         return textContent;
//       }

//       const textBlocks = document.querySelectorAll(
//         '[data-component="text-block"]'
//       );
//       const textBlockContent: string[] = [];

//       textBlocks.forEach((textBlock) => {
//         const textContent = extractText(textBlock);
//         textBlockContent.push(textContent);
//       });

//       return textBlockContent;
//     });

//     await browser.close();
//     return NextResponse.json(content);
//   } catch (error: any) {
//     console.log("error", error)
//     if (error.message === "Unexpected end of JSON input") {
//       return NextResponse.json(
//         { error: "Invalid request body. 'url' field is required and must be a string." },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json(
//       { error: "An error occurred while scraping the website." },
//       { status: 500 }
//     );
//   }
// }


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    if (!reqBody || typeof reqBody.url !== "string") {
      return new Response(
        JSON.stringify({
          error:
            "Invalid request body. 'url' field is required and must be a string.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
   
    const response = await fetch(reqBody.url);
    const html = await response.text();
    const text = html.substring(html.indexOf('<body>') + 6, html.indexOf('</body>')); 
    const improvedText = html.replace(/<[^>]+>/g, ''); 
    return NextResponse.json(
      { data: improvedText },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error", error)
    if (error.message === "Unexpected end of JSON input") {
      return NextResponse.json(
        { error: "Invalid request body. 'url' field is required and must be a string." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An error occurred while scraping the website." },
      { status: 500 }
    );
  }
}
