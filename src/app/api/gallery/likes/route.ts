export const runtime = "edge";

export async function GET() {
  try {
    return new Response(JSON.stringify({ success: true, likes: { "1": 10, "2": 20 } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 });
  }
}
