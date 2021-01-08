import './App.css';
import IncomeInfo from './components/TotalIncomeInfo';
import ExpenseInfo from './components/TotalExpenseInfo'
import NavBar from './components/NavBar.js';
// import Wrapped from './components/Wrapped.js';
import SpendRank from './components/SpendRank'
import './index.css';

function App() {
  return (
    <div class='box-content overflow-scroll'>
      <div> 
        <NavBar />
      </div>
      {/* <div class="flex box-border justify-center p-12 border-b border-gray-900"> */}
        {/* <Wrapped />
      </div> */}
      <div class='flex box-border border-b border-gray-900 bg-emerald-500 justify-evenly p-12'>
          <IncomeInfo/>
      </div>
      <div class='flex justify-center p-12 bg-red-500'>
        {/* <span class='block text-lg text-white'>This the rest of the site</span> */}
          <ExpenseInfo/>
      </div>
    </div>
  );
}

export default App;
