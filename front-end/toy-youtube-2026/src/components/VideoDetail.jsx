import { Link, useParams } from 'react-router';
import VideoPlayer from './VideoPlayer';
import { useState, useEffect} from 'react';

function VideoDetail(){
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  useEffect(() => {
    async function loadVideo(){
      try{
        const response = await fetch(`/api/videos?id=${videoId}`);
        const data = await response.json();
        if(!response.ok){
          throw new Error(data.error?.message ?? '영상 요청 실패');
        }
        setVideo(data.items[0] ?? null);  
      }catch(error){
        console.error(error.message);
      } 
    }
    loadVideo();
  }, [videoId]);

  return(
    <main className="[grid-area:content] min-w-0 p-6">
      <Link to="/" className="mb-4 inline-block">목록으로</Link>
      <p>영상 ID : {videoId}</p>
      {video && (
        <>
          <VideoPlayer videoId={videoId} title={video.snippet.title}/>
          <p>{video.snippet.channelTitle}</p>
        </>
      )}     
    </main>
  )
}
export default VideoDetail;
