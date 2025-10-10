# 🤖 AI Prompts Documentation

This document contains all AI prompts and system messages used in the AI FAQ Chatbot project.

## 📋 Table of Contents

1. [System Prompt](#system-prompt)
2. [User Prompts](#user-prompts)
3. [Project Guidance Prompts](#project-guidance-prompts)
4. [Development Prompts](#development-prompts)
5. [Model Configuration](#model-configuration)

---

## 🎯 System Prompt

**Location:** `src/ChatSession.ts` - Line 89

**Prompt:**

```
You are a helpful AI assistant with excellent memory and context awareness. You have access to the conversation history and can reference previous messages for context. Be conversational, engaging, and remember what was discussed earlier in this chat session. Provide detailed, helpful responses while maintaining a friendly tone.
```

**Purpose:**

- Define AI personality and capabilities
- Emphasize memory and context awareness
- Instruct the model to reference conversation history

**Model:** `@cf/meta/llama-3.3-70b-instruct-fp8-fast`

**Parameters:**

- `max_tokens`: 1000
- `temperature`: 0.7
- `context_window`: Last 10 messages

---

## 👤 User Prompts

- **Initial Development Request**
  **Prompt:**

  ```
  Hi
  @https://ai-faq-chatbot.tharunc072.workers.dev/
  {"history":[]}
  Only this is visible here...can you deploy the whole project
  ```

  **Context:** User requested full project deployment.

- **Project Fix Request**
  **Prompt:**

  ```
  Whats the error here...why is it not working?
  ```

  **Context:** Debugging chat interface issues.

- **Memory Enhancement Request**
  **Prompt:**

  ```
  Is it possible to add memory to the bot...like when I ask a question and follow up it doesn't understand the context? Can you add memory just for that chat session...once refreshed a new memory is okay every time...also make the UI really cool and modern...add any graphics or motion animation or anything cool
  ```

  **Requirements:**
  - Session-based memory for context
  - Memory resets on page refresh
  - Modern, animated UI with graphics

- **Final Enhancement Request**
  **Prompt:**

  ```
  Tasks:
  1. Change AI model to use `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
  2. Ensure `ChatSession` maintains last 10 messages
  3. Keep fallback options (Hugging Face API, echo)
  4. Add error logging
  5. Ensure GET, POST, DELETE endpoints work
  6. Preserve modern UI features
  7. Prepare README.md and PROMPTS.md
  ```

---

## 📝 Project Guidance Prompts

- **Prompt:** How do I create an AI FAQ Chatbot project with Cloudflare Workers AI?
  **Purpose:** Initial project conception guidance
  **Outcome:** Defined project structure, stack, and tools

- **Prompt:** How do I add session-based memory for AI chat?
  **Purpose:** Guidance on context-aware memory
  **Outcome:** Implemented Durable Objects to store last 10 messages per session

- **Prompt:** How can I make the UI modern, animated, and responsive?
  **Purpose:** UI/UX enhancement guidance
  **Outcome:** Added animated particles, glass morphism, sliding messages, gradients, responsive design

- **Prompt:** How do I integrate Workers AI with Llama 3.3?
  **Purpose:** Model integration guidance
  **Outcome:** Switched primary AI model to `@cf/meta/llama-3.3-70b-instruct-fp8-fast`

- **Prompt:** What fallback options should I include if Workers AI fails?
  **Purpose:** Reliability and error handling
  **Outcome:** Added Hugging Face API and echo mode fallback

- **Prompt:** How should I document all AI prompts used?
  **Purpose:** Project submission documentation
  **Outcome:** Created PROMPTS.md and README.md with system messages and development prompts

---

## 🛠️ Development Prompts

- **Initial Setup Prompt:** Scan config and entrypoints to prepare deploy steps
- **Memory Implementation Prompt:** Add session-based memory (last 10 messages) with `ChatSession`
- **UI Enhancement Prompt:** Modern, animated UI with motion graphics
- **Model Upgrade Prompt:** Switch to `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
- **Fallback Implementation Prompt:** Add Hugging Face API and echo mode fallback
- **Error Logging Prompt:** Add structured logging for errors and AI usage
- **Debugging Prompt:** Scan project for errors preventing chat functionality
- **Deployment Query Prompt:** Confirm full project deployment
- **Documentation Prompt:** Add all AI prompts used to PROMPTS.md
- **Project Completion Summary Prompt:** Summarize memory, UI, model, fallback, and testing

---

## ⚙️ Model Configuration

- **Workers AI Model:** `@cf/meta/llama-3.3-70b-instruct-fp8-fast`

- **Parameters:**

  ```javascript
  {
    messages: [
      { role: "system", content: "You are a helpful AI assistant with excellent memory..." },
      // last 10 messages in conversation
    ],
    max_tokens: 1000,
    temperature: 0.7
  }
  ```

- **Context Management:** Last 10 messages preserved per session

- **Fallback Model (Hugging Face):** `google/flan-t5-small`

- **Echo Mode (Final Fallback):** `You said: ${userMessage} (Previous context: ...)`
