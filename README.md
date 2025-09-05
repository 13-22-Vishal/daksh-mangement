# 🚀 Daksh Management System  

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)  
![Express](https://img.shields.io/badge/Express.js-black?logo=express)  
![SQLite](https://img.shields.io/badge/SQLite-blue?logo=sqlite)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-2.x-38BDF8?logo=tailwindcss)  
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs)  

A sleek **management dashboard** to handle **Departments, Members, Tasks, Print Logs, and Analytics** — built with **Node.js + Express + SQLite** on the backend and **TailwindCSS + Chart.js + Vanilla JS** on the frontend.  

💡 Designed for student teams, clubs, and project groups to manage everything in **one clean dashboard**.  

---

## ✨ Features  

- 🏢 **Departments** — Organize work by domains (CAD, CFD, Battery, Electronics, Marketing)  
- 👥 **Members** — Add members with specialization, department, and email  
- ✅ **Tasks** — Track assignments with status (Pending / In Progress / Completed) + Kanban board  
- 🖨️ **Print Logs** — Keep record of items printed with notes & timestamps  
- 📊 **Analytics** — Beautiful charts powered by **Chart.js**:  
  - Task completion % per department (Pie)  
  - Print activity trend over time (Line)  
- ⚡ **REST API** + **SPA frontend** with smooth navigation  

---

## 🖼️ Screenshots  

> Replace these placeholders with actual screenshots of your UI.  

| Sidebar & Dashboard | Departments View | Analytics |
|---------------------|-----------------|-----------|
| ![Sidebar](https://via.placeholder.com/300x200.png?text=Sidebar) | ![Departments](https://via.placeholder.com/300x200.png?text=Departments) | ![Analytics](https://via.placeholder.com/300x200.png?text=Analytics) |

---

## 🛠️ Tech Stack  

- **Backend:** Node.js, Express.js, better-sqlite3  
- **Frontend:** HTML5, TailwindCSS, Font Awesome, Chart.js, Vanilla JS  
- **Database:** SQLite (`vishal_manager.db`, auto-seeded from `db.sql`)  

---

## 📡 API Overview  

### Departments  
- `GET /api/departments` → List all departments  
- `POST /api/departments` → Create new department  
- `PUT /api/departments/:id` → Update department  
- `DELETE /api/departments/:id` → Delete department  

### Members  
- `GET /api/members` → List all members  
- `POST /api/members` → Add new member  
- `PUT /api/members/:id` → Update member  
- `DELETE /api/members/:id` → Delete member  

### Tasks  
- `GET /api/tasks` → List tasks  
- `POST /api/tasks` → Add new task  
- `PUT /api/tasks/:id` → Update task  
- `DELETE /api/tasks/:id` → Delete task  

### Print Logs  
- `GET /api/printlog` → View print logs (filters: department, date range)  
- `POST /api/printlog` → Add new log  

### Analytics  
- `GET /api/analytics/tasks-per-dept` → Task completion % per department  
- `GET /api/analytics/prints-over-time` → Print history over time  

---


## 📂 Project Structure 
daksh-mangement/
│
├── server.js # Express backend (APIs + DB)
├── app.js # Frontend SPA logic
├── db.sql # SQLite schema (tables + seed data)
├── public/
│ └── index.html # Tailwind + Chart.js UI
├── vishal_manager.db # Auto-generated SQLite DB
└── package.json # Node dependencies


---

## 🌟 Demo Data  

Preloaded with **Indian names & realistic team structure** for quick testing:  

- 👨‍💻 Amit Sharma — CAD Designer  
- 👩‍🔬 Priya Singh — CFD Analyst  
- 🔋 Rahul Verma — Battery Engineer  
- ⚡ Sneha Patel — Electronics Lead  
- 📢 Vikram Rao — Marketing Strategist  

---

## 📜 License  

MIT License © 2025 [Vishal Kumar](https://github.com/13-22-Vishal)  



## 📂 Project Structure  

