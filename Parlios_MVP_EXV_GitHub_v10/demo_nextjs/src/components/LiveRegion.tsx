'use client';
export default function LiveRegion() {
  return (
    <>
      <div id="sr-status" role="status" aria-live="polite" className="sr-only" />
      <div id="sr-error" role="alert" aria-live="assertive" className="sr-only" />
    </>
  );
}
