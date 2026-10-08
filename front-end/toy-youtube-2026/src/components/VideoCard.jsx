import { Link } from 'react-router';

function VideoCard({video}){

  return(
    <Link to={`/watch/${video.id}`} className="block">
      <article>
        <img className="w-full" src={video.snippet.thumbnails.medium.url} alt="" />
        <h2>{video.snippet.title}</h2>
        <p>{video.snippet.channelTitle}</p>
      </article>
    </Link>

  );
}

export default VideoCard;
