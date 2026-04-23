import { useState, useEffect, useRef } from 'react';
import { Camera, Scan, CheckCircle2, AlertCircle, Maximize2, Sun, Droplets, Wind, X, Play, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';

export function ARBalconyScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [selectedModel, setSelectedModel] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const streamRef = useRef<MediaStream | null>(null);
  
  const [environmentData, setEnvironmentData] = useState({
    sunlight: 0,
    space: 0,
    airflow: 0
  });

  const plantModels = [
    {
      url: "https://sketchfab.com/models/dac370ad6c49465c8613979514beb4f5/embed",
      name: "Indoor Plants Pack 02",
      author: "AllQuad"
    },
    {
      url: "https://sketchfab.com/models/70679a304b324ca8941c214875acf6a9/embed",
      name: "Houseleek Plant",
      author: "matousekfoto"
    },
    {
      url: "https://sketchfab.com/models/7c5e77d572c848458e5d898ac49f6f27/embed",
      name: "Indoor Plant",
      author: "Malek Almsri"
    }
  ];

  // Start camera
  const startCamera = async () => {
    try {
      setCameraError(null);
      
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera API not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.');
        return;
      }

      // Request camera permission
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsCameraActive(true);
    } catch (error: any) {
      console.error('Error accessing camera:', error);
      
      // Provide specific error messages
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setCameraError('Camera permission denied. Please allow camera access in your browser settings and refresh the page.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setCameraError('No camera found on this device. Please connect a camera and try again.');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setCameraError('Camera is already in use by another application. Please close other apps using the camera.');
      } else if (error.name === 'OverconstrainedError') {
        setCameraError('Camera does not support the requested settings. Trying with basic settings...');
        // Try with simpler constraints
        try {
          const simpleStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          streamRef.current = simpleStream;
          if (videoRef.current) {
            videoRef.current.srcObject = simpleStream;
            await videoRef.current.play();
          }
          setIsCameraActive(true);
          setCameraError(null);
        } catch (e) {
          setCameraError('Unable to access camera with any settings.');
        }
      } else if (error.name === 'SecurityError') {
        setCameraError('Camera access blocked due to security settings. Make sure you are on HTTPS or localhost.');
      } else {
        setCameraError(`Unable to access camera: ${error.message || 'Unknown error'}`);
      }
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsScanning(false);
    setScanProgress(0);
    setScanComplete(false);
  };

  // Switch camera (front/back)
  const switchCamera = async () => {
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
    
    if (isCameraActive) {
      stopCamera();
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  };

  // Scanning simulation with progress
  useEffect(() => {
    if (isScanning && scanProgress < 100) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          const next = prev + 2;
          if (next >= 100) {
            setScanComplete(true);
            setEnvironmentData({
              sunlight: Math.floor(Math.random() * 30) + 70,
              space: Math.floor(Math.random() * 25) + 75,
              airflow: Math.floor(Math.random() * 20) + 60
            });
            return 100;
          }
          return next;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isScanning, scanProgress]);

  // Draw AR overlay on canvas
  useEffect(() => {
    if (isCameraActive && canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const video = videoRef.current;

      const drawOverlay = () => {
        if (!ctx || !video) return;

        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;

        // Draw scanning grid if scanning
        if (isScanning) {
          const time = Date.now() / 1000;
          
          // Grid lines
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
          ctx.lineWidth = 2;
          
          const gridSize = 50;
          for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
          }
          for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }

          // Scanning line
          const scanY = ((time * 100) % canvas.height);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.8)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(0, scanY);
          ctx.lineTo(canvas.width, scanY);
          ctx.stroke();

          // Corner markers
          const cornerSize = 50;
          ctx.strokeStyle = 'rgba(16, 185, 129, 1)';
          ctx.lineWidth = 4;
          
          // Top-left
          ctx.beginPath();
          ctx.moveTo(20, 20 + cornerSize);
          ctx.lineTo(20, 20);
          ctx.lineTo(20 + cornerSize, 20);
          ctx.stroke();

          // Top-right
          ctx.beginPath();
          ctx.moveTo(canvas.width - 20 - cornerSize, 20);
          ctx.lineTo(canvas.width - 20, 20);
          ctx.lineTo(canvas.width - 20, 20 + cornerSize);
          ctx.stroke();

          // Bottom-left
          ctx.beginPath();
          ctx.moveTo(20, canvas.height - 20 - cornerSize);
          ctx.lineTo(20, canvas.height - 20);
          ctx.lineTo(20 + cornerSize, canvas.height - 20);
          ctx.stroke();

          // Bottom-right
          ctx.beginPath();
          ctx.moveTo(canvas.width - 20 - cornerSize, canvas.height - 20);
          ctx.lineTo(canvas.width - 20, canvas.height - 20);
          ctx.lineTo(canvas.width - 20, canvas.height - 20 - cornerSize);
          ctx.stroke();
        }

        requestAnimationFrame(drawOverlay);
      };

      drawOverlay();
    }
  }, [isCameraActive, isScanning]);

  const startScan = () => {
    if (!isCameraActive) {
      startCamera();
    }
    setIsScanning(true);
    setScanProgress(0);
    setScanComplete(false);
    setEnvironmentData({ sunlight: 0, space: 0, airflow: 0 });
  };

  const resetScan = () => {
    setIsScanning(false);
    setScanProgress(0);
    setScanComplete(false);
    setEnvironmentData({ sunlight: 0, space: 0, airflow: 0 });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 font-['Inter']">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* LEFT PANEL - Capture Interface */}
          <div className="bg-[#04100c] border border-emerald-500/10 rounded-[2rem] p-8 flex flex-col h-[600px]">
            {/* Tabs */}
            <div className="flex items-center justify-center gap-8 mb-12">
              <button className="bg-white text-[#020617] px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                Capture
              </button>
              <button className="text-emerald-500 font-bold text-sm uppercase tracking-widest hover:text-emerald-400 transition-colors">
                Upload
              </button>
              <button className="text-emerald-500 font-bold text-sm uppercase tracking-widest hover:text-emerald-400 transition-colors">
                Manual
              </button>
            </div>

            {/* Viewport */}
            <div className="flex-1 relative rounded-2xl overflow-hidden bg-[#020617] border border-emerald-500/5 flex items-center justify-center">
              
              {!isCameraActive ? (
                <div className="text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl border-2 border-emerald-900 flex items-center justify-center mb-6">
                    <Camera className="w-8 h-8 text-emerald-800" />
                  </div>
                  <button 
                    onClick={startCamera}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all flex items-center gap-3 hover:scale-105"
                  >
                    Activate AI Lens
                  </button>
                  {cameraError && (
                    <p className="text-red-400 text-sm mt-4 max-w-xs">{cameraError}</p>
                  )}
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  />
                  
                  {isScanning && (
                    <div className="absolute top-6 left-6 right-6">
                      <div className="bg-[#020617]/80 backdrop-blur-xl rounded-full p-4 border border-emerald-500/30 flex items-center gap-4">
                        <Scan className="w-5 h-5 text-emerald-400 animate-pulse" />
                        <div className="flex-1">
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${scanProgress}%` }} />
                          </div>
                        </div>
                        <span className="text-white font-bold text-sm font-['Clash_Display']">{scanProgress}%</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                    {!isScanning ? (
                      <button 
                        onClick={startScan}
                        className="bg-emerald-500 text-[#020617] px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-400 transition-colors"
                      >
                        Start Scanning
                      </button>
                    ) : (
                      <button 
                        onClick={resetScan}
                        className="bg-[#020617]/80 backdrop-blur border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-full font-bold hover:bg-emerald-500/10 transition-colors"
                      >
                        Reset
                      </button>
                    )}
                    <button 
                      onClick={stopCamera}
                      className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-3 rounded-full font-bold hover:bg-red-500/20 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT PANEL - Results / Empty State */}
          <div className="bg-[#04100c] border border-emerald-500/10 rounded-[2rem] p-8 flex flex-col h-[600px] justify-center items-center relative overflow-hidden">
            {!scanComplete ? (
              <div className="text-center z-10 flex flex-col items-center">
                <div className="w-16 h-16 mb-6 text-emerald-500 flex items-center justify-center">
                  <Scan className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-['Clash_Display']">Waiting for Analysis</h3>
                <p className="text-emerald-500/60 max-w-xs text-sm">
                  Use the AI Tool to generate space insights
                </p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col z-10 animate-in fade-in zoom-in duration-500">
                <h3 className="text-2xl font-bold text-white mb-8 font-['Clash_Display']">Space Insights</h3>
                
                <div className="space-y-4 mb-8">
                  {/* Sunlight */}
                  <div className="bg-[#020617] border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                      <Sun className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold">Sunlight Exposure</p>
                      <p className="text-xs text-white/40">Direct & Indirect Light</p>
                    </div>
                    <span className="text-xl font-black font-['Clash_Display'] text-yellow-500">{environmentData.sunlight}%</span>
                  </div>

                  {/* Space */}
                  <div className="bg-[#020617] border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold">Available Area</p>
                      <p className="text-xs text-white/40">Usable Floor/Shelf Space</p>
                    </div>
                    <span className="text-xl font-black font-['Clash_Display'] text-blue-500">{environmentData.space}%</span>
                  </div>

                  {/* Airflow */}
                  <div className="bg-[#020617] border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Wind className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold">Air Circulation</p>
                      <p className="text-xs text-white/40">Ventilation Quality</p>
                    </div>
                    <span className="text-xl font-black font-['Clash_Display'] text-emerald-500">{environmentData.airflow}%</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <p className="text-xs text-emerald-500/60 uppercase tracking-widest font-bold mb-4">Recommended Actions</p>
                  <button className="w-full bg-emerald-500 text-[#020617] py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:bg-emerald-400 transition-colors">
                    View Compatible Plants
                  </button>
                </div>
              </div>
            )}
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}