import { Link, useParams } from 'react-router';
import VideoPlayer from './VideoPlayer';

function VideoDetail(){
  const { videoId } = useParams();
  return(
    <main className="[grid-area:content] min-w-0 p-6">
      <Link to="/" className="mb-4 inline-block">목록으로</Link>
      <VideoPlayer videoId={videoId} title="영상 재생"/>
    </main>
  )
}
export default VideoDetail;
