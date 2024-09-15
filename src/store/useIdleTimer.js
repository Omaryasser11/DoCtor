import { useState, useEffect } from 'react';

const useIdleTimer = (timeoutDuration, onIdle) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timer;

    // Function to reset the timer
    const resetTimer = () => {
      setShowAlert(false); // Hide alert when user is active
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowAlert(true); // Show alert before calling onIdle
        onIdle();
      }, timeoutDuration);
    };

    // Function to handle browser tab visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetTimer();
      }
    };

    // Set up event listeners
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
    document.addEventListener("scroll", resetTimer); // Optional: also reset on scroll
    document.addEventListener("visibilitychange", handleVisibilityChange); // Handle tab visibility change

    // Initialize timer
    resetTimer();

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("scroll", resetTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange); // Clean up visibility change listener
    };
  }, [timeoutDuration, onIdle]);

  return { showAlert };
};

export default useIdleTimer;
