import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  return (
      <div>
      <Header />
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Konten utama akan masuk sini */}
        <Main/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
