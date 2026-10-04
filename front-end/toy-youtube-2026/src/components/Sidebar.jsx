function Sidebar(){
  return (
    <aside className="[grid-area:sidebar] p-4  border-r border-gray-200">
      <div>{/* 프로필 */}</div>

      <nav aria-label="구독 목록">
        <h2>구독</h2>
        <ul>
          <li>{/* 채널 링크 */}</li>
        </ul>
      </nav>

      <nav aria-label="마이 페이지">
        <h2>마이 페이지</h2>
        <ul>
          <li>{/* 기록 링크 */}</li>
          <li>{/* 재생목록 링크 */}</li>
        </ul>
      </nav>
    </aside>
  );
}
export default Sidebar;
