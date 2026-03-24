# 🎨 design-prd.md

## Design Requirements Document (UI/UX + Visual System)

---

## 🧠 Project Name:

NextFlow – AI Workflow Builder

---

## 🎯 Design Objective:

Create a **pixel-perfect, modern, and professional UI** for a node-based AI workflow builder inspired by tools like Krea.ai, n8n, and Notion.

The design should focus on:

* Clean layout
* Smooth interactions
* Intuitive user experience
* Developer-friendly workflow visualization

---

## 🧩 Layout Structure

The application layout must follow a **3-column structure**:

```
[ Left Sidebar ]   [ Main Canvas ]   [ Right Sidebar ]
```

---

### 1. Left Sidebar (Node Library)

**Purpose:**
Display all available nodes for workflow creation.

**Design Requirements:**

* Fixed width (~260px)
* Collapsible sidebar
* Scrollable content
* Search bar at top

**Components:**

* Search input
* Node list (cards/buttons)

**Node Item Style:**

* Rounded corners (8px–12px)
* Icon + Label
* Hover effect (background highlight)
* Drag indicator cursor

---

### 2. Main Canvas (Workflow Area)

**Purpose:**
Primary area where workflows are built.

**Design Requirements:**

* Full width flexible area
* Dark/light grid background (dot pattern)
* Smooth zoom and pan

**Features UI:**

* Drag & drop nodes
* Connection lines (edges)
* MiniMap (bottom corner)
* Zoom controls

---

### 3. Right Sidebar (Execution Panel)

**Purpose:**
Display workflow execution history and outputs.

**Design Requirements:**

* Fixed width (~300px)
* Scrollable
* Clean card-based layout

**Components:**

* Execution list
* Status badges (Success / Failed)
* Timestamp
* Output preview

---

## 🧱 Node Design System

All nodes must follow a **consistent card design system**.

---

### Node Container Style:

* Background: white / dark gray
* Border radius: 12px
* Padding: 12px–16px
* Shadow: subtle elevation
* Border: light gray

---

### Node Structure:

```
[ Header ]
[ Content ]
[ Input / Output Ports ]
```

---

### Header:

* Node title
* Icon
* Optional actions (delete/edit)

---

### Content:

Depends on node type:

* Textarea (Text Node)
* Upload preview (Image/Video)
* Input fields (LLM Node)

---

### Ports:

* Left side → Input
* Right side → Output
* Circular connectors

---

## 🎨 Color System

### Primary Colors:

* Primary: #6366F1 (Indigo)
* Secondary: #8B5CF6 (Purple)

---

### Neutral Colors:

* Background: #F9FAFB
* Surface: #FFFFFF
* Border: #E5E7EB
* Text Primary: #111827
* Text Secondary: #6B7280

---

### Status Colors:

* Success: #22C55E (Green)
* Error: #EF4444 (Red)
* Warning: #F59E0B (Yellow)

---

## 🔤 Typography

### Font Family:

* Inter (preferred)

---

### Font Sizes:

* Heading: 18px–20px
* Subheading: 14px–16px
* Body: 12px–14px

---

### Font Weight:

* Bold: headings
* Medium: labels
* Regular: body text

---

## 🧭 Spacing System

Use consistent spacing scale:

* 4px
* 8px
* 12px
* 16px
* 24px
* 32px

---

## 🎛️ UI Components

---

### Buttons:

* Rounded (8px)
* Primary & Secondary variants
* Hover + active states

---

### Inputs:

* Rounded borders
* Focus outline (primary color)
* Placeholder text

---

### Cards:

* Soft shadow
* Padding
* Rounded corners

---

### Modals:

* Centered
* Backdrop blur
* Close button

---

## 🎬 Animations & Interactions

---

### Required Animations:

* Smooth node dragging
* Hover effects on nodes
* Sidebar collapse animation
* Button hover transitions

---

### Micro Interactions:

* Click feedback
* Input focus glow
* Loading spinner

---

## 📱 Responsiveness

---

### Desktop (Primary Focus):

* Full 3-column layout

---

### Tablet:

* Sidebar collapsible
* Adjust spacing

---

### Mobile (Optional):

* Limited support
* Stack layout

---

## 🌗 Theme Support (Optional)

---

### Light Mode:

* White background
* Dark text

---

### Dark Mode:

* Dark background
* Light text

---

## ⚠️ UX Guidelines

---

### Must Follow:

* Clear visual hierarchy
* Minimal clutter
* Fast interactions
* Consistent spacing

---

### Avoid:

* Overloaded UI
* Inconsistent spacing
* Complex navigation

---

## 🧠 Design Principles

---

### 1. Simplicity

Keep UI clean and minimal.

---

### 2. Consistency

All components must follow same design rules.

---

### 3. Feedback

User actions must have visual feedback.

---

### 4. Clarity

Every element should have a clear purpose.

---

## 🏁 Success Criteria

The design will be considered successful if:

* UI looks modern and clean
* Workflow building feels intuitive
* Nodes are easy to use
* Layout is well-structured
* Interactions are smooth

---

## 💡 Notes

* Focus on usability first, then aesthetics
* Maintain pixel-level consistency
* Follow modern SaaS UI patterns
* Ensure design is scalable for future features

---
