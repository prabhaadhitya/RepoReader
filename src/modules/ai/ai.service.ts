// import OpenAI from 'openai'
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Explanation, TechStackItem } from "@/types";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

async function generateWithRetry(prompt: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result?.response?.text?.() || "{}";
    } catch (error: any) {
      const isRateLimit = error?.message?.includes("429");
      if (isRateLimit && i < retries - 1) {
        console.log(`Rate limited. Waiting 30 seconds before retry ${i + 1}...`);
        await new Promise(res => setTimeout(res, 30000)); // wait 30 seconds
      } else {
        throw error;
      }
    }
  }
  return "{}";
}

export const aiService = {

    async generateExplanation(input: {
        repoName: string;
        description: string;
        folderTree: string[];
        packageJson: string | null;
        techStack: string[],
        difficulty: string,
    }): Promise<Explanation> {
        const prompt = `
            You are a senior software engineer explaining a GitHub repository to a beginner.

            Repository Name: ${input.repoName}
            Description: ${input.description}
            Folder Structure:
            ${input.folderTree.join("\n")}
            package.json: ${input.packageJson ?? "Not available"}
            Tech Stack: ${input.techStack?.join(", ") ?? "Unknown"}
            Difficulty: ${input.difficulty ?? "Unknown"}

            Return ONLY a valid JSON object (no markdown, no backticks) with this exact shape:
            {
                "what": "1-2 sentences about what this project does",
                "who": "1-2 sentences about who it is for",
                "features": ["feature 1", "feature 2", "feature 3"],
                "techStack": [
                    { "name": "React", "description": "Used to build the user interface" }
                ]
            }

            Return only JSON. No extra text.
            `.trim();
        
        // const completion = await openai.chat.completions.create({
        //     model: "gpt-4.1-mini",
        //     messages: [
        //         { role: "system", content: "You are a helpful coding mentor." },
        //         { role: "user", content: prompt }
        //     ],
        //     temperature: 0.3,            
        // });
        
        // const result = await model.generateContent(prompt);
        // return completion.choices[0].message.content;   
        // return result.response.text(); 
        // return safeText(result);
        // const text = result?.response?.text?.() || "{}";

        // const text = await generateWithRetry(prompt);
        const result = await model.generateContent(prompt);
        const text = result?.response?.text?.() || "{}";
        try {
            const clean = text.replace(/```json|```/g, "").trim();
            return JSON.parse(clean);
        } catch {
            return {
                what: text.slice(0, 300),
                who: "Developers looking to use this project.",
                features: ["See the repository for details."],
                techStack: input.techStack.map((t) => ({ name: t, description: "" })),
            };
        }
    },

    async generateReadme(data: {
        repoName: string;
        explanation: Explanation;
        folderTree: string[];
        packageJson: string | null;
    }): Promise<string> {
        const prompt = `
            Generate a professional README.md.

            Project: ${data.repoName}
            What it does: ${data.explanation.what}
            Who it is for: ${data.explanation.who}
            Features: ${data.explanation.features?.join(", ")}
            Tech Stack: ${data.explanation.techStack?.map((t: any) => t.name).join(", ")}
            Folder Tree: ${data.folderTree.join("\n")}
            package.json: ${data.packageJson ?? "Not available"}

            
            Rules:
            - Beginner friendly
            - Clear installation steps
            - Include Tech Stack
            - Include Usage
            - No emojis
            - Clean markdown
        `.trim();

        // const completion = openai.chat.completions.create({
        //     model: "gpt-4.1-mini",
        //     messages: [
        //         { role: "system", content: "You write professional READMEs." },
        //         { role: "user", content: prompt },
        //     ],
        //     temperature: 0.2,
        // });
        
        // const result = await model.generateContent(prompt);

        // return (await completion).choices[0].message.content;
        // return result.response.text();
        // return safeText(result);
        // return await generateWithRetry(prompt);
        const result = await model.generateContent(prompt);
        return result?.response?.text?.() || "Could not generate README.";
    },

}    