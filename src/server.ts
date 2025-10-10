import { ChatSession } from "./ChatSession";

// Export the Durable Object class so Wrangler can bind it
export { ChatSession as Chat };

// The main Worker entrypoint
export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    } as const;

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Health check endpoint
    if (url.pathname === "/check-hf-key") {
      return new Response(
        JSON.stringify({ success: !!env.HUGGINGFACE_API_KEY }),
        {
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    // Route chat API to Durable Object
    if (url.pathname === "/api/chat") {
      const id = env.Chat.idFromName("default");
      const obj = env.Chat.get(id);
      const resp = await obj.fetch(
        new Request(new URL("/", url).toString(), request)
      );
      const headers = new Headers(resp.headers);
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
      headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      return new Response(resp.body, { status: resp.status, headers });
    }

    // Serve static assets (SPA) for all non-API routes
    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404, headers: corsHeaders });
  }
};
