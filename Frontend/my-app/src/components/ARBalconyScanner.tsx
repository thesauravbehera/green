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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Camera className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm">AR Balcony Scanner (Live Camera)</span>
          </div>
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Scan Your Balcony Space
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Use your device camera to analyze your balcony environment and get personalized plant recommendations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Camera Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl text-white">Camera View</h2>
                  {scanComplete && (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                  )}
                </div>

                {/* Camera Viewport */}
                <div className="relative aspect-video bg-slate-950 rounded-lg overflow-hidden border-2 border-slate-800">
                  {/* Video Element */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* AR Canvas Overlay */}
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  />

                  {/* Camera not active overlay */}
                  {!isCameraActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500 mb-4">Camera is off</p>
                        <Button
                          onClick={startCamera}
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Camera
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Scanning Progress Overlay */}
                  <AnimatePresence>
                    {isScanning && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-4 left-4 right-4"
                      >
                        <div className="bg-slate-900/90 backdrop-blur-xl rounded-lg p-4 border border-emerald-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-emerald-400 text-sm">Scanning Environment...</span>
                            <span className="text-white text-sm">{scanProgress}%</span>
                          </div>
                          <Progress value={scanProgress} className="h-2 bg-slate-800" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Camera Controls Overlay */}
                  {isCameraActive && (
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={switchCamera}
                        className="bg-slate-900/90 backdrop-blur-xl border-slate-700"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Switch
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={stopCamera}
                        className="bg-slate-900/90 backdrop-blur-xl border-slate-700 text-red-400 hover:text-red-400"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Stop
                      </Button>
                    </div>
                  )}

                  {/* Error Message */}
                  {cameraError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/95">
                      <div className="text-center p-6">
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                        <p className="text-red-400 mb-4">{cameraError}</p>
                        <Button onClick={startCamera} variant="outline">
                          Try Again
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {!isScanning ? (
                    <Button
                      onClick={startScan}
                      disabled={!isCameraActive}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 col-span-2"
                    >
                      <Scan className="w-4 h-4 mr-2" />
                      {isCameraActive ? 'Start Scanning' : 'Enable Camera First'}
                    </Button>
                  ) : (
                    <Button
                      onClick={resetScan}
                      variant="outline"
                      className="border-slate-700 col-span-2"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Scan
                    </Button>
                  )}
                </div>

                {/* Camera Instructions */}
                {!isCameraActive && !cameraError && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h3 className="text-blue-400 text-sm mb-2">📸 Camera Instructions:</h3>
                    <ul className="text-slate-400 text-xs space-y-1">
                      <li>• Grant camera permissions when prompted</li>
                      <li>• Point camera at your balcony space</li>
                      <li>• Use "Switch" to toggle front/back camera</li>
                      <li>• Click "Start Scanning" to analyze environment</li>
                    </ul>
                  </div>
                )}

                {/* Permission Help Guide */}
                {cameraError && (
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <h3 className="text-orange-400 text-sm mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      How to Enable Camera Access
                    </h3>
                    <div className="space-y-3 text-xs text-slate-400">
                      <div>
                        <p className="text-orange-300 mb-1">Chrome/Edge:</p>
                        <p>• Click the camera icon in the address bar</p>
                        <p>• Select "Allow" and refresh the page</p>
                      </div>
                      <div>
                        <p className="text-orange-300 mb-1">Safari:</p>
                        <p>• Go to Safari &gt; Settings &gt; Websites &gt; Camera</p>
                        <p>• Allow access for this site</p>
                      </div>
                      <div>
                        <p className="text-orange-300 mb-1">Firefox:</p>
                        <p>• Click the lock icon in the address bar</p>
                        <p>• Find Camera permissions and allow</p>
                      </div>
                      <div className="pt-2 border-t border-orange-500/20">
                        <p className="text-orange-300">Note: Camera requires HTTPS or localhost</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Environment Analysis */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl p-6">
              <h2 className="text-2xl text-white mb-6">Environment Analysis</h2>

              {scanComplete ? (
                <div className="space-y-4">
                  {/* Sunlight */}
                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Sun className="w-6 h-6 text-yellow-400" />
                      <div className="flex-1">
                        <p className="text-white">Sunlight Exposure</p>
                        <p className="text-xs text-slate-400">Direct & Indirect Light</p>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        {environmentData.sunlight}%
                      </Badge>
                    </div>
                    <Progress value={environmentData.sunlight} className="h-2 bg-slate-800" />
                  </div>

                  {/* Space */}
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Maximize2 className="w-6 h-6 text-blue-400" />
                      <div className="flex-1">
                        <p className="text-white">Available Space</p>
                        <p className="text-xs text-slate-400">Usable Area Detected</p>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {environmentData.space}%
                      </Badge>
                    </div>
                    <Progress value={environmentData.space} className="h-2 bg-slate-800" />
                  </div>

                  {/* Airflow */}
                  <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg p-4 border border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Wind className="w-6 h-6 text-emerald-400" />
                      <div className="flex-1">
                        <p className="text-white">Air Circulation</p>
                        <p className="text-xs text-slate-400">Ventilation Quality</p>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        {environmentData.airflow}%
                      </Badge>
                    </div>
                    <Progress value={environmentData.airflow} className="h-2 bg-slate-800" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Scan className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500">Start scanning to see analysis</p>
                </div>
              )}
            </Card>

            {/* Recommended Plants */}
            {scanComplete && (
              <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30 backdrop-blur-xl p-6">
                <h2 className="text-2xl text-white mb-4">Recommended for Your Space</h2>
                
                <div className="space-y-3 mb-4">
                  {plantModels.map((model, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedModel(index)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedModel === index
                          ? 'bg-emerald-500/20 border-emerald-500/50'
                          : 'bg-slate-800/30 border-slate-700 hover:border-emerald-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                          <iframe
                            title={model.name}
                            src={model.url}
                            className="w-full h-full scale-150"
                            style={{ pointerEvents: 'none' }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate">{model.name}</p>
                          <p className="text-slate-500 text-xs">by {model.author}</p>
                        </div>
                        <CheckCircle2 className={`w-5 h-5 ${selectedModel === index ? 'text-emerald-400' : 'text-slate-700'}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 3D Preview */}
                <div className="aspect-video bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                  <iframe
                    title={plantModels[selectedModel].name}
                    frameBorder="0"
                    allowFullScreen
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    xr-spatial-tracking="true"
                    src={plantModels[selectedModel].url}
                    className="w-full h-full"
                  />
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                  Add to My Garden
                </Button>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}