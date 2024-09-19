import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  console.log('Environment Variables:');
  console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

  return (
    <>
      <div>
        <h1>ENV var check</h1>
      </div>
      <div className='container'>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
