// Header.jsx
import VideoCard from './VideoCard';

function Content({keyword, videos }){
  return(
    <main className="[grid-area:content] min-w-0 p-6">
      {keyword !=='' && <p>검색어: {keyword}</p>}
      <div role="group" aria-label="영상 카테고리">
        <button type="button">전체</button>
        <button type="button">음악</button>
        <button type="button">게임</button>
      </div>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6">
        {videos.map((video)=>
          <li key={video.id}>
            <VideoCard video={video}/>
          </li>
        )}
      </ul>

    </main>
  )
}
export default Content;
