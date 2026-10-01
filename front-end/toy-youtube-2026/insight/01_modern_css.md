# 01. Modern CSS

CSS 문법을 외우기 위한 목록보다, 필요할 때 찾아보는 학습 노트로 사용한다. 예제는 각각 독립적이며 전부 복사해서 앱에 적용할 필요는 없다.

## 1. 기본 개념과 파일 역할

- `index.css`: 초기화, 공통 글꼴·색상·변수, 기본 포커스 스타일.
- `App.css`: 헤더·사이드바·본문 배치와 컴포넌트 스타일.
- 파일 이름이 CSS의 적용 범위를 제한하지는 않는다.
- **캐스케이드**: 출처·중요도·레이어·명시도·작성 순서 등으로 적용할 스타일을 결정하는 규칙.
- **명시도**: 선택자의 구체성. 같은 우선순위 조건에서 비교한다.
- **상속**: 글꼴·글자색 같은 일부 속성을 자식이 물려받는 것. 여백은 기본적으로 상속되지 않는다.

## 2. 기본 선택자

| 문법 | 의미 | 예시 |
| --- | --- | --- |
| `*` | 모든 요소, 명시도 0 | `* { box-sizing: border-box; }` |
| `:root` | HTML의 루트 요소 | 공통 CSS 변수 선언 |
| `>` | 직접 자식 | `.menu > li` |
| `+` | 바로 다음 형제 | `h2 + p` |
| `~` | 뒤따르는 형제 중 일치하는 요소 | `h2 ~ p` |
| 공백 | 깊이에 관계없이 자손 | `.sidebar a` |

## 3. :where(), :is(), :has(), :not(), &

- `:where()`: 선택자 묶음. 함수와 내부 선택자의 명시도는 0이라 초기 스타일을 덮어쓰기 쉽다.
- `:is()`: 선택자 묶음. 내부에서 가장 높은 명시도를 반영한다.
- `:has()`: 내부 요소나 뒤따르는 형제 등의 조건을 보고 해당 요소를 선택한다. 부모 전용 선택자는 아니다.
- `:not()`: 조건을 만족하지 않는 요소.
- `&`: 중첩 CSS의 바깥 선택자 참조.

```css
:where(h1, h2, p) { margin: 0; }
.sidebar :is(a, button) { font: inherit; }
.card:has(img) { padding: 12px; }
button:not(:disabled) { cursor: pointer; }

.card {
  background: white;
  &:hover { background: #eeeeee; }
}
```

`&:hover`는 이 예제에서 `.card:hover`다. 일반 CSS에서도 중첩을 사용할 수 있다.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

여기서 `*`는 이미 명시도 0이다. `::before`, `::after`는 가상 요소라 `:where()`나 `:is()`의 인자로 넣을 수 없다. `:where()`는 모든 선택자를 감싸는 필수 문법이 아니다.

참고: [MDN :where()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where), [MDN :is()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:is).

## 4. 상태 선택과 포커스

- `:hover`: 포인터가 올라온 상태.
- `:active`: 누르는 등 활성화 중인 상태.
- `:focus`: 해당 요소가 포커스를 받은 상태.
- `:focus-visible`: 브라우저가 포커스 표시가 필요하다고 판단한 상태. 키보드 탐색이 대표적이다.
- `:focus-within`: 자신 또는 자손에 포커스가 있는 상태.
- `:checked`: 체크박스·라디오 등의 선택 상태.
- `:disabled`: 입력 요소·버튼 등의 비활성 상태.
- `:invalid`: HTML 유효성 조건을 만족하지 않는 상태.

```jsx
<div className="search-box">
  <input type="search" aria-label="영상 검색" />
  <button type="button">검색</button>
</div>
```

```css
/* 입력창 자체 */
.search-box input:focus { background: #eef5ff; }

/* 입력창이나 버튼을 감싼 부모 */
.search-box:focus-within { outline: 2px solid blue; }

/* 키보드 조작 위치를 보여줌 */
:focus-visible {
  outline: 2px solid #065fd4;
  outline-offset: 3px;
}
```

포커스는 현재 조작 대상이고, 텍스트 선택과는 다르다. 포커스 외곽선을 무작정 제거하지 않는다.

### :invalid는 언제 적용되는가?

```jsx
<label>
  이메일
  <input type="email" required />
</label>
```

```css
input:invalid { border: 2px solid crimson; }
```

- 필수 입력인데 비어 있거나, 이메일 칸에 `hello`처럼 형식에 맞지 않는 값을 입력한 경우.
- `min`, `max`, `pattern` 같은 조건을 어긴 경우도 해당할 수 있다.
- 처음부터 빈 필수 입력창은 입력 전에도 invalid일 수 있다.
- 실제 오류 UI에는 색상 외에 이유를 설명하는 문구도 제공한다.

참고: [포커스 내부 상태](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-within), [입력 유효성](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:invalid).

## 5. 가상 요소

- `::before`, `::after`: 내용 앞뒤에 생성하는 가상 요소. 생성하려면 보통 `content`가 필요하다.
- `::placeholder`: 입력창의 placeholder 문구.
- `::selection`: 마우스 드래그나 키보드로 선택한 텍스트.
- `::marker`: 목록 앞의 점·번호. 모든 CSS 속성을 지원하지는 않는다.

```css
::selection {
  background: #ffe08a;
  color: #111111;
}

.menu li::marker {
  color: red;
  font-size: 1.2em;
}
```

`::marker`는 항목의 글자가 아닌 점·번호를 바꾼다. `list-style: none`이면 기본 목록 표시는 없어진다.

## 6. @media와 @container

`@media`는 화면·사용자 환경, 크기 `@container` 쿼리는 특정 조상 컨테이너의 크기를 확인한다.

```css
@media (width < 768px) {
  .sidebar { display: none; }
}
```

### 컨테이너 예제

```jsx
<div className="video-area">
  <article className="video-card">영상 정보</article>
</div>
```

```css
.video-area {
  container-type: inline-size;
  container-name: videos;
}

.video-card { padding: 8px; }

@container videos (width >= 600px) {
  .video-card { padding: 24px; }
}
```

- `container-type: inline-size`: 인라인 크기를 조회하도록 컨테이너를 설정한다.
- `container-name`: 개발자가 정하는 컨테이너 이름.
- 화면이 넓어도 `.video-area`가 좁으면 조건이 성립하지 않는다.
- 이 쿼리는 컨테이너 자신의 크기를 보고 자신을 꾸미는 용도가 아니라 자손을 꾸미는 용도다.

### cqw와 cqi

- `1cqw`: 해당 축의 조회 가능한 컨테이너 너비의 1%.
- `1cqi`: 조회 가능한 컨테이너 인라인 크기의 1%.
- 가로쓰기에서 컨테이너 너비가 500px이면 `2cqi = 10px`.
- 세로쓰기에서는 물리적 너비와 인라인 크기가 다르다.
- 적합한 컨테이너가 없으면 대응하는 작은 뷰포트 단위를 기준으로 계산된다.

```css
.video-card { padding: 2cqi; }
```

참고: [MDN 컨테이너 쿼리](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries).

## 7. @supports, @layer, @scope

### @supports: 기능 지원 검사

```css
.video-list { display: flex; }

@supports (display: grid) {
  .video-list { display: grid; }
}
```

해당 속성·값을 지원하면 내부 스타일을 적용한다. 화면의 완성도를 검사하는 기능은 아니다.

### @layer: 계층 간 우선순위

```css
@layer base, components;

@layer base {
  .title { color: gray; }
}

@layer components {
  .title { color: black; }
}
```

- 같은 출처의 일반 선언에서는 뒤에 정한 레이어가 우선한다.
- 예제에서는 검정색이 적용된다.
- 레이어 밖의 일반 선언은 레이어 안의 일반 선언보다 우선한다.
- `!important`에서는 레이어 우선순위가 반대다.
- `base`, `components`는 직접 정하는 이름이다.

### @scope: 선택자 적용 범위

```css
@scope (.video-card) {
  h2 { font-size: 18px; }
}
```

해당 카드 내부의 제목만 선택한다. 상속과 다른 규칙까지 차단하는 완전한 격리는 아니다.

참고: [@supports](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports), [@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer), [@scope](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@scope).

## 8. 변수, @property, 기타 @ 규칙

- `--변수명`: 재사용할 값.
- `var(--name, 대체값)`: 변수값 또는 대체값 사용.
- `@property`: 변수의 자료형·상속 여부·초기값 등록.
- `@import`: 다른 스타일시트 불러오기.
- `@font-face`: 웹폰트 정의.
- `@keyframes`: 애니메이션 단계 정의.

```css
:root { --color-text: #111111; }
body { color: var(--color-text, black); }

@property --card-color {
  syntax: "<color>";
  inherits: false;
  initial-value: orange;
}

.card { background: var(--card-color); }
```

`@property` 예제는 색상 변수로 등록하고 부모값을 자동 상속하지 않도록 정한다. 등록된 자료형은 변수 애니메이션에도 쓰인다. 단순 공통 색상에는 일반 변수만으로 충분하다.

참고: [MDN @property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property).

## 9. 계산과 환경값

- `calc()`: 계산. 예: `calc(100% - 220px)`.
- `min()`: 작은 값. 예: `min(100%, 1200px)`.
- `max()`: 큰 값. 예: `max(16px, 2vw)`.
- `clamp()`: 최소·선호·최대값. 예: `clamp(20px, 3vw, 36px)`.
- `env()`: 직접 만든 변수가 아닌 브라우저 환경값.

```css
.bottom-bar {
  padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
}
```

기본 여백에 기기 하단 안전 영역을 더한다. 홈 인디케이터 등에 내용이 가려지는 것을 줄일 때 쓴다. 안전 영역은 기기·브라우저·viewport 설정에 따라 달라지고 0일 수도 있다.

참고: [MDN env()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env).

## 10. 크기 단위

| 단위 | 기준 |
| --- | --- |
| `rem` | 루트 글자 크기 |
| `em` | 글자 크기. font-size에 쓰면 부모 기준 |
| `vw` | 화면 너비의 1% |
| `vh` | 현대 브라우저에서 큰 뷰포트 높이에 대응하는 1% |
| `svh` | 작은 뷰포트 높이의 1% |
| `lvh` | 큰 뷰포트 높이의 1% |
| `dvh` | 현재 변화하는 뷰포트 높이의 1% |
| `cqw`, `cqi` | 컨테이너 크기 기준. 6절 참고 |
| `fr` | Grid의 남는 공간을 나누는 비율 |

## 11. 레이아웃과 논리적 속성

- `flex`: 주로 한 방향의 배치.
- `grid`: 행·열 배치.
- `gap`: 항목 사이 간격.
- `repeat()`: Grid 트랙 반복.
- `minmax()`: 트랙 최소·최대 크기.
- `auto-fit`: 가능한 트랙을 만들고 빈 트랙은 접기.
- `auto-fill`: 가능한 트랙을 만들고 빈 트랙도 유지.
- `subgrid`: 부모 Grid의 트랙 공유.
- `aspect-ratio`: 가로·세로 비율.
- `sticky`: 스크롤 중 경계에 도달하면 위치 유지. 조상의 overflow·공간 영향을 받는다.

```css
.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 16px;
}
.thumbnail { aspect-ratio: 16 / 9; }
.header { position: sticky; top: 0; }
```

### 가로쓰기 기준의 논리적 속성

- `inline-size`: 너비.
- `block-size`: 높이.
- `margin-inline`, `padding-inline`: 좌우 여백.
- `margin-block`, `padding-block`: 위아래 여백.
- `inset-inline-start`: 배치된 요소의 인라인 시작 위치.

글쓰기 방향이 달라지면 실제 방향도 달라진다.

## 12. 색상과 텍스트·이미지

- `rgb()`: 빨강·초록·파랑.
- `hsl()`: 색상·채도·명도.
- `oklch()`: 지각적 밝기·채도·색상각.
- `color-mix()`: 지정한 색 공간에서 색 혼합.
- `light-dark()`: 현재 사용되는 색상 모드에 맞춰 색 선택.
- `color-scheme`: 지원하는 색상 모드 선언. 모든 사용자 정의 색을 자동 전환하지는 않는다.
- `text-wrap: balance`: 제목 등의 줄 길이 균형.
- `text-wrap: pretty`: 어색한 줄바꿈 줄이기.
- `overflow-wrap: anywhere`: 긴 문자열 줄바꿈.
- `object-fit: cover`: 영역을 비율 유지로 채우기. 일부 잘릴 수 있음.
- `object-position`: 이미지·영상의 영역 내부 정렬 위치.

```css
:root { color-scheme: light dark; }
body {
  background: light-dark(white, #121212);
  color: light-dark(#111111, #eeeeee);
}
```

## 13. 움직임과 스크롤

- `translate`: 이동. 예: `translate: 10px 0`.
- `rotate`: 회전. 예: `rotate: 3deg`.
- `scale`: 확대·축소. 예: `scale: 1.05`.
- `transform`: 변형 함수를 한 속성에 작성.
- `transition`: 속성값 변화 과정을 부드럽게 표현.
- `animation`: keyframes의 시간·반복 등을 지정.

변형만 지정하면 자동 애니메이션이 되지는 않는다. 변형은 주변 요소를 일반 레이아웃처럼 다시 배치하지 않는다.

### 스크롤 관련 기능

- `scroll-behavior: smooth`: 링크·스크립트에 의한 스크롤 이동을 부드럽게 한다. 모든 휠 동작을 바꾸는 것은 아니다.
- `scroll-snap-type`: 스크롤 부모의 스냅 방향·강도.
- `scroll-snap-align`: 자식의 정렬 지점.
- `scroll-margin-top`: 특정 요소로 이동할 때 위쪽 스크롤 여유 공간.

```css
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
}
#comments { scroll-margin-top: 80px; }
```

카드가 가로로 한 화면씩 놓이고 스크롤 종료 시 카드 시작점에 맞춘다. 자동 넘김·버튼은 별도 구현이다. `scroll-margin-top`은 평소 레이아웃의 margin을 늘리는 것이 아니다.

참고: [스크롤 스냅](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap/Basic_concepts).

## 14. 시스템 설정을 확인한다는 뜻

사용자가 OS·브라우저에 정한 선호를 브라우저가 CSS에 전달한다. CSS가 시스템을 직접 조작하지는 않는다.

- `prefers-color-scheme`: 밝은·어두운 테마 선호.
- `prefers-reduced-motion`: 움직임 감소 선호.
- `forced-colors`: 시스템이 제한된 색상 팔레트를 강제하는지.
- `hover`: 기본 입력 장치가 hover를 지원하는지.
- `pointer`: 기본 포인터가 정밀한지·거친지.

```css
@media (prefers-color-scheme: dark) {
  body { background: #121212; color: #eeeeee; }
}
```

사이트의 테마 버튼과 자동 연결되는 것은 아니다.

### 움직임 감소

화면의 이동·회전·확대 등이 어지러운 사용자가 애니메이션을 줄이도록 설정하는 접근성 옵션이다.

- `reduce`: 움직임 감소 요청.
- `no-preference`: 감소 요청이 감지되지 않음. 애니메이션을 적극적으로 원한다는 의미는 아님.

```css
html { scroll-behavior: auto; }

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

감소 요청이 없을 때만 부드러운 스크롤을 적용한다. 이 조건으로 다른 애니메이션까지 자동 제거되지는 않는다.

참고: [움직임 감소](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion), [색상 모드](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme).

## 15. resize는 div에서도 가능한가?

가능하다. 일반적인 div에서는 `overflow: auto` 등도 설정한다.

```css
.resizable-box {
  width: 300px;
  height: 150px;
  min-height: 100px;
  max-height: 400px;
  overflow: auto;
  resize: vertical;
  border: 1px solid #aaaaaa;
}
```

- `vertical`: 높이 조절.
- `horizontal`: 너비 조절.
- `both`: 두 방향 조절.
- `none`: 직접 조절 금지.
- 블록의 `overflow: visible` 또는 `clip` 상태에서는 적용되지 않는다.
- 손잡이 제공과 조작 방식은 브라우저·기기에 따라 다르다.

참고: [MDN resize](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/resize).

## 16. 직접 확인할 작은 실험

- 검색창에 Tab으로 이동하며 `:focus-within`의 부모 테두리 변화를 관찰한다.
- 문구를 드래그해서 `::selection`을 확인한다.
- 목록 점에 `::marker`를 적용한다.
- 컨테이너 너비만 바꾸고 `@container`의 카드 여백을 확인한다.
- 개발자 도구에서 reduced-motion을 모의 적용해 스크롤 차이를 확인한다.

새로운 문법의 지원 범위는 [MDN CSS 참고 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)의 개별 호환성 표에서 확인한다.

