# PixEdit (Image Utility App)

PixEdit is a full-stack image utility application built with a React frontend and an Express/Node.js backend. It provides advanced image processing tools directly in your browser, enabling you to edit, crop, format, and enhance images seamlessly.

## Features

- **Frontend Image Operations:**
    - ✂️ **Image Cropping:** Powered by `react-easy-crop` for intuitive manipulation.
    - ✨ **Background Removal:** Runs seamlessly via `@imgly/background-removal`.
    - 🖱️ **Drag-and-Drop Interface:** Easily upload files utilizing `react-dropzone`.
    - 💾 **Export Tools:** Save files locally as single files or ZIP archives (`file-saver`, `jszip`).
    - 📱 **Modern UI:** Built with Vite, React 19, and Tailwind CSS v4.

- **Backend Image Processing:**
    - ⚙️ **Heavy Processing:** Node.js Express server to handle complex image operations.
    - 🖼️ **Format Conversion & Optimization:** Leverage `sharp` for resizing, rotation, and changing formats (e.g., JPEG, PNG, WEBP) with specific quality targets.
    - 🚀 **Performant Uploads:** Handles large in-memory files rapidly using `multer`.

## Project Structure

This repository is structured as a monorepo containing both the frontend client and the backend server.

- `/client` - The Vite React application.
- `/server` - The Express Node.js application.

## Getting Started

Follow the instructions below to run both the frontend and backend locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Setup

1. **Clone the repository (if applicable):**

    ```bash
    git clone <your-repo-url>
    cd image-utility-app
    ```

2. **Start the Server (Backend):**
   Open a terminal, navigate to the `/server` directory, install dependencies, and run the development server.

    ```bash
    cd server
    npm install
    npm run dev
    ```

    _The server runs on http://localhost:3001 by default._

3. **Start the Client (Frontend):**
   Open a new terminal window, navigate to the `/client` directory, install dependencies, and start the Vite development server.
    ```bash
    cd client
    npm install
    npm run dev
    ```
    _The client runs on http://localhost:5173 by default._

## Scripts

### Client

- `npm run dev` - Start the Vite frontend development server.
- `npm run build` - Build the app for production.
- `npm run lint` - Run ESLint.
- `npm run preview` - Preview the production build locally.

### Server

- `npm run dev` - Start the backend server with `nodemon` for auto-reloading.
- `npm start` - Start the backend server using Node.

## Technologies Used

- **Client:** React (v19), Vite, Tailwind CSS, React Router DOM, Lucide React
- **Server:** Node.js, Express, Sharp, Multer, CORS

## License

ISC
