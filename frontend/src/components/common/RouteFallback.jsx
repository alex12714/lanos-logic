import React from 'react';

// Lightweight, on-brand route-transition fallback. Full-viewport, centered
// spinner with no layout shift. Intentionally renders no <footer> so the
// prerender crawler (which waits for a <footer> before capturing) never
// snapshots this fallback instead of real route content.
const RouteFallback = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
    }}
    role="status"
    aria-label="Loading"
  >
    <div
      style={{
        width: 40,
        height: 40,
        border: '3px solid rgba(255, 107, 31, 0.2)',
        borderTopColor: '#FF6B1F',
        borderRadius: '50%',
        animation: 'route-fallback-spin 0.7s linear infinite',
      }}
    />
    <style>{'@keyframes route-fallback-spin{to{transform:rotate(360deg)}}'}</style>
  </div>
);

export default RouteFallback;
