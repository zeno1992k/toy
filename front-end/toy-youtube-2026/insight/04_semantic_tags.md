# 04. Semantic HTML — 의미에 맞는 태그

## 1. 시맨틱 태그란?

화면 모양뿐 아니라 내용의 의미와 역할을 나타내는 HTML 태그다. JSX에서도 같은 HTML 의미를 사용한다.

`Header`는 내가 만든 React 컴포넌트 이름이고, `header`는 HTML 태그다.

```jsx
function Header() {
  return <header><h1>Zeno Tube</h1></header>;
}
```

- 컴포넌트 이름만으로 HTML 의미가 생기지는 않는다.
- 왼쪽에 있다는 이유만으로 모든 요소가 aside가 되지는 않는다.
- 글자 크기는 CSS, 문서 구조는 태그로 정한다.

참고: [MDN Semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics).

## 2. 자주 사용하는 태그

| 태그 | 의미와 사용 |
| --- | --- |
| `header` | 페이지나 구역의 도입부 |
| `nav` | 주요 탐색 링크 영역 |
| `main` | 페이지의 주요 콘텐츠. 일반적인 화면에서는 하나 |
| `aside` | 본문과 관련된 보조 콘텐츠 |
| `section` | 주제로 묶은 구역. 보통 제목과 함께 |
| `article` | 독립적으로 이해·재사용 가능한 콘텐츠 |
| `footer` | 페이지나 구역의 마무리 정보 |
| `h1~h6` | 제목의 계층 |
| `p` | 문단 |
| `ul` | 순서 없는 목록 |
| `ol` | 순서 있는 목록 |
| `li` | 목록 항목 |
| `a` | href 목적지로 이동 |
| `button` | 동작 실행 |
| `form` | 입력·제출 양식 |
| `label` | 입력 요소의 이름 |
| `fieldset`, `legend` | 관련 입력 그룹과 그 제목 |
| `figure`, `figcaption` | 그림·도표 등의 단위와 설명 |
| `time` | 날짜·시간 |
| `div`, `span` | 특별한 의미 없이 묶기 |

태그를 많이 중첩한다고 더 시맨틱한 것은 아니다. 역할을 설명할 수 있는 만큼 사용한다.

## 3. 이 프로젝트의 화면 구조

```text
App
├─ Header → header
├─ Sidebar → aside
│  ├─ 구독 메뉴 → nav
│  └─ 마이 페이지 메뉴 → nav
└─ Content → main
   ├─ 카테고리 버튼 묶음
   └─ 영상 목록 → ul
      └─ 영상 항목 → li
```

컴포넌트를 나누는 구조와 HTML 태그를 선택하는 일은 관련 있지만 같은 결정은 아니다.

## 4. aside와 nav는 함께 써도 되는가?

```jsx
<aside>
  <div>프로필</div>
  <nav aria-labelledby="subscription-heading">
    <h2 id="subscription-heading">구독</h2>
    <ul>
      <li><a href="/channels/example">예시 채널</a></li>
    </ul>
  </nav>
</aside>
```

사이드바 안에 프로필·이동 메뉴가 함께 있는 설계 예시다. 경로는 설명용이며 실제 구현한 주소로 연결한다.

사이드바 전체가 이동 메뉴라면 nav 하나로 충분할 수도 있다. 여러 nav가 있으면 목적을 구분할 이름을 제공한다.

## 5. 버튼과 링크

```jsx
{/* 이동 */}
<a href="/watch/example">영상 상세 보기</a>

{/* 현재 화면에서 동작 */}
<button type="button">설명 더 보기</button>

{/* 폼 제출 */}
<button type="submit">검색</button>
```

- 카테고리가 현재 목록을 필터링하면 버튼.
- 카테고리가 다른 URL로 이동하면 링크.
- 일반 탐색 메뉴에 ARIA menu를 무조건 붙이지 않는다.
- 버튼 안에 링크, 링크 안에 버튼처럼 상호작용 요소를 중첩하지 않는다.

## 6. 검색 폼의 구조

```jsx
<form role="search" aria-label="영상">
  <label htmlFor="video-search">검색어</label>
  <input id="video-search" name="q" type="search" />
  <button type="submit">검색</button>
</form>
```

여기서 search 역할은 일반 폼에 검색 목적을 명시한 것이다. form 역할을 중복해서 적은 것이 아니다. 실제 제출 이벤트는 다음 구현 단계에서 연결한다.

- JSX에서는 `for` 대신 `htmlFor`를 쓴다.
- 입력의 `id`와 label의 `htmlFor`를 연결한다.
- placeholder는 입력 이름을 대체하지 않는다.

## 7. 영상 목록과 제목

```jsx
<section aria-labelledby="videos-heading">
  <h2 id="videos-heading">인기 영상</h2>
  <ul>
    <li>
      <a href="/watch/example">
        <h3>영상 제목</h3>
      </a>
      <p>채널명</p>
    </li>
  </ul>
</section>
```

독립적인 영상 카드가 필요하다면 li 내부에 article을 둘 수도 있지만 필수는 아니다. 제목 계층은 실제 페이지 구조에 맞춘다.

홈에서는 서비스·페이지 주제가 h1일 수 있고, 상세에서는 영상 제목을 h1로 둘 수 있다. 모든 화면에서 로고를 반드시 h1으로 만들 필요는 없다.

## 8. 이미지·플레이어

- 이미지의 alt는 용도에 맞춘다. 의미 있는 이미지는 필요한 정보를 설명한다.
- 장식 이미지 또는 같은 링크 안의 제목과 완전히 중복되는 썸네일은 문맥에 따라 `alt=""`로 중복 읽기를 줄일 수 있다.
- 플레이어 iframe에는 내용을 식별할 `title`을 제공한다.
- 보이는 썸네일과 실제 이동 영상이 일치해야 한다.

iframe의 title은 단순 툴팁 속성 설명을 넘어 프레임을 식별하는 접근성 용도가 있다.

## 9. 스스로 확인하기

- [ ] 각 태그를 선택한 이유를 설명할 수 있는가?
- [ ] 동작은 버튼, 이동은 링크인가?
- [ ] 제목 크기를 바꿀 목적으로만 h1~h6를 고르지 않았는가?
- [ ] 클릭 기능을 div로만 구현하지 않았는가?
- [ ] 아직 구현하지 않은 메뉴를 실제 기능처럼 보이게 하지 않았는가?

관련 문서: [접근성 이름·title·role](05_accessibility_aria_title_role.md).

