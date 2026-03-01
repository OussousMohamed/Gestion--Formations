import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar';
import TopBar from './components/TopBar';
import EmployeeList from './components/EmployeeList';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <Router>
      <div className="flex bg-slate-50 dark:bg-slate-900 min-h-screen">
        <Toaster position="top-center" reverseOrder={false} />
        {/* Sidebar stays fixed */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 h-screen">
          <TopBar />
          <div className="w-full">
            <Routes>
              <Route path="/" element={<div>Dashboard Coming Soon...</div>} />
              <Route path="/employees" element={<EmployeeList />} />
              {/* Add other routes here */}
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
