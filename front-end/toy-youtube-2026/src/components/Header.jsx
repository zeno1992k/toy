import './Header.css';
function Header(){
  return (
  <header className="header">
    <h1 className="brand">
      <a className="brand-link" href="/">
        <img src="/icon.png" alt="" width="30" height="30"/>
        <span>zenotube</span>
      </a>
    </h1>
    <form action="">
      <label htmlFor=""></label>
      <input id="" type="text" placeholder='검색어'/>
      <button>검색</button>
    </form>
  </header>
  );
}

export default Header;
