import Header from '../../components/header';
import SalesChart from '../Sales/SalesChart';
import './index.scss';

import { MdOutlineReportProblem } from "react-icons/md";

export default function Dashboard() {
  return (
    <section className="container-home">
      <Header />
      <div className='report'>
        <h1 className='title-home'>Dashboard</h1>
        <div>
          <MdOutlineReportProblem className='icon'/>
          <a href="">Reportar Problema</a>
        </div>
      </div>

      <article className="home-head">
        <div className="monthly">
          <h3>Earning Month</h3>
          <p>R$40,000</p>
        </div>
        <div className="annual">
          <h3>Earning Month</h3>
          <p>R$40,000</p>
        </div>
        <div className="taks">
          <h3>Earning Month</h3>
          <p>R$40,000</p>
        </div>
        <div className="pendind">
          <h3>Earning Month</h3>
          <p>R$40,000</p>
        </div>
      </article>

      <article className="home-main">
        <div className="graphic-sales">
          <SalesChart />
        </div>
      </article>
    </section>
  );
}