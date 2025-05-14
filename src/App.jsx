import Sidebar from './components/sidebar';
import './styles/App.scss';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <section className="container-app">
      <Sidebar />
      <Outlet />
    </section>
  );
}
