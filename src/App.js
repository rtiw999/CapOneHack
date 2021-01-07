import './App.css';
import { Card } from './components/Card';
import NavBar from './components/NavBar.js';
import Wrapped from './components/Wrapped.js';
import './index.css';

function App() {
  return (
    <div class='box-content bg-amber-100 overflow-scroll'>
      <div> 
        <NavBar />
      </div>
      <div class="flex box-border justify-center p-12 border-b border-gray-900">
        <Wrapped />
      </div>
      <div class='flex box-border border-b border-gray-900 justify-evenly p-12'>
          <Card textColor='amber'/>
      </div>
      <div class='flex justify-center p-12 bg-red-500'>
        {/* <span class='block text-lg text-white'>This the rest of the site</span> */}
          <Card textColor='blue'/>
      </div>
    </div>
  );
}

export default App;
