# 🤖 AI FAQ Chatbot

A modern, animated AI chatbot built with Cloudflare Workers, featuring conversation memory, beautiful UI, and multiple AI provider support.

## ✨ Features

- **🧠 Conversation Memory**: Maintains context across the chat session (last 10 messages)
- **🎨 Modern Animated UI**: Glass morphism design with floating particles and smooth animations
- **⚡ Multiple AI Providers**: 
  - Primary: Cloudflare Workers AI (Llama 3.3 70B)
  - Fallback: Hugging Face API
  - Echo mode for testing
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🔄 Real-time Features**: Typing indicators, smooth message animations
- **💾 Persistent Storage**: Chat history persists during session using Durable Objects

## 🚀 Live Demo

**Deployed URL**: https://ai-faq-chatbot.tharunc072.workers.dev/

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Cloudflare account with Workers AI enabled
- Wrangler CLI

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo>
   cd ai-faq-chatbot/agents-starter
   npm install
   ```

2. **Configure Wrangler**:
   ```bash
   npx wrangler login
   ```

3. **Set up AI bindings** (optional but recommended):
   ```bash
   # Optional: Set Hugging Face API key for fallback
   npx wrangler secret put HUGGINGFACE_API_KEY
   ```

4. **Start local development**:
   ```bash
   npx wrangler dev
   ```

5. **Open your browser**:
   - Frontend: http://localhost:8787
   - The UI will automatically detect dev mode and connect to the local Worker

## 🌐 Deployment

### Deploy to Cloudflare Workers

1. **Deploy the Worker**:
   ```bash
   npx wrangler deploy
   ```

2. **Verify deployment**:
   - Check the deployed URL in the terminal output
   - Test all endpoints: GET, POST, DELETE

### Environment Configuration

The Worker uses these bindings (configured in `wrangler.jsonc`):

- **AI**: Cloudflare Workers AI binding
- **Chat**: Durable Object for conversation storage
- **ASSETS**: Static asset hosting for the UI

## 📡 API Endpoints

### `GET /api/chat`
Retrieves chat history for the current session.

**Response**:
```json
{
  "history": [
    {"role": "user", "content": "Hello"},
    {"role": "bot", "content": "Hi there! How can I help you?"}
  ]
}
```

### `POST /api/chat`
Sends a message to the AI and receives a response.

**Request**:
```json
{
  "message": "What's the weather like?"
}
```

**Response**:
```json
{
  "reply": "I don't have access to real-time weather data, but I'd be happy to help you find weather information for a specific location!"
}
```

### `DELETE /api/chat`
Clears the chat history for the current session.

**Response**: `204 No Content`

### `GET /check-hf-key`
Health check endpoint to verify Hugging Face API key configuration.

**Response**:
```json
{
  "success": true
}
```

## 🧠 AI Model Configuration

### Primary Model: Llama 3.3 70B
- **Model**: `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
- **Features**: 70B parameters, FP8 optimization for speed
- **Context**: Maintains last 10 messages for conversation memory
- **Parameters**: 
  - `max_tokens`: 1000
  - `temperature`: 0.7

### Fallback Options
1. **Hugging Face API**: Uses `google/flan-t5-small` model
2. **Echo Mode**: Returns user input with context information

## 🎨 UI Features

### Modern Design Elements
- **Glass Morphism**: Frosted glass effect with backdrop blur
- **Gradient Background**: Purple-blue gradient with animated particles
- **Smooth Animations**: Slide-in effects, typing indicators, hover states
- **Responsive Layout**: Mobile-first design with breakpoints

### Interactive Components
- **Auto-resizing Textarea**: Grows with content
- **Typing Indicators**: Animated dots during AI response
- **Message Timestamps**: Shows when each message was sent
- **Clear Chat Button**: One-click conversation reset

## 🔧 Technical Architecture

### Frontend
- **Pure HTML/CSS/JavaScript**: No framework dependencies
- **Modern CSS**: Flexbox, Grid, CSS animations, backdrop-filter
- **Responsive Design**: Mobile-first approach with media queries

### Backend
- **Cloudflare Workers**: Edge computing platform
- **Durable Objects**: Persistent storage for chat sessions
- **Workers AI**: Integrated AI inference
- **Static Assets**: Hosted UI files

### Storage
- **Durable Object Storage**: Per-session chat history
- **Session-based**: Memory resets on page refresh
- **Context Window**: Last 10 messages maintained

## 🚨 Error Handling

### AI Provider Failures
1. **Workers AI Error**: Falls back to Hugging Face API
2. **Hugging Face Error**: Falls back to echo mode
3. **Complete Failure**: Returns error message to user

### Logging
- **Structured Logging**: Detailed error information
- **Request Tracking**: Model usage and response metrics
- **Debug Information**: Context length and response quality

## 🔒 Security

- **CORS Headers**: Properly configured for cross-origin requests
- **Input Validation**: Sanitizes user input
- **Error Sanitization**: Prevents information leakage
- **Rate Limiting**: Built into Cloudflare Workers platform

## 📊 Performance

- **Edge Computing**: Sub-100ms response times globally
- **Optimized Model**: FP8 quantization for faster inference
- **Efficient Storage**: Minimal data transfer with Durable Objects
- **Caching**: Static assets cached at edge locations

## 🧪 Testing

### Manual Testing
1. **Start conversation**: Send initial message
2. **Test memory**: Ask follow-up questions
3. **Clear chat**: Use delete button
4. **Error handling**: Disconnect network to test fallbacks

### API Testing
```bash
# Test GET endpoint
curl https://ai-faq-chatbot.tharunc072.workers.dev/api/chat

# Test POST endpoint
curl -X POST https://ai-faq-chatbot.tharunc072.workers.dev/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, AI!"}'

# Test DELETE endpoint
curl -X DELETE https://ai-faq-chatbot.tharunc072.workers.dev/api/chat
```

## 📝 Development Notes

### File Structure
```
agents-starter/
├── src/
│   ├── server.ts          # Main Worker entrypoint
│   ├── ChatSession.ts     # Durable Object with AI logic
│   └── app.tsx           # React UI (alternative)
├── public/
│   └── index.html        # Modern HTML UI
├── wrangler.jsonc        # Cloudflare configuration
└── README.md            # This file
```

### Key Dependencies
- **@cloudflare/workers-types**: TypeScript definitions
- **Wrangler**: Development and deployment tool
- **No external AI SDKs**: Uses native Workers AI binding

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npx wrangler dev`
5. Deploy and test: `npx wrangler deploy`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Cloudflare Workers**: Edge computing platform
- **Meta Llama**: Open-source language model
- **Hugging Face**: AI model hosting and APIs
- **Modern CSS**: Glass morphism and animation techniques

---

**Built with ❤️ using Cloudflare Workers AI**