import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const EegSimulator: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;
    
    // Configuration
    const lines = 4;
    const speed = 2;
    
    const draw = () => {
      // Resize canvas to parent width
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }

      const width = canvas.width;
      const height = canvas.height;
      const lineHeight = height / lines;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.5;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        // Different colors for different "channels"
        const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];
        ctx.strokeStyle = colors[i % colors.length];
        
        const yBase = (i * lineHeight) + (lineHeight / 2);

        for (let x = 0; x < width; x++) {
            // Simulate brainwaves: Mixture of sine waves + noise
            const freq1 = 0.02 + (i * 0.01);
            const freq2 = 0.05 + (i * 0.02);
            
            const noise = (Math.random() - 0.5) * 5;
            const signal = Math.sin((x + offset) * freq1) * 10 + 
                           Math.sin((x + offset * 1.5) * freq2) * 5;
            
            const y = yBase + signal + noise;
            
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      offset += speed;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-inner ${compact ? 'h-32' : 'h-48'} flex flex-col`}>
      <div className="flex justify-between items-center px-3 py-1 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono text-green-400 uppercase tracking-wider">LIVE RECORDING</span>
        </div>
        <span className="text-xs text-gray-400 font-mono">128Hz</span>
      </div>
      <div className="relative flex-1 w-full">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute top-2 right-2 text-[10px] text-gray-500 font-mono text-right bg-gray-900/50 p-1 rounded">
           CH1: Fp1<br/>
           CH2: Fp2<br/>
           CH3: T3<br/>
           CH4: T4
        </div>
      </div>
      <div className="px-3 py-1 bg-gray-800 border-t border-gray-700">
         <p className="text-[10px] text-gray-400">{t.eeg.status}</p>
         {!compact && <p className="text-[10px] text-gray-500 italic mt-0.5">{t.eeg.description}</p>}
      </div>
    </div>
  );
};

export default EegSimulator;