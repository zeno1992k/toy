# Toy projects

프런트엔드, 퍼블리싱, UI/UX를 직접 구현하며 학습하는 프로젝트 모음입니다. 하나의 저장소 안에서 프로젝트별 폴더를 관리합니다.

## 프로젝트와 현재 진행 상태

| 위치 | 기술 / 자료 | 현재 구현 및 준비 상태 |
| --- | --- | --- |
| `front-end/toy-youtube-2026` | React, Vite, Tailwind CSS | 검색어 입력·제출·표시, YouTube API로 한국 인기 영상 10개 조회 및 제목 목록 표시 |
| `front-end/toy-notion-2026` | HTML, CSS, JavaScript | 사이드바·문서 목록·본문의 정적 마크업, CSS Reset과 색상·간격 토큰, 기본 스타일 |
| `front-end/toy-popmap-2026/web` | Next.js, TypeScript, Tailwind CSS | 시작 프로젝트 생성, 강의 연계와 학습 목차 작성 단계 |
| `front-end/toy-space-2026` | React, Vite | 기본 카운터 시작 프로젝트 |
| `publishing/toy-headphone-launch-2026` | Vite, Sass | 개발 의존성 초기 설정 단계; 화면과 실행·빌드 명령은 준비 전 |
| `publishing/toy-record-label-2026` | HTML | AFTERGROOVE 제목과 소개 문장으로 시작한 페이지 |
| `publishing/toy-stargazing-2026` | HTML, CSS, JavaScript | 빈 시작 파일, 강의 활용 및 학습 문서 준비 단계 |
| `publishing/2022` | HTML, CSS, JavaScript | 기존 퍼블리싱 프로젝트 9개를 연도별 폴더로 정리 |
| `uiux` | PDF | UI/UX 학습 자료 |

YouTube의 입력한 검색어로 영상을 검색하는 기능, 썸네일 카드와 재생 기능은 아직 구현하지 않았습니다. Notion의 문서 편집·버튼 동작과 사이드바/본문의 두 열 레이아웃도 다음 학습 범위입니다. 새 시작 프로젝트는 서비스 기능 구현을 완료한 상태가 아닙니다.

## 2022 퍼블리싱 프로젝트

- `toy-company-style-2022`
- `toy-member-card-2022`
- `toy-mgbox-2022`
- `toy-music-play-2022`
- `toy-panorama-2022`
- `toy-responsive-gallery-2022`
- `toy-starbucks-2022`
- `toy-swipe-2022`
- `toy-villa-animation-2022`

기존 파일을 `publishing/2022/` 아래로 이동해 보관합니다. `toy-member-card-2022`는 `index.html` 대신 `member1.html`부터 `member4.html`을 진입 페이지로 사용합니다.

## 로컬 실행

YouTube는 프로젝트 폴더에서 실행합니다.

```sh
cd front-end/toy-youtube-2026
npm ci
npm run dev
```

인기 영상 조회에는 이 폴더의 `.env.local`에 `VITE_YOUTUBE_API_KEY` 설정이 필요합니다. 실제 키는 저장소에 포함하지 않습니다. `VITE_` 환경변수는 빌드된 브라우저 코드에 포함되므로 Google Cloud에서 YouTube Data API 사용 제한과 허용 웹사이트 제한을 설정합니다.

Popmap은 `front-end/toy-popmap-2026/web`에서 `npm ci` 후 `npm run dev`로 실행합니다. Space는 `front-end/toy-space-2026`에서 `npm install` 후 `npm run dev`로 실행합니다. 정적 HTML 프로젝트는 Live Server 등 로컬 웹 서버로 확인합니다.

## 검증과 배포

YouTube와 Space는 각 프로젝트의 `npm run lint`, `npm run build` 명령을 사용합니다. Popmap도 자체 `package.json`의 명령으로 검증합니다. 아직 실행·빌드 명령을 준비하지 않은 프로젝트는 별도로 구분합니다.

Vercel에는 이 저장소를 연결하고 프로젝트마다 Root Directory를 지정해 배포할 수 있습니다. YouTube는 `front-end/toy-youtube-2026`의 Vite 빌드 결과 `dist`를, Notion은 `front-end/toy-notion-2026`의 정적 파일을 배포 대상으로 설정합니다. YouTube API 키는 배포 서비스의 환경변수에도 별도로 등록해야 합니다.

## 저장소 관리

의존성 폴더, 빌드 결과, 실제 환경변수, 로컬 참고 자료·기획 메모·AI 작업 기록 및 도구 설정은 `.gitignore`로 제외합니다. 앱 소스, 패키지 설정과 잠금 파일, 공개 학습 문서는 프로젝트별로 관리합니다.
