# ⚙️ tech-prd.md

## Technical Requirements Document (Architecture + Stack)

---

## 🧠 Project Name:

NextFlow – AI Workflow Builder

---

## 🎯 Technical Objective:

Build a scalable, modular, and production-ready full-stack application for creating and executing AI workflows using a node-based architecture.

The system must support:

* Real-time UI interactions
* Asynchronous workflow execution
* Secure API handling
* Scalable backend processing

---

## 🏗️ High-Level Architecture

```text
Frontend (React)
   ↓
Backend API (Node.js)
   ↓
Execution Layer (Trigger.dev)
   ↓
External Services (OpenRouter, Cloudinary, FFmpeg)
```

---

## 🧩 System Components

---

### 1. Frontend Application

#### Tech Stack:

* React.js
* Tailwind CSS
* React Flow

---

#### Responsibilities:

* Render UI (nodes, canvas, sidebars)
* Manage client-side state
* Handle drag & drop interactions
* Send workflow data to backend
* Display execution results

---

#### Key Modules:

* Node Components
* Canvas (React Flow)
* Sidebar Components
* State Management Store

---

### 2. Backend Application

#### Tech Stack:

* Node.js
* Express.js

---

#### Responsibilities:

* Handle API requests
* Execute workflows
* Manage authentication (via Clerk)
* Integrate external APIs
* Process node logic

---

#### API Structure:

```text
POST /api/workflow/run
POST /api/ai/run
POST /api/upload
GET  /api/history
```

---

### 3. Workflow Execution Engine

#### Core Concept:

Node-based execution system

---

#### Responsibilities:

* Parse workflow JSON
* Traverse nodes in order
* Execute each node
* Pass output to next node

---

#### Execution Flow:

```text
1. Receive workflow JSON
2. Sort nodes (topological order)
3. Execute node one-by-one
4. Store intermediate results
5. Return final output
```

---

### 4. Asynchronous Processing Layer

#### Tool:

* Trigger.dev

---

#### Responsibilities:

* Run background jobs
* Handle long-running tasks:

  * AI processing
  * Image/video processing
* Retry failed jobs
* Track job status

---

### 5. AI Integration Layer

#### Tool:

* OpenRouter API

---

#### Responsibilities:

* Handle LLM requests
* Support multiple models
* Process:

  * Text input
  * Multimodal input (text + image)

---

#### Request Flow:

```text
Frontend → Backend → OpenRouter → Response → Backend → Frontend
```

---

### 6. Media Processing Layer

#### Tools:

* Cloudinary (upload & storage)
* FFmpeg (processing via backend / Trigger.dev)

---

#### Responsibilities:

* Upload images/videos
* Generate URLs
* Process media:

  * Crop image
  * Extract video frames

---

### 7. Authentication System

#### Tool:

* Clerk

---

#### Responsibilities:

* User authentication
* Session management
* Secure routes
* User-specific data isolation

---

### 8. State Management

#### Options:

* Zustand (preferred)
* React Context API

---

#### Responsibilities:

* Manage:

  * Nodes
  * Edges
  * Workflow state
  * Execution state

---

## 🧱 Data Structures

---

### Workflow JSON Structure:

```json
{
  "nodes": [
    {
      "id": "1",
      "type": "text",
      "data": { "value": "Hello AI" }
    },
    {
      "id": "2",
      "type": "llm",
      "data": { "prompt": "{{1}}" }
    }
  ],
  "edges": [
    { "source": "1", "target": "2" }
  ]
}
```

---

### Execution Result:

```json
{
  "status": "success",
  "output": "AI response here",
  "logs": []
}
```

---

## 🔐 Environment Variables

```env
OPENROUTER_API_KEY=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
TRIGGER_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 🔁 Data Flow

```text
User Action → UI Event → State Update → API Call → Backend Processing → External API → Response → UI Update
```

---

## ⚡ Performance Optimization

* Lazy loading components
* Memoization (React.memo, useMemo)
* Debouncing inputs
* Minimize re-renders
* Efficient state updates

---

## 🛡️ Security Considerations

* Do not expose API keys in frontend
* Use environment variables
* Validate all inputs
* Implement rate limiting
* Secure API routes

---

## 📂 Folder Structure

```text
src/
 ├── components/
 │   ├── nodes/
 │   ├── sidebar/
 │   ├── canvas/
 │
 ├── pages/
 ├── hooks/
 ├── store/
 ├── services/
 │   ├── aiService.js
 │   ├── triggerService.js
 │
 ├── utils/
 └── api/

backend/
 ├── routes/
 ├── controllers/
 ├── services/
 ├── jobs/
 └── utils/
```

---

## 🚀 Deployment Architecture

---

### Frontend:

* Vercel

---

### Backend:

* Railway / Render

---

### Requirements:

* Environment variables configured
* CORS enabled
* API endpoints accessible

---

## 📊 Logging & Monitoring

* Log API requests
* Track workflow execution
* Monitor errors
* Maintain execution logs

---

## 🔄 Scalability Considerations

* Modular node system
* Easy addition of new node types
* Async processing support
* External API abstraction

---

## 🧠 Developer Best Practices

* Use reusable components
* Maintain separation of concerns
* Write clean and readable code
* Follow consistent naming conventions
* Keep services modular

---

## 🏁 Success Criteria

The technical implementation is successful if:

* System executes workflows correctly
* API integration works reliably
* Async tasks run without blocking UI
* Application is scalable and maintainable
* Codebase is clean and modular

---

## 💡 Notes

* Focus on backend logic clarity
* Keep architecture extensible
* Avoid tight coupling between components
* Design system for future scalability

---
