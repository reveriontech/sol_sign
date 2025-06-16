import React from 'react';

const PageLoader = () => {
  const [rotation, setRotation] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 4);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const styles = {
    pageLoader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
      fontFamily: "'Google Sans', 'Helvetica Neue', sans-serif"
    },
    loaderContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      fontSize: '1.25rem',
      color: '#5f6368',
      fontWeight: 400
    },
    svg: {
      width: '64px',
      height: '64px',
      display: 'block',
      transform: `rotate(${rotation}deg)`,
      transition: 'transform 0.1s linear'
    }
  };

  return (
    <div style={styles.pageLoader}>
      <div style={styles.loaderContent}>
        <svg style={styles.svg} viewBox="0 0 64 64">
          <path d="M16 32a16 16 0 0 1 16-16" stroke="#222" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M32 16a16 16 0 0 1 16 16" stroke="#222" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M48 32a16 16 0 0 1-16 16" stroke="#222" strokeWidth="6" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
};

export default PageLoader;