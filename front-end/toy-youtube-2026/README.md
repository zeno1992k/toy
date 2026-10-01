# 리액트 멘토링
https://toy-youtube.vercel.app/

## 프로젝트 수준

- Youtube 서비스
- Youtube API
- React 공식문서
- useState
- useEffect

## 작업 기록

### 2026-09-14(월)

- 기초 뼈대 작업 (개발환경, HTML, CSS)

### 2026-09-19(토)

- Header, Sidebar, Content를 컴포넌트별 파일로 분리
- App.jsx에서 컴포넌트를 import해 전체 화면 구성
- Header에 검색 폼, 입력창, 버튼의 기본 구조 작성
- Flex로 서비스 제목과 검색 폼을 가로 배치
- label과 htmlFor, input id의 연결 방식 학습
- `htmlFor`: label을 입력창과 연결하는 JSX 속성. input의 `id`와 같은 값을 지정하며, 라벨을 누르면 해당 입력창에 포커스가 이동한다.
- Header.css, Sidebar.css, Content.css로 스타일 분리하고 각 JSX에서 import
- App.css는 전체 Grid 배치, index.css는 공통 스타일 담당
- 헤더에 로고와 zenotube 이름을 홈 링크로 구성하고 Flex로 정렬
- public에 로고·파비콘·Apple 아이콘·OG 이미지 추가
- index.html에 아이콘 링크와 Open Graph 메타데이터 초안 작성
- npm run lint, npm run build 통과
