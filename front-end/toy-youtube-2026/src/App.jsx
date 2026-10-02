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
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        if(!apiKey) throw new Error('API 키 환경변수를 확인해 주세요.');
        const params = new URLSearchParams({
          part:'snippet',
          chart:'mostPopular',
          maxResults: '10',
          regionCode: 'KR',
          key: apiKey,
        });

        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params}`,{ signal: controller.signal })
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
  },[]);

  return(
    <div className="app">
      <Header onSearch={setKeyword}></Header>
      <Sidebar></Sidebar>
      <Content keyword={keyword} videos={videos}></Content>
    </div>
  );
}
export default App;
