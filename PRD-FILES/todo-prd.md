# 📝 todo-prd.md

## Execution Plan: NextFlow – AI Workflow Builder

This document provides a step-by-step Execution Plan to build the NextFlow project. It ensures a strict **one-feature-at-a-time** development approach, breaking the work into logical phases, manageable modules, and atomic tasks. 

**Rule of Thumb:** Focus ONLY on the atomic tasks belonging to the current module. Do not attempt to write the full project code at once. Always verify functionality and commit changes before moving to the next module.

---

## Phase 1: Foundation & Project Setup

### Module 1.1: Project Initialization
**Folder Structure Focus:** Root level, basic configuration files.
**Tasks:**
- [ ] Initialize Git repository (`git init`).
- [ ] Setup Frontend: Initialize React project using Vite (`frontend/`) and install Tailwind CSS.
- [ ] Setup Backend: Initialize Node.js/Express project (`backend/`).
- [ ] Configure Environment Variables: Create `.env` files for both frontend and backend configurations.
- [ ] Setup basic folder structures (`frontend/src/components`, `frontend/src/pages`, `backend/routes`, `backend/controllers`).
**Git Checkpoint:** 
`git add . && git commit -m "chore: initial project setup for frontend and backend"`

### Module 1.2: Authentication System (Clerk)
**Folder Structure Focus:** `frontend/src/components/auth`, `frontend/src/pages/Login`, `backend/middleware/authMiddleware.js`.
**Tasks:**
- [ ] Integrate Clerk SDK in Frontend and wrap application in `<ClerkProvider>`.
- [ ] Create basic Login and User Registration component pages.
- [ ] Implement protected frontend routing (only allow logged-in users to access the Workflow Builder).
- [ ] Build backend middleware to verify Clerk tokens for secure API communication.
**Git Checkpoint:** 
`git add . && git commit -m "feat: implement clerk authentication and secure routes"`

---

## Phase 2: Workflow Builder (Frontend Core)

### Module 2.1: Canvas Layout & React Flow Setup
**Folder Structure Focus:** `frontend/src/components/layout/`, `frontend/src/components/canvas/`.
**Tasks:**
- [ ] Install and configure `reactflow`.
- [ ] Implement the main 3-column layout structure (Left Sidebar, Main Canvas, Right Sidebar).
- [ ] Initialize React Flow Canvas with a dot pattern dark/light grid background.
- [ ] Add default Zoom controls and a React Flow MiniMap inside the canvas.
**Git Checkpoint:** 
`git add . && git commit -m "feat: setup 3-column layout and react flow canvas"`

### Module 2.2: Node Management & Custom Node UI
**Folder Structure Focus:** `frontend/src/components/nodes/`, `frontend/src/components/sidebar/LeftSidebar.jsx`.
**Tasks:**
- [ ] Create the base **Node Container Component** (Header, Content, Input/Output Ports mapping to left/right).
- [ ] Build custom UI for the **Text Node** (textarea).
- [ ] Build custom UI for the **LLM Node** (inputFields for user/system prompt).
- [ ] Populate the Left Sidebar with draggable node templates.
- [ ] Implement drag-and-drop mechanics to instantiate a new node on the Main Canvas.
**Git Checkpoint:** 
`git add . && git commit -m "feat: custom node ui and drag-and-drop node creation"`

### Module 2.3: Edge Connections & State Management
**Folder Structure Focus:** `frontend/src/store/workflowStore.js`
**Tasks:**
- [ ] Initialize Zustand store for global application state.
- [ ] Track `nodes` and `edges` arrays within the Zustand store.
- [ ] Enable connecting two nodes via their Input/Output circular ports.
- [ ] Implement features to select, edit, and delete nodes and edges seamlessly.
**Git Checkpoint:** 
`git add . && git commit -m "feat: node connections, edge management and zustand store"`

---

## Phase 3: Backend API & Workflow Storage

### Module 3.1: Workflow Persistence API
**Folder Structure Focus:** `backend/routes/workflowRoutes.js`, `backend/controllers/workflowController.js`.
**Tasks:**
- [ ] Architect workflow state JSON structure mapping.
- [ ] Create `POST /api/workflow/save` to store user-specific workflow node/edge state.
- [ ] Create `GET /api/workflow/history` to load saved workflows.
- [ ] Add UI save/load buttons linked to state management.
**Git Checkpoint:** 
`git add . && git commit -m "feat: backend workflow persistence and ui save loads"`

---

## Phase 4: External Services & API Integrations

### Module 4.1: OpenRouter AI Integration
**Folder Structure Focus:** `backend/routes/aiRoutes.js`, `backend/services/aiService.js`.
**Tasks:**
- [ ] Setup OpenRouter API connection within the backend.
- [ ] Create `POST /api/ai/run` specifically for LLM Node logic.
- [ ] Ensure text prompt formatting works properly before passing it to OpenRouter.
**Git Checkpoint:** 
`git add . && git commit -m "feat: OpenRouter integration for LLM requests"`

### Module 4.2: Media Processing (Cloudinary)
**Folder Structure Focus:** `backend/routes/uploadRoutes.js`, `backend/services/mediaService.js`.
**Tasks:**
- [ ] Integrate Cloudinary for handling file uploads.
- [ ] Build custom UI for **Upload Image Node** & **Upload Video Node**.
- [ ] Create `POST /api/upload` endpoint, returning the hosted media URL.
**Git Checkpoint:** 
`git add . && git commit -m "feat: media upload nodes and cloudinary endpoints"`

---

## Phase 5: Workflow Execution Engine

### Module 5.1: Execution Logic & Topological Flow
**Folder Structure Focus:** `backend/services/executionEngine.js`
**Tasks:**
- [ ] Interpret the saved workflow JSON (`nodes`, `edges`).
- [ ] Build a Topological Sort algorithm to determine correct node execution order.
- [ ] Develop data transfer logic (Input Chaining) passing an output from Node A efficiently into the payload for Node B.
**Git Checkpoint:** 
`git add . && git commit -m "feat: topological sorting and execution sequence mapping"`

### Module 5.2: Asynchronous Trigger.dev Layer
**Folder Structure Focus:** `backend/jobs/`, `frontend/src/components/sidebar/RightSidebar.jsx`.
**Tasks:**
- [ ] Integrate Trigger.dev to wrap execution runs in background jobs.
- [ ] Add execution statuses tracking (Pending, Running, Success, Failed) per node.
- [ ] Populate the **Right Sidebar** with Execution History logs, success/fail badges, and timestamps.
- [ ] Add output preview logic in the Right Sidebar based on execution completion.
**Git Checkpoint:** 
`git add . && git commit -m "feat: background execution tracking via trigger.dev and right sidebar ui"`

---

## Phase 6: Polish & Deployment

### Module 6.1: UX Polish & Error Handling
**Folder Structure Focus:** Wide coverage across `frontend/src/`.
**Tasks:**
- [ ] Introduce granular error handling (e.g., catching API failures or invalid node connections) with friendly user toasts/messages.
- [ ] Refine Micro-interactions: Button hover transitions, input focus glows, smooth sidebar collapsing.
- [ ] Validate responsive layouts on main viewpoints.
**Git Checkpoint:** 
`git add . && git commit -m "chore: ux polish and comprehensive error handling"`

### Module 6.2: Final Deployment
**Folder Structure Focus:** Root configuration files (`vercel.json`, `render.yaml`, env configurations).
**Tasks:**
- [ ] Deploy Frontend Application via Vercel.
- [ ] Deploy Backend Application via Vercel.
- [ ] Connect production Database & configure live API external tokens (OpenRouter, Cloudinary, Clerk).
- [ ] Run End-to-End sanity test over Live URLs.
**Git Checkpoint:** 
`git add . && git commit -m "chore: production deployment settings and go-live"`
