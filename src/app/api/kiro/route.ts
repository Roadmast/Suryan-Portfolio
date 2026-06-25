export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      // Mock response if API key is not configured
      return new Response(
        JSON.stringify({
          reply: `[MOCK LINCH]: The GROQ_API_KEY is not configured yet. You asked: "${message}". In a production environment, I would answer this using LLaMA 3.3 70B!`,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are Surya's personal AI assistant, embedded in his developer portfolio. Your job is to answer questions concisely, professionally, and creatively about his background, skills, projects, and availability.

CONTEXT ABOUT SURYA:
- Role: Gen AI Engineer / AI Developer
- Experience: 
  * ALLCOGNIX AI (Gen AI Engineer, Apr 2025-Present): Led a team of 7, built AI SaaS platforms (personalized learning, multi-channel customer support automating 70% queries, AI call centers), implemented SSO.
  * WebMobi360 (AI/ML Engineer Intern, Sep 2024-Jan 2025): Implemented CV for identity verification (98% accuracy), deep learning for behavior monitoring, real-time STT/TTS interview analysis, LLM question generation.
- Education: B.Tech in AI & Data Science from NBKRIST (2020-2024).
- Key Skills: Python, FastAPI, RAG, Multi-Agent Systems (LangGraph, CrewAI), LangChain, LlamaIndex, PostgreSQL, Vector DBs, Redis, Docker, Microservices, Keycloak, OpenCV, PyTorch.
- Key Projects: Multilindo Image Craft (SDXL, 192K+ HF visitors), Voice AI Automation (LiveKit), AI Tutoring Platform, Multi-Channel Support, AI Music Streamer (24/7 YouTube), AI Job Prep Suite, AI Interview Proctor, Cloud LLM Infra (vLLM).

Answer in a friendly, helpful, and concise manner, always acting as his representative. Keep responses engaging and directly relevant to the user's query.`
          },
          { role: "user", content: message },
        ],
        temperature: 0.6,
        max_tokens: 300,
      }),
    });

    if (!groqRes.ok) {
      const errorText = await groqRes.text();
      throw new Error(`Groq API error: ${errorText}`);
    }

    const data = await groqRes.json();
    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("LINCH API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
