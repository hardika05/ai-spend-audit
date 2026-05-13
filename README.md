# 💸 AI Spend Audit

An AI-powered tool to analyze and optimize spending on AI tools like ChatGPT, Claude, and GitHub Copilot.

🔗 Live Demo: https://ai-spend-audit-theta-two.vercel.app  
📦 GitHub Repo: https://github.com/hardika05/ai-spend-audit

---

## 🚀 Features

- 📊 Analyze AI tool usage and spending
- 💡 Smart recommendations to reduce cost
- 💰 Estimated savings calculation
- ⚡ Efficiency score with visual progress bar
- 🧠 Clean and modern SaaS-style UI
- 🔄 Data persistence using localStorage
- ☁️ Backend powered by Supabase
- Implemented honeypot field for bot prevention due to low friction and zero UX impact.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS  
- **Backend:** Supabase (Database)  
- **Deployment:** Vercel  

---

## 📸 Screenshots

(Add screenshots here after upload)

---

## ⚙️ How It Works

1. User fills in:
   - Tool (ChatGPT, Claude, etc.)
   - Plan type
   - Monthly spend
   - Seats & team size
   - Use case

2. Data is stored in Supabase

3. App analyzes:
   - Overpaid seats
   - Usage mismatch
   - Optimization opportunities

4. Displays:
   - Recommendations
   - Savings estimate
   - Efficiency score

---

## 📂 Project Structure


app/
├── audit/
│ └── page.tsx
components/
└── Result.tsx
lib/
└── supabase.ts

---

## 🧪 Validation & UX Improvements

- Form validation with inline error messages
- Loading state on submission
- Success feedback after audit generation
- Disabled button during processing
- Clean input UI (no browser autofill distractions)

---

## 📈 Future Improvements

- 🤖 AI-generated recommendations using OpenAI API
- 📊 Charts & analytics dashboard
- 📥 Export report (PDF)
- 🔐 User authentication
- 📧 Email report delivery

---

## 🧠 Learnings

- Built full-stack app using Next.js + Supabase  
- Improved UI/UX with Tailwind  
- Handled real-world form validation & state management  
- Deployed production-ready app on Vercel  

---

## 🙌 Author

**Hardika Shinde**  
🔗 https://github.com/hardika05

---
