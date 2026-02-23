import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import DropZone from '../components/DropZone';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/imageProcessor';
import { removeBackground } from '@imgly/background-removal';
import { saveAs } from 'file-saver';
import { 
    Download, RotateCw, FlipHorizontal, FlipVertical, 
    Maximize, FileDigit, Eraser, ArrowLeft, RefreshCw, Image as ImageIcon 
} from 'lucide-react';

const ToolLayout = ({ title, icon: Icon, children, file, onClear }) => (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center shadow-sm sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <Link to="/" className="text-gray-500 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    {Icon && <Icon className="w-6 h-6 text-blue-500" />}
                    {title}
                </h1>
            </div>
            {file && (
                <button 
                    onClick={onClear}
                    className="text-sm font-medium text-gray-500 hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <RefreshCw className="w-4 h-4" /> New Image
                </button>
            )}
        </header>
        <main className="flex-1 p-4 lg:p-6 max-w-[1600px] mx-auto w-full">
            {children}
        </main>
    </div>
);

// Helper component to handle async BG removal effect
const BgRemoverLogic = ({ imageSrc, onProcessed }) => {
    const [status, setStatus] = useState('idle'); // idle, processing, done, error

    useEffect(() => {
        if (!imageSrc || status !== 'idle') return;
        
        const process = async () => {
            setStatus('processing');
            try {
                const blob = await fetch(imageSrc).then(r => r.blob());
                const processedBlob = await removeBackground(blob);
                const url = URL.createObjectURL(processedBlob);
                onProcessed(url);
                setStatus('done');
            } catch (err) {
                console.error(err);
                setStatus('error');
            }
        };
        process();
    }, [imageSrc]); // Run once on mount/change

    if (status === 'processing') return <div className="text-sm text-gray-500 flex items-center gap-2 py-2"><span className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"/> AI is removing background...</div>;
    if (status === 'done') return <div className="text-sm text-green-600 font-medium py-2 flex items-center gap-2">✓ Background Removed</div>;
    if (status === 'error') return <div className="text-sm text-red-500 py-2">Failed to remove background.</div>;
    return null;
};

// Base Editor Component (Reusable logic for loading/saving, specific UI injected)
const BaseEditor = ({ title, icon, mode }) => {
    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Core Transform State (All tools might need basic display)
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [flip, setFlip] = useState({ horizontal: false, vertical: false });
    const [aspect, setAspect] = useState(undefined);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    // Output State
    const [outputFormat, setOutputFormat] = useState('image/jpeg');
    const [quality, setQuality] = useState(0.9);
    const [resizeDim, setResizeDim] = useState({ width: '', height: '' });
    const [maintainAspect, setMaintainAspect] = useState(true);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImageSrc(reader.result);
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    setOriginalDimensions({ width: img.width, height: img.height });
                    setResizeDim({ width: img.width, height: img.height });
                };
            });
            reader.readAsDataURL(file);
        }
    }, [file]);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleDownload = async () => {
        setIsProcessing(true);
        try {
            // If mode is NOT crop, we should probably output the whole image, 
            // but react-easy-crop always gives us crop data.
            // If the user hasn't touched the cropper in 'resize' or 'convert' mode,
            // we want to ensure we get the full image, not a crop.
            // However, getCroppedImg handles rotation/flip which we WANT.
            // The issue is if the default initial crop from react-easy-crop cuts things off.
            // WE fix this by forcing objectFit="contain" for non-crop modes below.
            
            const blob = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation,
                flip,
                outputFormat,
                quality,
                resizeDim
            );
            saveAs(blob, `edited-image.${outputFormat.split('/')[1]}`);
        } catch (e) {
            console.error(e);
            alert('Processing failed');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!file) {
        return (
            <ToolLayout title={title} icon={icon}>
                <div className="mt-10 max-w-xl mx-auto">
                    <DropZone onUpload={setFile} />
                </div>
            </ToolLayout>
        );
    }

    // Determine if we should allow cropping interaction
    const isCropMode = mode === 'crop';
    
    // For non-crop modes (Resize, Convert, Rotate), we want the image to fit fully visible
    // without auto-zooming to cover the container.
    const objectFit = isCropMode ? 'contain' : 'contain'; 

    return (
        <ToolLayout title={title} icon={icon} file={file} onClear={() => { setFile(null); setImageSrc(null); }}>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col lg:flex-row h-[80vh]">
                
                {/* Main Canvas Area */}
                <div className="relative flex-1 bg-gray-900 h-full min-h-[400px] flex items-center justify-center overflow-hidden">
                    {/* Checkered bg for transparency */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" 
                         style={{ backgroundImage: 'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }} 
                    />
                    
                    {mode === 'remove-bg' ? (
                        <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                             <img src={imageSrc} className="max-w-full max-h-full object-contain shadow-2xl" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 top-0 left-0 right-0 bottom-0">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={aspect}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                onRotationChange={setRotation}
                                restrictPosition={false}
                                objectFit="contain" 
                                style={{ 
                                    containerStyle: { background: 'transparent' },
                                    mediaStyle: { width: 'auto', height: 'auto', maxHeight: '90%', maxWidth: '90%' } 
                                }}
                                transform={[
                                    `translate(${crop.x}px, ${crop.y}px)`,
                                    `rotateZ(${rotation}deg)`,
                                    `rotateY(${flip.horizontal ? 180 : 0}deg)`,
                                    `rotateX(${flip.vertical ? 180 : 0}deg)`,
                                    `scale(${zoom})`,
                                ].join(' ')}
                            />
                        </div>
                    )}

                    {/* Zoom Controls (only if using Cropper) */}
                    {mode !== 'remove-bg' && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full flex gap-4 text-white shadow-xl z-20 border border-white/10">
                            <button onClick={() => setZoom(Math.max(1, zoom - 0.2))} className="hover:text-blue-400 font-bold w-6">-</button>
                            <span className="text-xs self-center font-mono w-12 text-center text-gray-300">{(zoom * 100).toFixed(0)}%</span>
                            <button onClick={() => setZoom(Math.min(3, zoom + 0.2))} className="hover:text-blue-400 font-bold w-6">+</button>
                        </div>
                    )}
                </div>

                {/* Sidebar Controls - Conditional Rendering based on Mode */}
                <div className="w-full lg:w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-y-auto">
                    <div className="p-6 space-y-8">
                        
                        {/* MODE: CROP */}
                        {mode === 'crop' && (
                            <section>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Maximize className="w-3 h-3" /> Aspect Ratio
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: 'Free', val: undefined },
                                        { label: '1:1', val: 1 },
                                        { label: '4:3', val: 4/3 },
                                        { label: '16:9', val: 16/9 },
                                    ].map((opt) => (
                                        <button
                                            key={opt.label}
                                            onClick={() => setAspect(opt.val)}
                                            className={`text-xs py-2.5 rounded-lg border font-medium transition-all ${aspect === opt.val ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* MODE: RESIZE */}
                        {mode === 'resize' && (
                            <section>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <FileDigit className="w-3 h-3" /> Dimensions (px)
                                </h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative w-full group">
                                        <input type="number" name="width" value={resizeDim.width} 
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                const ratio = originalDimensions.width / originalDimensions.height;
                                                setResizeDim({ width: val, height: maintainAspect ? Math.round(val / ratio) : resizeDim.height });
                                            }}
                                            className="w-full p-2.5 pl-9 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50 focus:bg-white" 
                                            placeholder="Width" />
                                        <span className="absolute left-3 top-2.5 text-gray-400 text-xs font-bold group-focus-within:text-blue-500">W</span>
                                    </div>
                                    <div className="relative w-full group">
                                        <input type="number" name="height" value={resizeDim.height} 
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                const ratio = originalDimensions.width / originalDimensions.height;
                                                setResizeDim({ width: maintainAspect ? Math.round(val * ratio) : resizeDim.width, height: val });
                                            }}
                                            className="w-full p-2.5 pl-9 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50 focus:bg-white" 
                                            placeholder="Height" />
                                        <span className="absolute left-3 top-2.5 text-gray-400 text-xs font-bold group-focus-within:text-blue-500">H</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-1">
                                    <input type="checkbox" id="aspect" checked={maintainAspect} onChange={(e) => setMaintainAspect(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                                    <label htmlFor="aspect" className="text-xs text-gray-600 select-none cursor-pointer font-medium">Maintain Aspect Ratio</label>
                                </div>
                            </section>
                        )}

                        {/* MODE: ROTATE */}
                        {(mode === 'rotate' || mode === 'crop') && (
                            <section>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <RotateCw className="w-3 h-3" /> Orientation
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <button onClick={() => setRotation((r) => r + 90)} className="btn-tool group" title="Rotate 90°">
                                        <RotateCw size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                    </button>
                                    <button onClick={() => setFlip(f => ({ ...f, horizontal: !f.horizontal }))} className={`btn-tool ${flip.horizontal ? 'active' : ''}`} title="Flip Horizontal">
                                        <FlipHorizontal size={20} />
                                    </button>
                                    <button onClick={() => setFlip(f => ({ ...f, vertical: !f.vertical }))} className={`btn-tool ${flip.vertical ? 'active' : ''}`} title="Flip Vertical">
                                        <FlipVertical size={20} />
                                    </button>
                                </div>
                            </section>
                        )}

                         {/* MODE: REMOVE BG */}
                         {mode === 'remove-bg' && (
                             <section>
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-800 p-4 rounded-xl text-sm mb-4 shadow-sm">
                                    <h4 className="font-bold mb-1 flex items-center gap-2"><Eraser size={14}/> AI Processing</h4>
                                    <p className="text-blue-600/80 text-xs leading-relaxed">Background removal runs automatically on your device. No data leaves your browser.</p>
                                </div>
                                <BgRemoverLogic imageSrc={imageSrc} onProcessed={(url) => { setImageSrc(url); setOutputFormat('image/png'); }} />
                             </section>
                         )}

                        {/* COMMON: EXPORT SETTINGS */}
                        <section className="pt-6 border-t border-gray-100 mt-auto">
                             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Export Settings</h3>
                             
                             <div className="space-y-5">
                                {(mode === 'convert' || mode === 'compress' || mode === 'resize' || mode === 'crop') && (
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-600 ml-1">Format</label>
                                        <div className="relative">
                                            <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 focus:bg-white focus:border-blue-500 outline-none appearance-none cursor-pointer">
                                                <option value="image/jpeg">JPEG (Standard)</option>
                                                <option value="image/png">PNG (Lossless/Transparent)</option>
                                                <option value="image/webp">WEBP (Modern Web)</option>
                                            </select>
                                            <div className="absolute right-3 top-3 pointer-events-none text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {(mode === 'compress' || outputFormat === 'image/jpeg' || outputFormat === 'image/webp') && (
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-xs font-medium text-gray-600 px-1">
                                            <span>Quality</span>
                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{Math.round(quality * 100)}%</span>
                                        </div>
                                        <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                                        <div className="flex justify-between text-[10px] text-gray-400 px-1">
                                            <span>Smaller File</span>
                                            <span>Better Quality</span>
                                        </div>
                                    </div>
                                )}
                             </div>
                        </section>

                        <button 
                            onClick={handleDownload}
                            disabled={isProcessing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 mt-8 transition-all shadow-blue-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        >
                            {isProcessing ? <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"/> : <Download size={20} />}
                            {isProcessing ? 'Processing...' : 'Download Image'}
                        </button>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

// Specific Tool Wrappers
export const CropTool = () => <BaseEditor title="Crop Image" icon={Maximize} mode="crop" />;
export const ResizeTool = () => <BaseEditor title="Resize Image" icon={FileDigit} mode="resize" />;
export const RotateTool = () => <BaseEditor title="Rotate & Flip" icon={RotateCw} mode="rotate" />;
export const ConvertTool = () => <BaseEditor title="Convert Format" icon={RefreshCw} mode="convert" />;
export const CompressTool = () => <BaseEditor title="Compress Image" icon={ImageIcon} mode="compress" />;
export const RemoveBgTool = () => <BaseEditor title="Remove Background" icon={Eraser} mode="remove-bg" />;
