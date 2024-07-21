import './App.css';
import Header from './components/Header';
import JobDescription from './components/JobDescription';
import JobFinder from './components/JobFinder';
import JobForm from './components/JobForm';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();
  const excludeHeaderPages = ['/register','/login','/jobform'];
  const shouldExcludeHeader = excludeHeaderPages.includes(location.pathname);

  return (
    <div>
      {!shouldExcludeHeader && <Header />}
      <Routes>
        <Route path="/" element={<JobFinder />} />
        <Route path="/jobdescription" element={<JobDescription />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobform" element={<JobForm />} />
      </Routes>
    </div>
  );
}

export default App;

        