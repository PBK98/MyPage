# Bumkyu Portfolio

HTML, CSS, JavaScript로 만든 반응형 포트폴리오 웹사이트입니다.

## 배포 URL

[https://pbk98.github.io/MyPage/]

## 사용 기술

- HTML 시맨틱 마크업
- CSS Flexbox, Grid, CSS 변수, 반응형 브레이크포인트
- JavaScript DOM 조작, 이벤트 처리, 상태 기반 렌더링
- GitHub REST API

## 주요 기능

- 모바일 햄버거 메뉴 토글
- 네비게이션 앵커와 부드러운 스크롤
- 300px 이상 스크롤 시 스크롤 탑 버튼 표시
- 60px 이상 스크롤 시 헤더 스타일 변경
- 다크 모드 토글 및 로컬스토리지 저장
- Intersection Observer 기반 스크롤 애니메이션, threshold 0.2
- Contact 폼 필수값 및 이메일 형식 검증
- GitHub 저장소 로딩, 성공, 에러, 빈 상태 렌더링
- 언어별 프로젝트 필터링

## 파일 구조

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── form.js
│   ├── github.js
│   └── main.js
└── images/
    └── profile.svg
```

## GitHub API 설정

`js/github.js`의 `GITHUB_USERNAME` 값을 본인의 GitHub 아이디로 바꾸면 됩니다.


## 스크린샷

데스크톱, 모바일, 다크 모드 스크린샷을 추가하세요.
