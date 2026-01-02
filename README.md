# QueryPopQuiz

A modern, responsive quiz application built with **React + Vite**, **Firebase Authentication**, and **Firestore**. Users can sign up, log in, play trivia quizzes powered by the [Open Trivia Database API](https://opentdb.com/), track their scores, and view personal quiz history.


## Features 

- **Real user authentication** (Email/Password) using Firebase
- **Protected routes** — only logged-in users can play quizzes
- **Responsive design** — works perfectly on mobile, tablet, and desktop
- **Mobile hamburger menu** with smooth slide-in animation
- **Dynamic quiz** with category, difficulty, and question count selection
- **Randomized answer order** for fair play
- **Visual feedback** (green/red/yellow) on answers
- **Score tracking** with percentage and motivational message
- **Personal quiz history** saved in Firestore (date, category, difficulty, score)
- **Dashboard** to view past performance
- **Clean, modern UI** with vanilla CSS (no frameworks)

## Tech Stack 

- **Frontend**: React 18 + Vite
- **Styling**: Vanilla CSS (external stylesheets)
- **Routing**: React Router v6
- **Authentication & Database**: Firebase (Auth + Firestore)
- **Quiz Data**: Open Trivia Database API
- **Deployment**: Vercel (recommended)

## Project Structure
    src/
    ├── components/         # Reusable components (Navbar, QuizStart, QuestionCard)
    ├── context/            # AuthContext for global auth state
    ├── pages/              # Route pages (Home, Login, Signup, QuizPage, Dashboard)
    ├── styles/             # All external CSS files
    ├── firebase.js         # Firebase configuration and initialization
    ├── App.jsx
    └── main.jsx