# [ ] Tasks for yt-kor-sync

## 🎨 UI/UX 개선

- [x] 스크립트 리스트를 카드 형태로 변경
- [ ] 스크립트 진행도(Progress) 표시 기능
- [ ] 반응형 레이아웃 세부 최적화

## 🔍 기능 추가

- [x] 최근 업데이트된 스크립트 'New' 뱃지 표시
- [x] Typesense 연동을 통한 글로벌 검색 기능
- [x] 스크립트 북마크 / 즐겨찾기 기능
- [x] 사용자 프로필 및 개인 설정 페이지 구현

## 🛠 시스템 및 인프라

- [x] VPS 자동 배포 (GitHub Actions) 설정
- [ ] PWA(Progressive Web App) 지원으로 오프라인 사용 가능하게 만들기
- [ ] 텍스트 -> 음성(TTS) 연동 테스트 및 구현
- [ ] 스크립트 자동 번역 퀄리티 개선 (Prompt Tuning)

## 🔄 라우팅 및 리팩토링

- [x] list -> route (카테고리별 라우팅 적용)
- [ ] API 호출 유틸리티 레이어 분리 및 에러 핸들링 강화
- [x] 단위 테스트(Vitest) 및 E2E 테스트(Playwright) 추가

## 🤖 LLM 활용 기능 (Idea)

### 🎓 학습 및 이해 도우미 (Learning Companion)

- [ ] **AI 문맥 단어장 (Smart Vocabulary)**: 난이도 있는 단어/관용구 자동 추출 및 문맥 기반 뜻풀이
- [ ] **즉석 퀴즈 생성기 (Instant Quiz)**: 영상 내용 기반 이해도 확인 퀴즈 (객관식/빈칸)
- [ ] **AI 튜터에게 질문하기 (Context-Aware Chat)**: 현재 재생 위치의 스크립트 문맥을 파악하여 질문 답변

### 🔍 탐색 및 네비게이션 (Deep Navigation)

- [ ] **자연어 의미 검색 (Semantic Search)**: "결론 부분 찾아줘" 등 의미 기반 구간 점프
- [ ] **지능형 챕터 분할 (Auto Chaptering)**: 스크립트 분석을 통한 자동 챕터링 및 제목 생성

### ✍️ 콘텐츠 확장 (Content Expansion)

- [ ] **블로그 글 / 카드뉴스 자동 변환**: 영상 요약 및 공유용 콘텐츠 생성
- [ ] **스타일(어조) 변환**: 뉴스 앵커, 어린이용 등 다양한 어조로 스크립트 변환
