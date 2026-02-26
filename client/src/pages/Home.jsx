import { useState } from "react";
import { Link } from "react-router-dom";
import { Maximize, RotateCw, FileDigit, Eraser, Download, RefreshCw, ShieldCheck, Zap, Lock, Globe, CheckCircle, HelpCircle, ChevronRight, Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="#top" className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0964 20.3536L17.6262 22.4473L17.046 27.6527L8.94876 36.8282C4.2486 33.8023 0.898178 28.8615 0 23.108L13.0964 20.3536Z" fill="#15E3FF"></path>
                        <path d="M25.183 25.94L31.2414 36.3789C27.992 38.6605 24.0331 40 19.7612 40C18.3744 40 17.0206 39.8587 15.7133 39.59L17.046 27.6527L20.4765 23.7656L25.183 25.94Z" fill="#348DFC"></path>
                        <path d="M39.1022 14.881C39.5332 16.5143 39.763 18.2294 39.763 19.9982C39.763 24.1145 38.5192 27.9403 36.3874 31.1207L25.184 25.9405L22.5551 21.4123L25.8574 17.6692L39.1022 14.881Z" fill="#FD4873"></path>
                        <path d="M17.046 27.6524L17.0458 27.6527L17.1686 26.552L17.046 27.6524Z" fill="#FFC700"></path>
                        <path d="M20.132 0C26.1505 0.109415 31.5194 2.877 35.1148 7.17842L25.8561 17.6694L20.9792 18.6959L18.519 14.4574L20.132 0Z" fill="#FFC700"></path>
                        <path d="M18.519 14.4574L17.9745 19.3269L13.0991 20.353L0.514709 14.5347C2.09964 8.94044 6.05794 4.3436 11.2327 1.9007L18.519 14.4574Z" fill="#00E7B9"></path>
                    </svg>
                    PixEdit
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 py-2" onMouseEnter={() => setIsProductDropdownOpen(true)} onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}>
                            Products <ChevronDown size={14} />
                        </button>

                        {/* Dropdown Menu */}
                        <div
                            className={`absolute top-full left-0 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 transition-all transform origin-top-left ${isProductDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible"}`}
                            onMouseLeave={() => setIsProductDropdownOpen(false)}
                        >
                            <Link to="/compress" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 hover:text-blue-600">
                                <Download size={16} className="text-green-500" /> Compress Image
                            </Link>
                            <Link to="/resize" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 hover:text-blue-600">
                                <FileDigit size={16} className="text-blue-500" /> Resize Image
                            </Link>
                            <Link to="/crop" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 hover:text-blue-600">
                                <Maximize size={16} className="text-purple-500" /> Crop Image
                            </Link>
                            <Link to="/convert" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 hover:text-blue-600">
                                <RefreshCw size={16} className="text-orange-500" /> Convert Format
                            </Link>
                            <Link to="/rotate" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 hover:text-blue-600">
                                <RotateCw size={16} className="text-pink-500" /> Rotate & Flip
                            </Link>
                            <Link to="/remove-bg" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 hover:text-blue-600">
                                <Eraser size={16} className="text-indigo-500" /> Remove Background
                            </Link>
                        </div>
                    </div>
                    <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        Features
                    </a>
                    <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        FAQ
                    </a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        Contact
                    </a>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link to="/compress" className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 p-4 absolute top-16 left-0 w-full shadow-lg flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Products</span>
                        <Link to="/compress" className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-gray-700">
                            <Download size={16} className="text-green-500" /> Compress
                        </Link>
                        <Link to="/resize" className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-gray-700">
                            <FileDigit size={16} className="text-blue-500" /> Resize
                        </Link>
                        <Link to="/crop" className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-gray-700">
                            <Maximize size={16} className="text-purple-500" /> Crop
                        </Link>
                        <Link to="/remove-bg" className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-gray-700">
                            <Eraser size={16} className="text-indigo-500" /> Remove BG
                        </Link>
                    </div>
                    <div className="h-px bg-gray-100"></div>
                    <a href="#features" className="text-gray-700 font-medium p-2">
                        Features
                    </a>
                    <a href="#faq" className="text-gray-700 font-medium p-2">
                        FAQ
                    </a>
                </div>
            )}
        </nav>
    );
};

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

const Step = ({ number, title, desc }) => (
    <div className="relative flex flex-col items-center text-center max-w-xs mx-auto">
        <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-lg z-10">{number}</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{desc}</p>
    </div>
);

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600'}`}>
                        <HelpCircle className="w-4 h-4" />
                    </div>
                    <h4 className={`font-bold transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-900'}`}>{question}</h4>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
            </button>
            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 pb-6 pt-0 ml-11">
                    <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div id="top"></div>
            <Navbar />

            {/* Hero Section */}
            <section className="bg-white border-b border-gray-200 pt-32 pb-20 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
                        <Zap size={14} fill="currentColor" /> v1.0 Now Live
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                        Professional Image Tools <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Right in Your Browser</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Edit, resize, convert, and optimize your images instantly.
                        <span className="text-gray-900 font-medium"> No uploads. No sign-ups. 100% Private.</span>
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/compress" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                            Start Editing Now <ChevronRight size={18} />
                        </Link>
                        <a href="#" className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
                            View Source
                        </a>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-1.5">
                            <CheckCircle size={16} className="text-green-500" /> Free Forever
                        </span>
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck size={16} className="text-green-500" /> Privacy First
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Globe size={16} className="text-green-500" /> Works Offline
                        </span>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-20 px-6 max-w-7xl mx-auto" id="products">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">A complete suite of image manipulation tools available at your fingertips.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ToolCard to="/compress" icon={Download} color="bg-green-500" title="Compress Image" desc="Reduce file size significantly while maintaining visual quality. Perfect for SEO and web performance." />
                    <ToolCard to="/resize" icon={FileDigit} color="bg-blue-500" title="Resize Image" desc="Change dimensions by pixels or percentage. Scale images down for thumbnails or social media." />
                    <ToolCard to="/crop" icon={Maximize} color="bg-purple-500" title="Crop Image" desc="Trim unwanted areas with precision. Use presets for Instagram, Twitter, and Facebook covers." />
                    <ToolCard to="/convert" icon={RefreshCw} color="bg-orange-500" title="Convert Format" desc="Switch seamlessly between JPG, PNG, WEBP, and GIF formats. Modernize your assets." />
                    <ToolCard to="/rotate" icon={RotateCw} color="bg-pink-500" title="Rotate & Flip" desc="Fix orientation issues instantly. Rotate 90° or mirror images horizontally and vertically." />
                    <ToolCard to="/remove-bg" icon={Eraser} color="bg-indigo-500" title="Remove Background" desc="Use AI to automatically detect and remove backgrounds. Professional results in seconds." />
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

            {/* FAQ */}
            <section className="bg-gray-50/50 py-24 px-6 border-y border-gray-100" id="faq">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">Got Questions?</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                        <FAQItem question="Is this tool really free?" answer="Yes! PixEdit is completely free and open source. There are no hidden fees, premium tiers, or watermarks on your exported images. We believe essential tools should be accessible to everyone." />
                        <FAQItem question="Are my photos uploaded to a server?" answer="Absolutely not. We prioritize your privacy above all else. PixEdit utilizes advanced client-side technologies like HTML5 Canvas and WebAssembly to process every image directly within your browser. Your data never touches our servers." />
                        <FAQItem question="What image formats do you support?" answer="We currently support a wide range of popular formats including JPEG, PNG, WEBP, and GIF for input. Our powerful conversion tool allows you to easily switch between these formats depending on your needs." />
                        <FAQItem question="Can I use PixEdit on my mobile device?" answer="Yes, definitely. PixEdit is designed with a mobile-first approach. The interface is fully responsive, ensuring a smooth, app-like experience on both iOS and Android smartphones and tablets." />
                        <FAQItem question="Is there a limit to the file size I can edit?" answer="While there's no strict limit imposed by us, performance depends on your device's capabilities since all processing happens locally. For extremely large files (e.g., raw photos), older devices might experience slight delays." />
                    </div>
                </div>
            </section>

            {/* Features / Why Us */}
            <section className="py-24 px-6 relative overflow-hidden bg-white" id="features">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -z-10 rounded-l-[100px] hidden lg:block"></div>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">Why Choose PixEdit</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Designed for Professionals, Built for Everyone</h2>
                        <p className="text-lg text-gray-500">Experience desktop-class image editing right in your browser. No compromises on quality or privacy.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                            <div className="size-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                                <Lock size={26} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Privacy Guaranteed</h3>
                            <p className="text-gray-500 leading-relaxed">Your photos never leave your device. All processing happens locally in your browser using secure WebAssembly technology. Absolute peace of mind.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                            <div className="size-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/30">
                                <Zap size={26} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-500 transition-colors">Lightning Fast</h3>
                            <p className="text-gray-500 leading-relaxed">No server uploads means zero latency. Experience instant edits, even with high-resolution files. Your workflow, uninterrupted.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
                            <div className="size-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-teal-500/30">
                                <Globe size={26} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-500 transition-colors">Universal Access</h3>
                            <p className="text-gray-500 leading-relaxed">Whether you're on a desktop, tablet, or smartphone, PixEdit adapts perfectly. A seamless, native-feeling app experience everywhere.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-950 text-gray-400 pt-20 pb-10 px-6 border-t border-gray-900 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="lg:col-span-1">
                            <a href="#top" className="text-2xl font-extrabold text-white flex items-center gap-2 mb-6">
                                <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.0964 20.3536L17.6262 22.4473L17.046 27.6527L8.94876 36.8282C4.2486 33.8023 0.898178 28.8615 0 23.108L13.0964 20.3536Z" fill="#15E3FF"></path>
                                    <path d="M25.183 25.94L31.2414 36.3789C27.992 38.6605 24.0331 40 19.7612 40C18.3744 40 17.0206 39.8587 15.7133 39.59L17.046 27.6527L20.4765 23.7656L25.183 25.94Z" fill="#348DFC"></path>
                                    <path d="M39.1022 14.881C39.5332 16.5143 39.763 18.2294 39.763 19.9982C39.763 24.1145 38.5192 27.9403 36.3874 31.1207L25.184 25.9405L22.5551 21.4123L25.8574 17.6692L39.1022 14.881Z" fill="#FD4873"></path>
                                    <path d="M17.046 27.6524L17.0458 27.6527L17.1686 26.552L17.046 27.6524Z" fill="#FFC700"></path>
                                    <path d="M20.132 0C26.1505 0.109415 31.5194 2.877 35.1148 7.17842L25.8561 17.6694L20.9792 18.6959L18.519 14.4574L20.132 0Z" fill="#FFC700"></path>
                                    <path d="M18.519 14.4574L17.9745 19.3269L13.0991 20.353L0.514709 14.5347C2.09964 8.94044 6.05794 4.3436 11.2327 1.9007L18.519 14.4574Z" fill="#00E7B9"></path>
                                </svg>
                                PixEdit
                            </a>
                            <p className="text-sm leading-relaxed mb-6">
                                Professional-grade image editing tools right in your browser. Fast, secure, and completely free.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Products</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link to="/compress" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Compress Image</Link></li>
                                <li><Link to="/resize" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Resize Image</Link></li>
                                <li><Link to="/crop" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Crop Image</Link></li>
                                <li><Link to="/convert" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Convert Format</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">More Tools</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link to="/rotate" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Rotate & Flip</Link></li>
                                <li><Link to="/remove-bg" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Remove Background</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Resources</h4>
                            <ul className="space-y-4 text-sm">
                                <li><a href="#features" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Features</a></li>
                                <li><a href="#faq" className="hover:text-white hover:translate-x-1 transition-transform inline-block">FAQ</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                        <p>&copy; {new Date().getFullYear()} PixEdit. Released under ISC License.</p>
                        <div className="flex gap-6">
                            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
                            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
