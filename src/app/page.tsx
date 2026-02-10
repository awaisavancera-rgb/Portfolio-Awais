// Temporarily simplified version for debugging
export default function Home() {
  return (
    <main id="main-content" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: '#000',
      minHeight: '100vh',
      padding: '2rem',
      color: '#fff'
    }}>
      <h1>Muhammad Awais - Portfolio</h1>
      <p>✅ Basic Next.js rendering works</p>
      <p>🔧 Debugging client-side components...</p>
      
      {/* Gradually uncomment these to isolate the problematic component */}
      {/* <Banner /> */}
      {/* <IntroScroll /> */}
      {/* <Portfolio /> */}
    </main>
  );
}

