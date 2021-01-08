import IncomeInfo from './components/TotalIncomeInfo';
<<<<<<< HEAD
import ExpenseInfo from './components/TotalExpenseInfo';
import Prediction from './components/Prediction';
import SpendRank from './components/SpendRank';
import NavBar from './components/NavBar'
=======
import ExpenseInfo from './components/TotalExpenseInfo'
import NavBar from './components/NavBar.js';
import Wrapped from './components/Wrapped.js';
import SpendRank from './components/SpendRank';
>>>>>>> bc9ca72f4b231ba946890920ac18145e8c1b51e9
import Utilities from './components/Utilities';
import Subscriptions from './components/Subscriptions';
import Food from './components/Food';
import Transportation from './components/Transportation';
import Other from './components/Other';
import './index.css';

function App() {
  return (
<<<<<<< HEAD
    <div class='box-content overflow-scroll bg-emerald-300 shadow-lg'>
      <NavBar />
      <div class='flex box-border border-b border-gray-900 bg-emerald-500 justify-evenly p-12'>
        <IncomeInfo />
      </div>
      <div class='flex justify-center p-12 bg-red-500'>
        <ExpenseInfo />
      </div>
      <div class='flex justify-evenly p-5 bg-teal-100'>
        <Prediction />
      </div>
      <div class='flex justify-center p-12 bg-amber-500'>
        <SpendRank />
      </div>
      <div class="flex justify-center p-12 bg-yellow" style={{ color: '#0982D9', backgroundColor: '#39e382' }}>
        <Utilities />
      </div>
      <div class="flex justify-center p-12 bg-orange-600" style={{ color: '#AB079A', backgroundColor: '#262629' }}>
        <Food />
      </div>
      <div class="flex justify-center p-12 bg-gray-400" style={{ color: '#E8A010', backgroundColor: '#02CCC5' }}>
        <Subscriptions />
      </div>
      <div class="flex justify-center p-12 bg-purple-400" style={{ color: '#BF1B47', backgroundColor: '#E810A0' }}>
        <Transportation />
      </div>
      <div class="flex justify-center p-12 bg-purple-400" style={{ color: '#966C00', backgroundColor: '#F2CB1B' }}>
        <Other />
=======
    <div class='box-content bg-amber-100 overflow-scroll'>
      <div> 
        <NavBar />
      </div>
      <div class="flex box-border justify-center p-12 border-b border-gray-900">
        <Wrapped />
      </div>
      <div class='flex box-border border-b border-gray-900 justify-evenly p-12'>
          <IncomeInfo/>
      </div>
      <div class='flex box-border border-b border-gray-900 justify-center p-12 bg-red-500'>
        {/* <span class='block text-lg text-white'>This the rest of the site</span> */}
          <ExpenseInfo/>
>>>>>>> bc9ca72f4b231ba946890920ac18145e8c1b51e9
      </div>
      <div class="flex justify-center p-12 bg-orange-600"style={{ color: '#0982D9', backgroundColor: '#5C727A' }}>
        <SpendRank/>
      </div>
      <div class="flex justify-center p-12 bg-yellow" style={{ color: '#0982D9', backgroundColor: '#39e382' }}>
        <Utilities/>
      </div>
      <div class="flex justify-center p-12 bg-orange-600"style={{ color: '#AB079A', backgroundColor: '#262629' }}>
        <Food/>
      </div>
      <div class="flex justify-center p-12 bg-gray-400"style={{ color: '#E8A010', backgroundColor: '#02CCC5' }}> 
        <Subscriptions/>
      </div>
      <div class="flex justify-center p-12 bg-purple-400"style={{ color: '#BF1B47', backgroundColor: '#E810A0' }}>
        <Transportation/>        
      </div>
      <div class="flex justify-center p-12 bg-purple-400"style={{ color: '#966C00', backgroundColor: '#F2CB1B' }}>
        <Other/>        
      </div>

    </div>
  );
}

export default App;
