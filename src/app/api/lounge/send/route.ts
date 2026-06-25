export const runtime = "edge";

export async function POST() {
  try {
    return new Response(JSON.stringify({ success: true, message: "Mock Lounge Message Sent" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 });
  }
}
