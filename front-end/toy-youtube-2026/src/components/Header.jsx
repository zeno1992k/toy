import { useState } from 'react';
function Header({ onSearch, onMenuToggle, isSidebarOpen } ){
  const [searchText, setSearchText] = useState('');

  function handleSubmit(event){
    event.preventDefault();
    const query = searchText.trim();
    onSearch(query);
  }
  return (
  <header className="[grid-area:header] flex min-w-0 items-center justify-between gap-3 px-4 py-4 border-b border-gray-200">
    <div className="flex shrink-0 items-center gap-2">
    <button
      type="button"
      className="menu-toggle shrink-0 p-2"
      onClick={onMenuToggle}
      aria-label="메뉴 열기"
      aria-expanded={isSidebarOpen}
      aria-controls="SIDEBAR_DIALOG"
    >
      ☰
    </button>
    <h1 className="inline-flex items-center gap-2.5">
      <a className="flex items-center gap-2 whitespace-nowrap" href="/">
        <img src="/icon.png" alt="" width="30" height="30"/>
        <span className="">zenotube</span>
      </a>
    </h1>
    </div>
    <form className="flex min-w-0 flex-1 max-w-xl items-center gap-2" onSubmit={handleSubmit}>
      <label htmlFor="VIDEO_SEARCH" className="sr-only">검색어</label>
      <input className="w-full min-w-0 flex-1" id="VIDEO_SEARCH" value={searchText} onChange={(event)=>setSearchText(event.target.value)} type="text" placeholder='검색어'/>
      <button className="shrink-0" type="submit">검색</button>
    </form>
  </header>
  );
}

export default Header;
