// Header.jsx
import './Content.css';
function Content({keyword, videos}){
  return(
    <main className="content">
      {keyword !=='' && <p>검색어: {keyword}</p>}
      <div role="group" aria-label="영상 카테고리">
        <button type="button">전체</button>
        <button type="button">음악</button>
        <button type="button">게임</button>
      </div>

      <ul>
        {videos.map((video)=>
          <li key={video.id}>{video.snippet.title}</li>
        )}
      </ul>

    </main>
  )
}
export default Content;
