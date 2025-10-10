import React from 'react';

export default function LiveBackground({ isDark }) {
  return (
    <>
      <style jsx>{`
        .background-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          background: ${isDark 
            ? 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #020617 100%)'
            : 'radial-gradient(ellipse at top, #ddd6fe 0%, #e0e7ff 50%, #f1f5f9 100%)'
          };
          transition: background 0.8s ease;
        }

        .aurora {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: ${isDark ? 0.4 : 0.6};
          mix-blend-mode: ${isDark ? 'screen' : 'multiply'};
        }

        .aurora-1 {
          width: 70vw;
          height: 70vh;
          background: var(--aurora-1);
          animation: drift-1 35s infinite alternate ease-in-out;
        }

        .aurora-2 {
          width: 60vw;
          height: 60vh;
          background: var(--aurora-2);
          animation: drift-2 40s infinite alternate-reverse ease-in-out;
        }

        .aurora-3 {
          width: 50vw;
          height: 90vh;
          background: var(--aurora-3);
          animation: drift-3 30s infinite alternate ease-in-out;
        }

        .aurora-4 {
          width: 40vw;
          height: 40vh;
          background: linear-gradient(45deg, var(--primary), var(--accent));
          opacity: 0.2;
          animation: drift-4 45s infinite alternate-reverse ease-in-out;
        }

        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, ${isDark ? 0.3 : 0.1});
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        @keyframes drift-1 {
          0% { transform: translate(-30vw, -40vh) rotate(0deg) scale(1); }
          100% { transform: translate(50vw, 30vh) rotate(180deg) scale(1.3); }
        }

        @keyframes drift-2 {
          0% { transform: translate(60vw, 50vh) rotate(0deg) scale(1); }
          100% { transform: translate(-20vw, -20vh) rotate(-180deg) scale(0.8); }
        }

        @keyframes drift-3 {
          0% { transform: translate(30vw, 70vh) rotate(0deg) scale(0.9); }
          100% { transform: translate(80vw, -30vh) rotate(120deg) scale(1.2); }
        }

        @keyframes drift-4 {
          0% { transform: translate(-10vw, 20vh) rotate(0deg) scale(1.1); }
          100% { transform: translate(40vw, 80vh) rotate(-90deg) scale(0.7); }
        }

        @keyframes float {
          0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) translateX(100px) rotate(360deg); opacity: 0; }
        }
      `}</style>
      <div className="background-container">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
        <div className="aurora aurora-4"></div>
        
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}