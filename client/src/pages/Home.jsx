import React from 'react';
import { Link } from 'react-router-dom';
import { Maximize, RotateCw, FileDigit, Eraser, Download, RefreshCw, Scissors, Image as ImageIcon } from 'lucide-react';

const ToolCard = ({ to, icon: Icon, title, desc, color }) => (
  <Link to={to} className="group relative block p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{desc}</p>
  </Link>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Image Tools for <span className="text-blue-600">Everyone</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Edit, resize, convert, and optimize your images directly in your browser. 
          No uploads, no server processing, 100% private.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/compress" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Start Editing
          </Link>
          <a href="https://github.com/dev-techz/image-utility-app" target="_blank" className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            View on GitHub
          </a>
        </div>
      </div>

      {/* Tools Grid */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 mb-8">
            <h2 className="text-xl font-bold text-gray-800">All Tools</h2>
            <div className="h-px flex-1 bg-gray-200"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard 
            to="/compress" 
            icon={Download} 
            color="bg-gray-900" 
            title="Compress Image" 
            desc="Reduce file size while maintaining quality. Perfect for web optimization." 
          />
          <ToolCard 
            to="/resize" 
            icon={FileDigit} 
            color="bg-gray-800" 
            title="Resize Image" 
            desc="Change dimensions by pixels or percentage without losing aspect ratio." 
          />
          <ToolCard 
            to="/crop" 
            icon={Maximize} 
            color="bg-gray-700" 
            title="Crop Image" 
            desc="Trim unwanted areas. Presets for social media (1:1, 16:9, etc)." 
          />
          <ToolCard 
            to="/convert" 
            icon={RefreshCw} 
            color="bg-gray-900" 
            title="Convert to JPG/PNG/WEBP" 
            desc="Switch between formats instantly. Convert WebP to JPG or PNG to WebP." 
          />
          <ToolCard 
            to="/rotate" 
            icon={RotateCw} 
            color="bg-gray-800" 
            title="Rotate & Flip" 
            desc="Fix orientation issues. Rotate 90 degrees or flip horizontally/vertically." 
          />
          <ToolCard 
            to="/remove-bg" 
            icon={Eraser} 
            color="bg-gray-700" 
            title="Remove Background" 
            desc="Automatically remove backgrounds using AI. Runs 100% in browser." 
          />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} PixEdit. Open Source & Privacy First.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
