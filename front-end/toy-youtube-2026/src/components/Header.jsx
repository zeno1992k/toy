import { useState } from 'react';
function Header({ onSearch} ){
  const [searchText, setSearchText] = useState('');

  function handleSubmit(event){
    event.preventDefault();
    const query = searchText.trim();
    onSearch(query);
  }
  return (
  <header className="[grid-area:header] flex items-center justify-between px-6 py-4 border-b border-gray-200">
    <h1 className="inline-flex items-center gap-2.5">
      <a className="flex gap-2" href="/">
        <img src="/icon.png" alt="" width="30" height="30"/>
        <span className="">zenotube</span>
      </a>
    </h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="VIDEO_SEARCH">검색어</label>
      <input id="VIDEO_SEARCH" value={searchText} onChange={(event)=>setSearchText(event.target.value)} type="text" placeholder='검색어'/>
      <button type="submit">검색</button>
    </form>
  </header>
  );
}

export default Header;
