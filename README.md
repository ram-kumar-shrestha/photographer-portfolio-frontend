# Photographer Portfolio - Frontend

Frontend application for the Photographer Portfolio built with React, TypeScript, and Vite.

## Description

A modern, responsive web application built with React and TypeScript, featuring user authentication, album management, and photo viewing capabilities.

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

## Installation

```bash
npm install
```

## Environment Configuration

1. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

2. Update the `.env` file with your backend API URL:

```env
VITE_API_BASE_URL=http://localhost:3000
```

**Note**: If your backend is running on a different port or domain, update the `VITE_API_BASE_URL` accordingly.

## Running the Application

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173` (default Vite port)

## Features

### Authentication

- User registration (Sign Up)
- User login (Sign In)
- Password recovery (Forgot Password)
- Password reset
- User profile management

### Album Management

- View all albums
- View individual album details
- Create new albums
- Update existing albums
- Delete albums
- Upload photos to albums

## Project Structure

```
src/
├── modules/
│   ├── auth/          # Authentication components and services
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── albums/        # Album management components
│   │   ├── list/
│   │   ├── view/
│   │   ├── add/
│   │   ├── hooks/
│   │   └── services/
│   ├── profile/       # User profile components
│   └── utils/         # Utility functions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
├── axios.ts           # Axios configuration
└── index.css          # Global styles
```

## Tech Stack

- **Library**: React, Antd
- **Language**: TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS
- **Code Quality**: ESLint

## Development

### Hot Module Replacement (HMR)

This project uses Vite's Fast Refresh for instant updates during development without losing component state.

### Linting

```bash
npm run lint
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

All environment variables must be prefixed with `VITE_` to be exposed to the application.

Example:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Connecting to Backend

Make sure the backend server is running before starting the frontend application. The frontend will make API requests to the URL specified in `VITE_API_BASE_URL`.

### Backend Setup

1. Navigate to the backend directory: `cd ../backend`
2. Install dependencies: `npm install`
3. Configure environment variables (see backend README)
4. Start the backend server: `npm run start:dev`
5. Return to frontend and start the development server

## License

MIT
