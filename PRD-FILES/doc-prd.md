# 🚀 doc-prd.md

## Product Requirements Document (Features Only)

---

## 🧠 Project Name:

NextFlow – AI Workflow Builder

---

## 🎯 Objective:

Build a node-based AI workflow builder that allows users to visually create, connect, and execute LLM-powered workflows using a drag-and-drop interface.

The system should support multimodal inputs (text, image, video) and enable users to process them through different nodes to generate outputs.

---

## 👥 Target Users:

* Developers
* AI enthusiasts
* Automation builders
* No-code / low-code users

---

## 🧩 Core Functional Features

---

### 1. Authentication System

The system must provide secure user authentication.

**Features:**

* User Signup
* User Login
* Session persistence
* Protected routes
* User-specific data (each user sees only their workflows)

---

### 2. Workflow Builder (Main Module)

The application must allow users to create workflows visually.

**Features:**

* Create workflow using nodes
* Connect nodes using edges
* Edit and delete nodes
* Save workflow structure
* Execute workflow

---

### 3. Node Management System

Users must be able to use different types of nodes to build workflows.

**Supported Node Types:**

#### 3.1 Text Node

* Accept user text input
* Output: text data

---

#### 3.2 Upload Image Node

* Upload an image
* Preview uploaded image
* Output: image URL

---

#### 3.3 Upload Video Node

* Upload a video
* Preview video
* Output: video URL

---

#### 3.4 Run LLM Node (Core Feature)

* Accept input from previous nodes
* Allow user to provide:

  * System prompt
  * User prompt
* Process input using AI model
* Output: generated response

---

#### 3.5 Crop Image Node

* Accept image input
* Allow user to define crop parameters:

  * X position
  * Y position
  * Width
  * Height
* Output: cropped image

---

#### 3.6 Extract Frame Node

* Accept video input
* Extract frame from video
* Output: image

---

### 4. Workflow Execution Engine

The system must process workflows dynamically.

**Features:**

* Execute nodes in correct order
* Pass data between connected nodes
* Support multiple inputs for a node
* Handle execution flow automatically

---

### 5. Input Chaining System

The system must support combining inputs from multiple nodes.

**Features:**

* Merge inputs (e.g., text + image)
* Pass combined data to next node
* Ensure correct mapping of inputs

---

### 6. Workflow History

The system must track workflow executions.

**Features:**

* Store execution history
* Show execution status (success / failure)
* Show timestamps
* Display output preview

---

### 7. Error Handling System

The system must handle errors gracefully.

**Features:**

* Handle invalid connections
* Handle execution failures
* Handle API errors
* Show user-friendly error messages

---

### 8. State Management

The system must manage application state efficiently.

**Features:**

* Store nodes and edges
* Maintain workflow data
* Track execution state

---

### 9. Workflow Persistence

Users must be able to store and reuse workflows.

**Features:**

* Save workflows
* Load existing workflows
* Maintain user-specific workflow data

---

### 10. Performance Requirements

The system must remain responsive during usage.

**Features:**

* Fast node interactions
* Efficient data updates
* Smooth workflow execution

---

### 11. Deployment Requirements

The system must be deployable and accessible online.

**Features:**

* Working live application
* Backend connectivity
* Proper environment configuration

---

### 12. Deliverables

The final submission must include:

* Live deployed project
* Source code repository
* Documentation including:

  * Setup instructions
  * Feature explanation

---

### 13. Optional Features (Bonus)

These features are not mandatory but can improve the project:

* Export workflow as JSON
* Import workflow
* Undo / Redo functionality
* Dark mode
* Real-time collaboration

---

## 🏁 Success Criteria

The project will be considered successful if:

* Users can create and execute workflows
* All node types function correctly
* Data flows correctly between nodes
* Execution results are accurate
* System handles errors properly
* Application is stable and usable

---

## 💡 Notes

* Focus on functionality first, then enhancements
* Ensure modular and scalable structure
* Design and technology details will be defined in separate PRDs

---
