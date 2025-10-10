export class ChatSession {
  state: DurableObjectState;
  storage: DurableObjectStorage;
  // biome-ignore lint/suspicious/noExplicitAny: Env is provided by Workers runtime
  env: any;

  // DO constructor receives (state, env) in module syntax
  // https://developers.cloudflare.com/durable-objects/reference/javascript-classes/#constructor
  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.storage = state.storage;
    this.env = env;
  }

  async fetch(request: Request) {
    const env = this.env;
    try {
      // Clear history
      if (request.method === "DELETE") {
        await this.storage.delete("history");
        return new Response(null, { status: 204 });
      }

      if (request.method === "POST") {
        const data = (await request.json()) as { message?: string } | unknown;
        const userMessage =
          typeof data === "object" && data && "message" in data
            ? (data as any).message
            : undefined;

        if (typeof userMessage !== "string") {
          return new Response(JSON.stringify({ error: "Invalid request body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Get chat history from storage
        const history = (await this.storage.get<any[]>("history")) || [];
        history.push({ role: "user", content: userMessage });

        // Default bot reply
        let botReply = "Sorry, I didn't understand.";

        // Try providers in order: Hugging Face (if key), then Workers AI (if binding), then fallback
        const tryProvidersInOrder = async () => {
          // 1) Hugging Face if key is present
          if (env.HUGGINGFACE_API_KEY) {
            try {
              const hfResponse = await fetch(
                "https://api-inference.huggingface.co/models/google/flan-t5-small",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ inputs: userMessage }),
                }
              );
              const hfData = await hfResponse.json();
              if (
                Array.isArray(hfData) &&
                hfData.length > 0 &&
                typeof hfData[0]?.generated_text === "string"
              ) {
                return hfData[0].generated_text as string;
              } else if (hfData && typeof hfData === "object") {
                const obj = hfData as { generated_text?: string; choices?: { text?: string }[] };
                if (obj.generated_text) return obj.generated_text;
                if (Array.isArray(obj.choices) && obj.choices[0]?.text) return obj.choices[0].text as string;
              }
            } catch (err) {
              console.error("Hugging Face error:", err);
            }
          }

          // 2) Cloudflare Workers AI if binding exists
          if (env.AI && typeof env.AI.run === "function") {
            try {
              // Use a small, widely available instruct model
              const model = "@cf/meta/llama-3.1-8b-instruct";
              
              // Build conversation context with recent history
              const recentHistory = history.slice(-10); // Keep last 10 messages for context
              const messages = [
                { 
                  role: "system", 
                  content: "You are a helpful AI assistant. You have access to the conversation history and can reference previous messages for context. Be conversational and remember what was discussed earlier in this chat session." 
                }
              ];
              
              // Add conversation history
              recentHistory.forEach(msg => {
                if (msg.role === "user") {
                  messages.push({ role: "user", content: msg.content });
                } else if (msg.role === "bot") {
                  messages.push({ role: "assistant", content: msg.content });
                }
              });
              
              const result = await env.AI.run(model, { messages });
              const responseText = (result && (result.response as string)) || "";
              if (responseText.trim().length > 0) return responseText;
            } catch (err) {
              console.error("Workers AI error:", err);
            }
          }

          // 3) Fallback echo with context awareness
          const recentMessages = history.slice(-3);
          const contextInfo = recentMessages.length > 1 ? 
            ` (Previous context: ${recentMessages.slice(0, -1).map(m => `${m.role}: ${m.content}`).join(', ')})` : '';
          return `You said: ${userMessage}${contextInfo}`;
        };

        botReply = await tryProvidersInOrder();

        // Save bot reply to history
        history.push({ role: "bot", content: botReply });
        await this.storage.put("history", history);

        return new Response(JSON.stringify({ reply: botReply }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (request.method === "GET") {
        const history = (await this.storage.get("history")) || [];
        return new Response(JSON.stringify({ history }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Method not allowed for other HTTP methods
      return new Response("Method not allowed", { status: 405 });
    } catch (err) {
      console.error("ChatSession error:", err);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}
