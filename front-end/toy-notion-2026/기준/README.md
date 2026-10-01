# Zeno Notion — Modern Vanilla Reference

`vanilla-js-notion-source-code`의 화면과 기능을 기준으로, 프레임워크와 외부 UI 라이브러리 없이 다시 구성하고 Zeno 브랜드를 적용한 참고용 완성 예제입니다.

브랜드 표기는 **Zeno Notion**, 프로젝트 슬러그와 백업 파일명은 `zeno-notion`을 사용합니다. 대표 색상은 로고 원색인 `#4913EC`입니다.

## 실행

ES Modules를 사용하므로 `file://`로 직접 열지 말고 로컬 HTTP 서버에서 실행합니다.

Windows에서는 프로젝트 루트의 `start.cmd`를 더블 클릭하면 서버와 브라우저가 함께 열립니다.

```powershell
npx serve .
```

또는 VS Code Live Server로 `index.html`을 엽니다.

> `file:///.../index.html`로 열면 브라우저 보안 정책 때문에 ES Module import가 차단될 수 있습니다.

## 구조

- `src/components`: Custom Elements와 공유 `<template>`
- `src/core`: 앱 상태·기능 Controller
- `src/services`: Selection/Range 기반 편집 명령
- `styles/original.css`: 원본과 동일한 시각 기준
- `styles/brand.css`: Zeno 색상 토큰과 로고 UI
- `styles/modern.css`: 접근성과 Modern CSS 보완

## 설계 원칙

- UI와 기능은 원본을 기준으로 유지합니다.
- 큰 화면 컴포넌트는 원본 CSS와 테마가 자연스럽게 상속되도록 Light DOM을 사용합니다.
- Custom Element는 정적 Template을 복제해 렌더링합니다.
- 외부 폰트 요청 없이 시스템 글꼴 스택을 사용해 오프라인에서도 동일하게 실행됩니다.
- 중복 ID는 `data-action`으로 교체합니다.
- CSS Cascade Layer와 Nesting을 사용합니다.
- 원본의 deprecated `execCommand()` 대신 Selection/Range 기반 편집 서비스를 사용합니다.
