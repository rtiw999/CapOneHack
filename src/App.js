import IncomeInfo from './components/TotalIncomeInfo';
import ExpenseInfo from './components/TotalExpenseInfo';
import SpendRank from './components/SpendRank';
import NavBar from './components/NavBar'
import './index.css';
import Prediction from './components/Prediction';

function App() {
  return (
      <div class='box-content overflow-scroll bg-emerald-300 shadow-lg'>
        <NavBar />
        <div class='flex box-border border-b border-gray-900 bg-emerald-500 justify-evenly p-12'>
          <IncomeInfo />
        </div>
        <div class='flex justify-center p-12 bg-red-500'>
          {/* <span class='block text-lg text-white'>This the rest of the site</span> */}
          <ExpenseInfo />
        </div>
        <div class='flex justify-center p-12 bg-amber-500'>
          <SpendRank />
        </div>
        <div class='flex justify-evenly p-12 bg-teal-100'>
          <Prediction />
        </div>
      </div >
  );
}

export default App;
