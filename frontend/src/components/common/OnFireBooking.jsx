import React, { useEffect, useRef } from 'react';

// OnFire booking calendar (replaces the GoHighLevel widget).
// Uses OnFire's own loader, which frames calendar.onfire.so/embed/<user>/<service>,
// themes it to match this page, and resizes it to fit its content.
export const BOOKING_SERVICE = 'alex12714/discovery-call';
export const BOOKING_PAGE_URL = 'https://onf.to/alex12714/service/discovery-call';
const LOADER_SRC = 'https://calendar.onfire.so/embed.js';

let seq = 0;

const OnFireBooking = ({ service = BOOKING_SERVICE, className = '' }) => {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    seq += 1;
    const id = `onfire-booking-${seq}`;
    host.id = id;
    host.innerHTML = '';

    const script = document.createElement('script');
    script.src = LOADER_SRC;
    script.async = true;
    script.dataset.service = service;
    script.dataset.target = `#${id}`;
    script.dataset.theme = 'dark';
    script.dataset.accent = '#f59e0b';
    script.dataset.radius = '12';
    document.body.appendChild(script);

    return () => {
      script.remove();
      host.innerHTML = '';
    };
  }, [service]);

  return (
    <div className={className}>
      <div ref={hostRef} style={{ minHeight: 640 }} />
      <p className="text-center text-xs text-gray-500 py-3">
        Calendar not loading?{' '}
        <a href={BOOKING_PAGE_URL} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300">
          Open the booking page
        </a>
      </p>
    </div>
  );
};

export default OnFireBooking;
