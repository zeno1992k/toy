# 05. 접근성 — aria-label, title, role

## 1. 접근성 이름이란?

스크린 리더 같은 보조 기술이 요소를 식별할 때 사용하는 이름이다. 버튼·링크·입력창의 목적을 알 수 있어야 한다.

접근성은 이름만의 문제가 아니다. 키보드 조작, 포커스 위치, 오류 안내, 색상 대비도 포함한다.

## 2. 속성별 차이

| 항목 | 목적 | 예시 |
| --- | --- | --- |
| `aria-label` | 이름을 문자열로 직접 지정 | 아이콘 버튼에 검색 |
| `aria-labelledby` | 기존 요소의 글자를 이름으로 연결 | 제목의 id 연결 |
| `aria-describedby` | 보충 설명을 기존 요소와 연결 | 입력 안내·오류 문구 |
| `title` 속성 | 보충 정보. 보통 hover 툴팁 | 추가 설명 |
| `<title>` 태그 | 문서 제목 | 브라우저 탭 제목 |
| `role` | 정해진 접근성 역할 | group, dialog |
| `className` | 개발자가 정하는 CSS 클래스 | search-form |
| `id` | 문서 내 고유 식별자 | label·ARIA 연결 대상 |

## 3. 언제 aria-label을 쓰는가?

```jsx
{/* 글자가 이미 이름이 된다 */}
<button type="button">검색</button>

{/* 아이콘에 이름이 없으므로 이름 제공 */}
<button type="button" aria-label="검색">
  <span aria-hidden="true">🔍</span>
</button>
```

- 보이는 글자로 충분하면 aria-label을 추가하지 않는다.
- 이름이 필요한 아이콘 버튼 등에 직접 지정한다.
- aria-label은 화면 글자를 대신하는 접근성 이름이 될 수 있으므로 서로 다르게 쓰지 않는다.
- 모든 div에 이름을 붙이는 속성이 아니다. 해당 역할이 이름을 허용하는지 확인한다.

## 4. aria-labelledby와 aria-describedby

```jsx
<nav aria-labelledby="subscription-heading">
  <h2 id="subscription-heading">구독 목록</h2>
  <ul>
    <li><a href="/channels/example">예시 채널</a></li>
  </ul>
</nav>
```

`subscription-heading`은 실제 id를 가리킨다. 같은 이름의 문자열을 임의로 입력하는 것이 아니다.

```jsx
<label htmlFor="query">검색어</label>
<input
  id="query"
  type="search"
  aria-describedby="query-help"
/>
<p id="query-help">영상 제목이나 주제를 입력하세요.</p>
```

- label: 입력 이름.
- describedby: 이름에 덧붙일 설명.
- id는 문서에서 중복하지 않는다.
- label, aria-label, labelledby를 모두 중복 적용할 필요는 없다.
- 이름을 계산할 때 유효한 aria-labelledby는 aria-label보다 우선한다.

참고: [W3C 접근성 이름과 설명](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/).

## 5. title은 둘 다 붙여야 하는가?

아니다. 버튼 이름은 보이는 글자 또는 적절한 접근성 이름으로 제공한다.

```jsx
<button type="button">검색</button>
```

이 버튼에 `title="검색"`과 `aria-label="검색"`을 모두 붙일 필요는 없다.

- title 툴팁은 터치·키보드 환경에서 접근이 불안정하다.
- 중요한 안내를 title에만 넣지 않는다.
- 플레이어 iframe의 title은 프레임을 식별하는 데 사용하므로 적절히 제공한다.

참고: [MDN title 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/title).

## 6. role은 왜 필요한가?

HTML만으로 충분하지 않은 요소의 역할을 보조 기술에 알린다.

```jsx
<div className="category-bar" role="group" aria-label="영상 카테고리">
  <button type="button">전체</button>
  <button type="button">음악</button>
</div>
```

- className: 개발자가 붙인 스타일용 이름.
- role: group이라는 정해진 역할.
- aria-label: 사람이 이해할 그룹 이름.
- 이름 있는 그룹이 필요 없다면 role과 aria-label 없이 div로 묶어도 된다.

`role="asdf"`는 유효한 역할이 아니다. `role="button"`을 붙여도 클릭·키보드 기능이 자동 구현되지 않는다. 버튼은 기본 button 태그를 먼저 사용한다.

## 7. HTML 태그와 role의 중복

```jsx
<button>검색</button>
<nav aria-label="주요 메뉴">...</nav>
<main>...</main>
<form aria-label="회원가입">...</form>
```

button에 button 역할, nav에 navigation 역할을 반복할 필요는 없다. 이름을 가진 form은 폼 랜드마크로 노출될 수 있다. `role="form"`을 덧붙이지 않아도 된다.

검색용 폼에는 검색 영역이라는 다른 의미를 주기 위해 `role="search"`를 쓸 수 있다. 역할 값은 소문자다.

참고: [MDN form 역할](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/form_role).

## 8. 함께 만나게 되는 aria-* 속성

- `aria-hidden="true"`: 중복 장식 등을 접근성 트리에서 제외. 화면을 숨기는 CSS가 아니다. 포커스 가능한 요소나 그 조상을 숨기지 않는다.
- `aria-expanded`: 펼침·접힘 상태.
- `aria-controls`: 제어하는 요소의 id.
- `aria-pressed`: 토글 버튼의 눌림 상태.
- `aria-current`: 현재 페이지·항목 표시.
- `aria-live`: 동적으로 바뀌는 내용을 알리는 방식.
- `aria-busy`: 영역이 갱신 중인지 알림.

실제 React 상태와 함께 갱신해야 한다. 속성만 붙여도 화면이 열리거나 기능이 생기는 것은 아니다.

## 9. role 전체 참고 — WAI-ARIA 1.2

이 절은 WAI-ARIA 1.2 핵심 역할 목록이다. 별도 확장 규격은 제외한다. 의미 요약이며, 필요한 속성·키보드 동작은 개별 규칙을 확인한다.

### 영역과 탐색

- `banner`: 사이트 공통 머리말. 광고 배너라는 뜻은 아님.
- `complementary`: 본문을 보완하는 독립적인 보조 영역.
- `contentinfo`: 문서 전체의 저작권·운영 정보 등.
- `form`: 입력 양식 영역.
- `main`: 주요 본문.
- `navigation`: 주요 탐색 링크 영역.
- `region`: 이름을 붙여 구분할 중요한 영역.
- `search`: 검색 기능 영역.

### 입력과 선택

- `button`: 동작 버튼.
- `checkbox`: 체크 항목.
- `radio`: 그룹 내 단일 선택 항목.
- `radiogroup`: 라디오 그룹.
- `switch`: 켜짐·꺼짐 스위치.
- `textbox`: 텍스트 입력.
- `searchbox`: 검색어 입력.
- `combobox`: 값 선택용 팝업을 제어하는 입력·버튼.
- `listbox`: 선택 목록.
- `option`: 선택 목록 항목.
- `slider`: 범위 조절.
- `spinbutton`: 값 입력·증감.
- `scrollbar`: 스크롤 위치 조절.
- `progressbar`: 작업 진행 정도.

### 메뉴와 탭·트리

- `link`: 이동 링크.
- `menu`: 명령 메뉴 위젯.
- `menubar`: 메뉴 막대.
- `menuitem`: 메뉴 명령.
- `menuitemcheckbox`: 체크 메뉴 항목.
- `menuitemradio`: 단일 선택 메뉴 항목.
- `tab`: 패널 선택 탭.
- `tablist`: 탭 그룹.
- `tabpanel`: 연결된 탭 콘텐츠.
- `tree`: 계층형 목록.
- `treeitem`: 트리 항목.
- `treegrid`: 계층형 그리드.

### 표와 그리드

- `table`: 데이터 표.
- `grid`: 키보드 탐색 등을 갖춘 상호작용 그리드. CSS Grid와 다름.
- `cell`: 표 셀.
- `gridcell`: 그리드 셀.
- `row`: 행.
- `rowgroup`: 행 그룹.
- `rowheader`: 행 제목.
- `columnheader`: 열 제목.

### 문서와 콘텐츠

- `application`: 일반 문서 탐색으로 다루기 어려운 특수 상호작용 영역. React 앱이라는 이유로 쓰지 않음.
- `document`: 읽고 탐색하는 문서.
- `article`: 독립 콘텐츠.
- `feed`: 연속적으로 제공되는 article 목록.
- `group`: 관련 요소 묶음.
- `heading`: 제목. 직접 지정 시 aria-level 필요.
- `list`: 목록.
- `listitem`: 목록 항목.
- `figure`: 참조 가능한 그림·도표 등의 단위.
- `img`: 하나의 이미지 표현.
- `caption`: 표·그림 등의 설명.
- `blockquote`: 긴 인용.
- `code`: 코드.
- `definition`: 정의.
- `term`: 정의되는 용어.
- `note`: 보충 내용.
- `paragraph`: 문단.
- `emphasis`: 강세.
- `strong`: 중요성·심각성·긴급성.
- `deletion`: 삭제 내용.
- `insertion`: 추가 내용.
- `subscript`: 아래 첨자.
- `superscript`: 위 첨자.
- `math`: 수식.
- `time`: 날짜·시간.
- `meter`: 범위 안의 측정값.
- `separator`: 구분선 또는 조절 구분 요소.
- `toolbar`: 도구 모음.
- `tooltip`: 보충 설명 툴팁.

### 동적 안내와 창

- `alert`: 즉시 전달할 중요 알림.
- `status`: 방해하지 않으며 전달할 상태.
- `log`: 순서대로 추가되는 기록.
- `marquee`: 자주 바뀌는 비필수 정보.
- `timer`: 경과·남은 시간.
- `dialog`: 대화상자.
- `alertdialog`: 중요 알림과 응답을 요구하는 대화상자.

### 특수 역할

- `none`, `presentation`: 요소 자체의 기본 의미 제거. 화면을 숨기지는 않음.
- `generic`: 일반 컨테이너. 직접 지정 비권장.
- `directory`: 사용 중단. list 사용.

### 추상 역할 — 직접 사용 금지

규격의 분류를 위한 역할이지 HTML role에 넣는 값이 아니다.

- `command`: 명령 계열.
- `composite`: 복합 위젯 계열.
- `input`: 입력 계열.
- `landmark`: 탐색 영역 계열.
- `range`: 범위값 계열.
- `roletype`: 최상위 역할.
- `section`: 구역 계열.
- `sectionhead`: 구역 제목 계열.
- `select`: 선택 위젯 계열.
- `structure`: 문서 구조 계열.
- `widget`: 상호작용 계열.
- `window`: 창 계열.

참고: [WAI-ARIA 1.2 역할 정의](https://www.w3.org/TR/wai-aria-1.2/#role_definitions), [MDN 역할 안내](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles).

## 10. 직접 점검하기

1. 마우스를 놓고 Tab으로 검색창과 버튼에 이동한다.
2. 포커스 위치가 눈에 보이는지 확인한다.
3. 개발자 도구의 접근성 정보에서 버튼 이름·역할을 확인한다.
4. aria-labelledby가 실제 존재하는 id를 가리키는지 확인한다.
5. 화면 문구와 접근성 이름이 모순되지 않는지 확인한다.
6. 목록마다 같은 이름을 반복 추가하지 않았는지 확인한다.

이름을 잘 붙이는 것은 SEO나 GEO의 노출을 보장하는 기술이 아니다. 사용자가 UI를 이해하고 조작하도록 돕는 작업이다.

관련 문서: [시맨틱 HTML](04_semantic_tags.md), [CSS 포커스와 환경 설정](01_modern_css.md).

