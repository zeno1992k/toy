import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { useState,useEffect,useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import VideoDetail from './components/VideoDetail';

function App(){
  const [keyword, setKeyword] = useState('');
  const [videos, setVideos] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarDialogRef = useRef(null);
  const navigate = useNavigate();

  function handleSearch(query){
    setKeyword(query);
    navigate('/')
  }
  function toggleSidebar(){
    setIsSidebarOpen((prev)=> !prev);
  }

  function closeSidebar(){
    setIsSidebarOpen(false);
  }

  function handleDialogClick(event){
    if(event.target === event.currentTarget){
      closeSidebar();
    }
  }

  useEffect(()=>{
    const controller = new AbortController();
    async function loadVideos(){
      try{
        const params = new URLSearchParams({q:keyword});
        const response = await fetch(`/api/videos?${params}`, { signal: controller.signal, });
        const data = await response.json();
        if(!response.ok){
          throw new Error(data.error?.message ?? "영상 요청 실패");
        }
        setVideos(data.items ?? []);
      }catch(error){
        if (error.name !== 'AbortError'){
          console.error(error.message);
        }
      }
    }
    loadVideos();
    return () => controller.abort();
  },[keyword]);

  useEffect(()=>{
    const dialog = sidebarDialogRef.current;
    if(isSidebarOpen){
      dialog.showModal();
    }else{
      dialog.close();
    }
  },[isSidebarOpen]);
  return(
    <div className="app">
      <Header onSearch={handleSearch} onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen}></Header>
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<Content keyword={keyword} videos={videos} />} />
        <Route path="/watch/:videoId" element={<VideoDetail/>} />
      </Routes>

      <dialog
        id="SIDEBAR_DIALOG"
        ref={sidebarDialogRef}
        className="sidebar-dialog"
        aria-label="메뉴"
        onClick={handleDialogClick}
        onClose={closeSidebar}
      >
        <div className="sidebar-panel">
          <button type="button" onClick={closeSidebar} className="m-4">
            메뉴 닫기
          </button>
          <Sidebar />
        </div>
      </dialog>
    </div>
  );
}
export default App;
