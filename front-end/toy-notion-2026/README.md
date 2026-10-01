# toy-notion

- [x] `2026-09-29(화)` 1_프로젝트 구조와 HTML Head 및 로컬 서버 실행

---

## 네이밍 규칙

### 한눈에 보기

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| HTML `id` | `UPPER_SNAKE_CASE` | `SIDEBAR_PEEK_BTN` |
| HTML `class` | `kebab-case` | `sidebar-peek-btn` |
| JS 변수·일반 함수·객체 속성 | `camelCase` | `sidebarPeekBtn`, `openSidebar` |
| JS 클래스·생성자 함수·컴포넌트 클래스 | `PascalCase` | `SidebarPeekBtn`, `NotionSidebar` |
| Web Component의 HTML 태그 | 소문자와 하이픈 | `<notion-sidebar>` |

### UPPER_SNAKE_CASE

모든 문자를 **대문자**로 쓰고 단어를 언더스코어(`_`)로 구분한다.

- 예시: `SIDEBAR_PEEK_BTN`
- JavaScript에서는 고정된 설정값 등 상수 이름에 주로 사용한다. 모든 `const` 변수에 적용하는 것은 아니다.
- 이 프로젝트에서는 JavaScript로 제어할 HTML 요소의 `id`에도 사용한다.

> `id`를 대문자로 작성하는 것은 HTML의 필수 규칙이 아니라 이 프로젝트의 약속이다.

### kebab-case

모든 문자를 **소문자**로 쓰고 단어를 하이픈(`-`)으로 구분한다.

- 예시: `sidebar-peek-btn`
- CSS 클래스와 파일 이름에 많이 사용한다.
- 이 프로젝트에서는 CSS 스타일을 적용할 `class` 이름에 사용한다.

### camelCase

첫 단어는 **소문자**로 시작하고, 이후 단어의 첫 글자를 대문자로 작성한다.

- 예시: `sidebarPeekBtn`, `openSidebar`
- JavaScript의 변수, 일반 함수, 객체 속성 이름에 사용한다.

### PascalCase

모든 단어의 **첫 글자를 대문자**로 작성한다.

- 예시: `SidebarPeekBtn`, `NotionSidebar`
- JavaScript의 클래스, 생성자 함수, React 같은 환경의 컴포넌트 이름에 주로 사용한다.
- 이 프로젝트의 Web Component는 클래스 이름에 `PascalCase`, HTML 태그 이름에 소문자와 하이픈을 사용한다.

```js
class NotionSidebar extends HTMLElement {}

customElements.define("notion-sidebar", NotionSidebar);
```

```html
<notion-sidebar></notion-sidebar>
```

## 커밋 메시지 규칙

### 작성 형식

```text
타입: 변경 내용
```

- 타입은 영문 소문자로 작성한다.
- 콜론(`:`) 뒤에 공백 한 칸을 넣는다.
- 변경 내용은 한글로 간결하고 구체적으로 작성한다.
- 한 커밋에는 서로 관련된 변경을 묶는다.

### 타입과 영어 뜻

`feat`와 `docs`는 줄여 쓴 표현이다. 나머지는 영어 단어 자체를 사용한다.

| 타입 | 영어 원형과 뜻 | 사용하는 작업 |
| --- | --- | --- |
| `feat` | **feature**: 기능 | 새로운 기능 추가 |
| `fix` | **fix**: 고치다, 수정하다 | 잘못된 동작이나 오류 수정 |
| `docs` | **documentation**: 문서화, 문서 자료 | README, 사용 설명서, 학습 정리 작성·수정 |
| `style` | **style**: 형식, 작성 방식 | 동작 변경 없이 들여쓰기·공백 등 코드 형식 정리 |
| `refactor` | **refactor**: 코드를 재구성하다 | 기존 기능을 유지하면서 코드 구조 개선 |
| `test` | **test**: 시험, 검사 | 동작을 검증하는 테스트 코드 추가·수정 |
| `chore` | **chore**: 허드렛일, 일상적인 잡무 | 초기 폴더·개발 도구 설정 등 프로젝트 관리 |

`chore`는 앱 기능 자체를 만드는 일 외에, 프로젝트를 운영하기 위해 필요한 주변 작업을 뜻한다.

> **`style`은 CSS 디자인 변경을 뜻하지 않는다.** 새로운 화면 구현은 `feat`, 화면 오류 수정은 `fix`를 사용한다.

### 작성 예시

```text
feat: 사이드바 접기 기능 구현
fix: 문서 제목이 저장되지 않는 오류 수정
docs: HTML Head 학습 내용 정리
style: HTML 들여쓰기 통일
refactor: 문서 저장 로직을 별도 파일로 분리
test: 문서 삭제와 복원 테스트 추가
chore: 프로젝트 폴더 구조 초기 설정
```
