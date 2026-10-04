function VideoCard({video}){
  return(
    <article>
      <img className="w-full" src={video.snippet.thumbnails.medium.url} alt="" />
      <h2>{video.snippet.title}</h2>
      <p>{video.snippet.channelTitle}</p>
    </article>
  );
}

export default VideoCard;
