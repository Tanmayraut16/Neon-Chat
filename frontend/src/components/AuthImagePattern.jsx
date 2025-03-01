import React, { useEffect, useRef, useState } from "react";
import { MessageSquare } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState("dark"); // Default fallback

  // Get theme from localStorage on component mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    
    // Listen for theme changes
    const handleStorageChange = () => {
      const updatedTheme = localStorage.getItem("theme") || "dark";
      setTheme(updatedTheme);
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Get theme-specific colors
  const getThemeColors = () => {
    // Theme-specific color mappings
    const themeColorMap = {
      light: {
        gradientFrom: "from-primary/90",
        gradientTo: "to-primary-focus",
        particleColor: "rgba(var(--primary-rgb), 0.2)",
        shapeBg1: "bg-primary/10",
        shapeBg2: "bg-accent/20",
        shapeBg3: "bg-secondary/10",
        cardBg: "bg-base-100/10",
        borderColor: "border-base-content/10",
        textColor: "text-base-content",
        textColorMuted: "text-base-content/70"
      },
      dark: {
        gradientFrom: "from-primary/90",
        gradientTo: "to-primary-focus",
        particleColor: "rgba(255, 255, 255, 0.2)",
        shapeBg1: "bg-white/10",
        shapeBg2: "bg-accent/20",
        shapeBg3: "bg-secondary/10",
        cardBg: "bg-white/10",
        borderColor: "border-white/20",
        textColor: "text-white",
        textColorMuted: "text-white/70"
      },
      // Add more themes as needed
    };
    
    // Return colors for the current theme or fallback to dark
    return themeColorMap[theme] || themeColorMap.dark;
  };

  const colors = getThemeColors();

  // Interactive canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 80;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colors.particleColor,
        velocity: {
          x: Math.random() * 0.5 - 0.25,
          y: Math.random() * 0.5 - 0.25
        }
      });
    }

    // Draw animation
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between nearby particles
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.strokeStyle = `rgba(var(--primary-rgb), ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw and update particles
      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;
      });
      
      requestAnimationFrame(draw);
    };
    
    draw();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [colors]);

  return (
    <div className={`hidden lg:block relative bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} overflow-hidden`}>
      {/* Animated background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-70"
      />
      
      {/* Decorative shapes */}
      <div className={`absolute top-0 right-0 w-64 h-64 ${colors.shapeBg1} rounded-bl-full backdrop-blur-lg`}></div>
      <div className={`absolute -bottom-8 -left-8 w-40 h-40 ${colors.shapeBg2} rounded-full backdrop-blur-md`}></div>
      <div className={`absolute top-1/3 right-1/4 w-20 h-20 ${colors.shapeBg3} rounded-lg rotate-45 backdrop-blur-sm`}></div>
      
      {/* Glass card */}
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div className={`backdrop-blur-xl ${colors.cardBg} rounded-3xl p-8 w-full max-w-md ${colors.borderColor} border shadow-xl relative overflow-hidden`}>
          {/* Card decorative element */}
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-md"></div>
          
          {/* Icon with glow effect */}
          <div className="relative mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30"></div>
            <div className="relative bg-primary/20 rounded-full p-4 backdrop-blur-sm">
              <MessageSquare className={`w-8 h-8 ${colors.textColor}`} />
            </div>
          </div>
          
          {/* Content */}
          <h2 className={`text-3xl font-bold ${colors.textColor} mb-4`}>{title}</h2>
          <p className={`${colors.textColorMuted} text-lg mb-8`}>{subtitle}</p>
          
          {/* Feature dots */}
          <div className="flex space-x-1 mt-12 mb-2">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${colors.textColorMuted}`}
                style={{ 
                  animationName: 'pulse', 
                  animationDuration: '1.5s', 
                  animationIterationCount: 'infinite',
                  animationDelay: `${index * 0.3}s` 
                }}
              ></div>
            ))}
          </div>
          
          {/* Bottom pattern */}
          <div className="absolute -right-2 -bottom-2 w-32 h-32">
            <div className="relative">
              {[...Array(3)].map((_, index) => (
                <div 
                  key={index}
                  className={`absolute ${colors.shapeBg1} rounded-full`}
                  style={{
                    width: `${60 - index * 20}px`,
                    height: `${60 - index * 20}px`,
                    right: `${index * 10}px`,
                    bottom: `${index * 10}px`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;