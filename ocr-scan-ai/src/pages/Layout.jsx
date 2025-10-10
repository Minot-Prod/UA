
import React from 'react';

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <style>{`
        :root {
          --clay-shadow: 
            8px 8px 16px rgba(163, 177, 198, 0.3),
            -8px -8px 16px rgba(255, 255, 255, 0.8);
          --clay-shadow-inner: 
            inset 4px 4px 8px rgba(163, 177, 198, 0.2),
            inset -4px -4px 8px rgba(255, 255, 255, 0.9);
          --clay-shadow-pressed:
            inset 8px 8px 16px rgba(163, 177, 198, 0.3),
            inset -8px -8px 16px rgba(255, 255, 255, 0.6);
        }

        .shadow-clay {
          box-shadow: var(--clay-shadow);
        }

        .shadow-clay-inner {
          box-shadow: var(--clay-shadow-inner);
        }

        .shadow-clay-pressed {
          box-shadow: var(--clay-shadow-pressed);
        }

        /* Smooth transitions for clay elements */
        .shadow-clay, .shadow-clay-inner {
          transition: all 0.3s ease;
        }

        /* Hover effects for clay elements */
        .shadow-clay:hover {
          transform: translateY(-1px);
          box-shadow: 
            12px 12px 24px rgba(163, 177, 198, 0.3),
            -12px -12px 24px rgba(255, 255, 255, 0.9);
        }

        /* Hide scrollbars but keep functionality */
        .overflow-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Custom gradient backgrounds */
        .bg-gradient-clay {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(240, 240, 255, 0.4) 100%
          );
        }
      `}</style>
      
      {children}
    </div>
  );
}
