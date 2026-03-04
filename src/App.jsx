import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './components/SideBar';
import TopBar from './components/TopBar';
import EmployeeList from './components/EmployeeList';
import FormationList from './components/FormationList';
import ParticipationList from './components/ParticipationList';
import Dashboard from './components/Dashboard';
import Login from './components/Login'; 
import { Toaster } from 'react-hot-toast';

export default function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/*"
          element={
            user ? (
              <div className="flex bg-slate-50 dark:bg-[#0f172a] min-h-screen transition-colors duration-500">
                <Sidebar />
                <main className="flex-1 overflow-y-auto h-screen">
                  <TopBar />
                  <div className="w-full">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/employees" element={<EmployeeList />} />
                      <Route path="/formations" element={<FormationList />} />
                      <Route
                        path="/participations"
                        element={<ParticipationList />}
                      />
                    </Routes>
                  </div>
                </main>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
