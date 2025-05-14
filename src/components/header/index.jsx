import { IoIosNotifications } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import './index.scss';

export default function Header(){
  return (
    <header className="container-header">
      <article className="search"></article>
      <article className="header-main">
        <div className="notification">
          <IoIosNotifications />
          <p>2</p>
        </div>
        <div className="message">
          <CiMail />
          <p>3</p>
        </div>
        <div className="user">
          <h2>Nome</h2>
          <h3>imagem</h3>
        </div>
      </article>
    </header>
  )
}