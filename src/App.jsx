import Sidebar from './components/sidebar';
import './styles/App.scss';
import Dashboard from './pages/dashboard';
import { useState } from 'react';

export default function App() {
  const [activeView, setActiveView] = useState('');

  return (
    <section className="container-app">
      <Sidebar setActiveView={setActiveView} /> {/* Passa setActiveView para Sidebar */}
      <Dashboard activeView={activeView} setActiveView={setActiveView} /> {/* Passa activeView e setActiveView para Dashboard */}
    </section>
  );
}