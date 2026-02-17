# for-intlstudent ✈️🎓
> toy project for international students  
> 배포: https://for-intlstudent.vercel.app  (Vercel)  

---

## Period
> 2026.02 ~ (진행 중)

---

## Project History
- 파견교 정보를 하나하나 모으기 힘든 교환학생 준비중인 학생들을 위한 프로그램. 버튼 한번 클릭으로 정보들을 입력해서, 표 형태로 정리하고 우선순위를 정해 리스트를 짤 수 있게 하는 것이 목표.
- 표 기반 UI + gemini, 외부 API 기반 자동 채움 기능

---

## Explanation
이 프로젝트는 **교환학생**이 학교 후보를 모아두고, 핵심 정보를 표로 관리할 수 있도록 만든 웹 앱입니다. 

**현재 구현된 기능**
<img width="1229" height="349" alt="스크린샷 2026-02-17 오후 2 31 21" src="https://github.com/user-attachments/assets/7909dcb2-9e17-417e-9ff7-7676a8904e65" />

- ✅ 희망 학교 리스트(표) 렌더링 + 순위(rank) 기준 정렬
  
  <img width="1225" height="696" alt="스크린샷 2026-02-17 오후 2 31 35" src="https://github.com/user-attachments/assets/72b1b444-b567-4393-bfc0-a9af826a018d" />
- ✅ 모달에서 학교 추가 (여러 줄 입력 → 최대 5개까지 한 번에 추가)

- ✅ 행 삭제
  
  <img width="1265" height="276" alt="스크린샷 2026-02-17 오후 2 34 34" src="https://github.com/user-attachments/assets/1d7971fb-177c-4712-a90d-ada2804f88cf" />
- ✅ 표 셀 인라인 편집
  
  <img width="379" height="335" alt="스크린샷 2026-02-17 오후 2 33 21" src="https://github.com/user-attachments/assets/61a81ad2-acc7-4b1e-9db8-93d8837614a9" />
  <img width="794" height="413" alt="스크린샷 2026-02-17 오후 2 34 07" src="https://github.com/user-attachments/assets/c39f1767-43f1-4236-abf6-2a8c11ec9fd2" />
- ✅ **AI 자동 채움**: 버튼 한 번으로 Gemini가 `학교 규모 / 제휴 학교 / 날씨` 채워줌
- 🛠 로그인하여 본인이 저장한 학교들 불러오기 기능, walkscore API를 이용한 주변환경 데이터 채우기 등 추후 개발 예정
- 🛠 환율 계산기, 짐싸기 목록 적기 등 다양한 기능을 추가하여 교환 지원부터 합격 후까지 쓸 수 있는 프로그램으로 만들 예정

---

## Tech Stack
- **Frontend**: React (CRA / react-scripts), React Router 
- **Styling**: Vanilla CSS (table, modal, base styles)  
- **Backend (Serverless)**: Vercel Serverless Functions (`/api/*`) 
- **AI**: Google Gemini API (generateContent)
- **Deploy**: Vercel 

---

## About Project

### Pages (Routes)
- `/` : **희망학교 리스트(표)**
- `/calc` : **환율 계산기** (현재 임시 비활성화) 

### API (Vercel Serverless)
- `POST /api/gemini`  
  - Request: `{ "schoolName": "..." }`
  - Response(JSON):  
    ```json
    { "size": "", "otherSchool": "", "weather": "" }
    ```

---

