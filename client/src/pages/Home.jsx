import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Maximize, RotateCw, FileDigit, Eraser, Download, RefreshCw, 
  ShieldCheck, Zap, Lock, Globe, CheckCircle, HelpCircle, ChevronRight
} from 'lucide-react';

const ToolCard = ({ to, icon: Icon, title, desc, color }) => (
  <Link to={to} className="group relative block p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} text-white transition-transform group-hover:scale-110`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
    <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{desc}</p>
    <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
      Launch Tool <ChevronRight size={14} className="ml-1" />
    </div>
  </Link>
);

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
      <Icon size={28} />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="relative flex flex-col items-center text-center max-w-xs mx-auto">
    <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-lg z-10">
      {number}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{desc}</p>
  </div>
);

const FAQ = ({ question, answer }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
      <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
      {question}
    </h4>
    <p className="text-gray-600 text-sm leading-relaxed ml-7">{answer}</p>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 pt-24 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
            <Zap size={14} fill="currentColor" /> v1.0 Now Live
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Professional Image Tools <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Right in Your Browser
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Edit, resize, convert, and optimize your images instantly. 
            <span className="text-gray-900 font-medium"> No uploads. No sign-ups. 100% Private.</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/compress" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
              Start Editing Now <ChevronRight size={18} />
            </Link>
            <a href="https://github.com/dev-techz/image-utility-app" target="_blank" className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
              View Source
            </a>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-green-500"/> Free Forever</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-green-500"/> Privacy First</span>
            <span className="flex items-center gap-1.5"><Globe size={16} className="text-green-500"/> Works Offline</span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-gray-500 max-w-xl mx-auto">A complete suite of image manipulation tools available at your fingertips.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard 
            to="/compress" 
            icon={Download} 
            color="bg-gray-900" 
            title="Compress Image" 
            desc="Reduce file size significantly while maintaining visual quality. Perfect for SEO and web performance." 
          />
          <ToolCard 
            to="/resize" 
            icon={FileDigit} 
            color="bg-gray-800" 
            title="Resize Image" 
            desc="Change dimensions by pixels or percentage. Scale images down for thumbnails or social media." 
          />
          <ToolCard 
            to="/crop" 
            icon={Maximize} 
            color="bg-gray-700" 
            title="Crop Image" 
            desc="Trim unwanted areas with precision. Use presets for Instagram, Twitter, and Facebook covers." 
          />
          <ToolCard 
            to="/convert" 
            icon={RefreshCw} 
            color="bg-gray-900" 
            title="Convert Format" 
            desc="Switch seamlessly between JPG, PNG, WEBP, and GIF formats. Modernize your assets." 
          />
          <ToolCard 
            to="/rotate" 
            icon={RotateCw} 
            color="bg-gray-800" 
            title="Rotate & Flip" 
            desc="Fix orientation issues instantly. Rotate 90° or mirror images horizontally and vertically." 
          />
          <ToolCard 
            to="/remove-bg" 
            icon={Eraser} 
            color="bg-gray-700" 
            title="Remove Background" 
            desc="Use AI to automatically detect and remove backgrounds. Professional results in seconds." 
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-y border-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500">Simple, fast, and secure processing in three steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-5 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-0"></div>
            
            <Step number="1" title="Upload Image" desc="Drag & drop any image file. We support JPG, PNG, WEBP, and more." />
            <Step number="2" title="Edit Instantly" desc="Choose your tool. Crop, resize, or compress. Changes happen in real-time." />
            <Step number="3" title="Download" desc="Get your optimized image instantly. No watermarks, no sign-up required." />
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Feature 
            icon={Lock} 
            title="Privacy Guaranteed" 
            desc="Your photos never leave your device. All processing happens locally in your browser using WebAssembly." 
          />
          <Feature 
            icon={Zap} 
            title="Lightning Fast" 
            desc="No server uploads means zero latency. Edit heavy files instantly without waiting for transfer speeds." 
          />
          <Feature 
            icon={Globe} 
            title="Universal Compatibility" 
            desc="Works on any device—desktop, tablet, or mobile. Consistent experience across all modern browsers." 
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="grid gap-6">
            <FAQ 
              question="Is this tool really free?" 
              answer="Yes! PixEdit is completely free and open source. There are no hidden fees, premium tiers, or watermarks." 
            />
            <FAQ 
              question="Are my photos uploaded to a server?" 
              answer="No. We use client-side technology (Canvas & WebAssembly) to process images directly on your device. Your data stays with you." 
            />
            <FAQ 
              question="What formats do you support?" 
              answer="We currently support JPEG, PNG, WEBP, and GIF for input. You can convert between these formats easily." 
            />
             <FAQ 
              question="Can I use this on my phone?" 
              answer="Absolutely. The interface is fully responsive and touch-friendly for iOS and Android devices." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-white text-xl font-bold mb-2">PixEdit</h3>
            <p className="text-sm max-w-xs">The privacy-first image editor for the modern web.</p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium">
             <Link to="/compress" className="hover:text-white transition-colors">Compress</Link>
             <Link to="/crop" className="hover:text-white transition-colors">Crop</Link>
             <Link to="/resize" className="hover:text-white transition-colors">Resize</Link>
             <a href="https://github.com/dev-techz/image-utility-app" target="_blank" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-600">
           &copy; {new Date().getFullYear()} PixEdit. Released under MIT License.
        </div>
      </footer>
    </div>
  );
};

export default Home;
