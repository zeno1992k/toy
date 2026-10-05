import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { useState,useEffect } from 'react';
function App(){
  const [keyword, setKeyword] = useState('');
  const [videos, setVideos] = useState([]);

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

  return(
    <div className="app">
      <Header onSearch={setKeyword}></Header>
      <Sidebar></Sidebar>
      <Content keyword={keyword} videos={videos}></Content>
    </div>
  );
}
export default App;
