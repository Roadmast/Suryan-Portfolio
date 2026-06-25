export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return new Response(JSON.stringify({ success: true, message: "Mock Like Added" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 });
  }
}
