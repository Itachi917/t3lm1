# 🎓 Bilingual E-Learning Platform for University Students

## Overview

A responsive, bilingual (English/Arabic) e-learning web app built with React + Vite, Tailwind CSS, and Supabase (via Lovable Cloud). Designed for university students to browse lectures, study with flashcards, take quizzes, and track progress across multiple levels and subjects.

---

## 1. Authentication & User Roles

- **Sign in with Google** and **Email/Password** via Supabase Auth
- **Guest Mode** with a prominent "Continue as Guest" button — guests can browse all content but progress isn't saved
- **User Profile page** showing "My Progress" and "Last Read" lecture (logged-in users only)
- User profiles table in Supabase to store progress data, language preference, and theme preference

## 2. Navigation & Page Hierarchy

- **Landing Page** — Hero section with login options and guest entry
- **Level Selection** — Grid of cards: Level 1, Level 2, Level 3, Level 4
- **Subject Catalog** — Clicking a level shows its subjects (Level-2 pre-filled with: Web Information Systems, Fundamentals of E-Commerce, Operating Systems & Security, Computer Animation). Each subject has a distinct color.
- **Subject Dashboard** — Lists all lectures for a subject with a progress bar (0–100% based on lectures opened)
- **Lecture Room** — The core study view with tabbed content

## 3. Lecture Room (Core Feature)

Each lecture page includes four tabs:

- **Summary Notes** — Clean, formatted text of key concepts
- **Flashcards** — Interactive flip-card component for Q&A review
- **Quiz Mode** — Multiple-choice questions with instant feedback (correct/incorrect highlighting)
- **Bilingual Toggle** — EN/AR switch that translates UI text and content headings

## 4. Seed Data (Real Content)

Pre-populated with actual university content (no placeholder text):

- **Operating Systems & Security** — Lecture 1 (Intro to OS) and Lecture 2 (Processes & Threads) with full summary notes, flashcards, and quiz questions
- **Fundamentals of E-Commerce** — Lecture 2 (E-Commerce Infrastructure) with full content
- Data structure designed to easily add more levels, subjects, and lectures later

## 5. Bilingual Support (EN/AR)

- Global language toggle accessible from the navigation bar
- RTL layout support for Arabic mode
- UI labels, headings, and content translated between English and Arabic
- Language preference saved for logged-in users

## 6. Progress Tracking (Logged-in Users)

- Track which lectures have been opened/completed per subject
- Visual progress bar on the Subject Dashboard
- "Last Read" bookmark — automatically remember and link to the last visited lecture
- Progress data stored in Supabase

## 7. Additional Features

- **Dark/Light Mode** toggle with preference persistence
- **Search Bar** — Search keywords (e.g., "Kernel", "Shopify") to find the matching lecture
- **Mobile-responsive** layout throughout

## 8. UI Design

- Clean, modern academic aesthetic using shadcn/ui components
- Distinct subject colors (e.g., Blue for OS, Green for E-Commerce, Purple for Web Info Systems, Orange for Animation)
- Smooth transitions and card-based layouts
- Lucide React icons throughout

Database Schema Requirements:

​profiles table: Links to Auth ID, stores is_guest (boolean), theme_preference, and language_preference.

​subjects table: Stores subject names (e.g., "Web Information Systems") and level_tag (e.g., "Level-2").

​lectures table: Links to subjects. Contains the content (JSON or text) for summary, flashcards, and quiz data.

​user_progress table: A join table linking profiles and lectures. Columns: is_completed (boolean), quiz_score (integer), last_accessed (timestamp).

Admin Feature: Create a hidden route (/admin) or a simple script that allows me to insert a new JSON object into the lectures table so I can easily add "Lecture 3" later without redeploying the site.