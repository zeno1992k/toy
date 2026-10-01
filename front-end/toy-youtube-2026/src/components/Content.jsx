// Header.jsx
import './Content.css';
function Content(){
  return(
    <main className="content">
      <div role="group" aria-label="영상 카테고리">
        <button type="button">전체</button>
        <button type="button">음악</button>
        <button type="button">게임</button>
      </div>

      <ul>
        <li>영상1</li>
        <li>영상1</li>
        <li>영상2</li>
      </ul>

    </main>
  )
}
export default Content;
