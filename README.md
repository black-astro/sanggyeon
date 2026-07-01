<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,45:022a0e,100:00ff41&height=180&section=header&text=sanggyeon&fontSize=50&fontColor=00ff41&fontAlignY=38&desc=Digital%20Sanggyeonrye%20Invitation%20Card&descAlignY=60&descSize=15&animation=fadeIn"/>

<img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
<img src="https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white"/>

</div>

## `$ 개요`

두 가족이 처음 마주하는 상견례 자리를 위한 디지털 초대장 웹앱입니다. Vue 3 + Vite로 제작된 단일 페이지 초대 카드로, 인사말과 일시·장소 안내, 인터랙티브 지도를 하나의 화면에 담았습니다. GitHub Pages로 배포하도록 구성되어 있습니다.

## `$ 주요 기능`

- 상견례 인사말과 초대 문구를 담은 히어로 초대 카드
- 장소 안내 (예: 모담 김포 본점) 및 주차 정보 표시
- 확대/축소·내 위치·크게 보기 등 조작이 가능한 인터랙티브 지도
- 여러 색상 테마의 초대 카드 변형(gold_pink, gold_yellow, pink_white)
- Lucide 아이콘과 Sass 스타일 기반의 반응형 카드 UI

## `$ 기술 스택`

| 구분 | 사용 기술 |
| --- | --- |
| Core | Vue 3, Vite |
| UI | Vuetify 4, lucide-vue-next, MDI Font |
| 스타일 | Sass (sass-embedded) |
| 배포 | gh-pages (GitHub Pages) |

## `$ 프로젝트 구조`

```text
src/
├── App.vue
├── main.js
├── style.css
├── assets/
└── components/
    ├── InviteCard.vue            # 기본 초대 카드
    ├── InviteCard_gold_pink.vue
    ├── InviteCard_gold_yellow.vue
    ├── InviteCard_pink_white.vue
    └── HelloWorld.vue
```

## `$ 실행 방법`

```bash
# 의존성 설치 (pnpm 사용)
pnpm install

# 개발 서버 (Vite)
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 미리보기
pnpm preview

# GitHub Pages 배포 (dist 배포)
pnpm deploy
```

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:00ff41,45:022a0e,100:000000&height=100&section=footer"/>

</div>
