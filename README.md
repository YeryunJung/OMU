# seb40_main_029

![Logo (1)](https://user-images.githubusercontent.com/85021536/205480160-028ae46e-7e87-4e06-94b0-9faebb53cbac.png)

# 오무: 오늘의 무드

🐌 나에게 집중하는 느린 SNS 오무를 통해 하루의 기분을 색으로 업로드 해봐요

## 프로젝트 소개
- 수많은 알림, 눈을 사로잡는 사진들로 SNS 사용에 지쳐가는 이들을 위한 감정 기록형 SNS 서비스입니다
- 누가 지금 접속 중이라든지, 누가 몇 분 전에 접속했었다든지, 누가 지금 나에게 dm을 입력중이라든지, … 과도한 정보와 연결에서 벗어나 나에게 더 집중할 수 있는 SNS를 기획했습니다.
- 색을 통해 나의 감정을 기록하고, 예전 기록을 전부 돌아볼 수 있습니다.
- 친구가 오늘 어떤 감정을 기록했는지 확인할 수 있습니다. 편지를 통해 친구와 소통할 수 있습니다.
- 편지는 하루 뒤에 도착합니다. 서신을 전할 때도 여유 있게, 답신을 전할 때도 여유 있게 충분한 시간을 갖고 내용을 정리할 수 있습니다.
- 배포 링크 : 

## Team 슬로우컬러
![스크린샷 2022-12-04 오후 4 58 56](https://user-images.githubusercontent.com/85021536/205480337-0f0a5ace-ce9b-4b6d-b4d7-faee05b04bec.png)

### 구예찬 (FE, 팀장)

- 기술스택: `React` `Styled-component` `Redux` `Axios` `Figma`
- 역할
    - 오늘의 무드 기록
        - 매일 한 번씩 무드와 그 이유를 기록
            - 매일 자정을 최초 기록 시점으로 초기화
        - Effect 훅을 활용하여, 매일 최초 기록 후 당 컴포넌트의 기능을 post에서 patch로 변환
    - 투두리스트
        - 투두의 추가, 완료처리, 삭제 기능
        - 매일 자정을 기점으로 투두리스트 초기화
        - 전일 완료하지 못한 투두 불러오기 기능
            - 불러온 투두 완료처리 시, 전날 완료한 것으로 기록됨
    - 연간 기록 조회
        - 모든 기록을 연도별로 정리
        - 히트맵 캘린더, 파이 차트를 통해 기록이 한 눈에 들어오도록 하는 시각화 기능
            - 그동안 기록한 모든 무드, 투두리스트의 정보를 가공하여 시각적으로 파악하기 쉽게 요약
        - 특정 일자에 기록된 무드, 무드 선택 이유, 그날 한 일과 못한 일을 파악 가능
            - 캘린더의 특정 일자를 선택하여 조회
            - 연도 별로 어떤 무드가 몇회 기록되었는지 파이 차트로 시각화
            - Effect 훅을 활용하여, 오늘 기록 및 수정하는 무드와 투두리스트도 연간 기록에 즉각 반영
    - 배포
        - AWS S3, Route53, CloudFront를 이용한 https 배포
        - Github Action으로 CI/CD 도입



### 고은서 (FE)

- 기술스택: `React` `Styled-component` `Redux` `Axios` `Figma`
- 역할:
    - 헤더:
        - 북마크: 북마크 최대 10개 등록(localstorage 저장), 디폴트로 3개 북마크가 보이도록 하고 북마크 추가버튼 외에 다른 버튼을 만들어 북마크를 열고 닫을수 있도록 함. 북마크 삭제
        - 메뉴: 페이지이동이 거의없이 모달을 열고 닫는 형식의 서비스로, 리덕스를 이용해 전역적으로 모달의 상태를 관리함. 지정영역 외부 클릭시 메뉴 닫힘
        - 유저: 선택한 무드에 따라 유저네임 앞에 컬러를 띄도록 함.
    - 친구페이지: 친구 및 친구 무드 조회, 친구 추가, 친구 삭제, 유저 검색기능
    - 편지페이지: 편지조회, 편지 상세조회, 편지삭제, 편지보내기
    - 로고, 디자인: 피그마
    - 재활용 가능한 컴포넌트 제작(atoms): 버튼, 인풋(text type), 레이아웃, 미니카드, 오버레이, 페이지네이션, 쉐도우박스, 유저 제작



### 정예륜 (FE)

- 기술스택 `React` `Styled-component` `Redux` `Axios` `Figma`
- 역할
    - 리덕스 초기 세팅
        - Redux-Toolkit + Redux-Persist 를 사용해 유저 정보 중 
        이메일, 닉네임, 구매한 색 테마 리스트, 적용한 색 테마를 전역으로 관리
    - 구글 로그인 및 로그아웃 구현
        - 로그인 후 서버로부터 받아온 JWT 토큰(액세스)을 리액트 쿠키에 저장하여 관리
    - 회원가입 페이지
        - 기존유저는 로그인 후 홈으로 라우팅 / 신규유저는 회원가입 페이지로 라우팅
    - 색테마 모달
        - 테마 구매
            - 테마 구매시 포인트 차감
        - 테마 적용
        - 구매와 적용한 테마에 따른 구매/적용 버튼의 비활성화
    - 월별 기록
        - 월별 데이터에서 가장 많이 기록된 색상 순으로 4가지를 추출 후 그라데이션으로 시각화



### 정우철 (BE)

- 기술스택
- 역할



### 조민택 (BE)

- 기술스택 `Java` `Spring`  `Spring Security` `JPA`  `MySql` `Redis`
- 역할
    - 로그인 및 로그아웃 기능 구현
        - JWT 사용한 구글 Oauth 로그인 구현
        - redis 사용한 로그아웃 기능 구현
    - 서비스 핵심 기능 구현
        - 회원 CRUD 구현
        - Mood CRUD 구현
        - Todo CRUD 구현
        - Palette CRUD 구현
    - 예외처리
        - AOP를 이용한 예외처리 로직 구현
        - Custom Exception 클래스 구현

## 사용 스택 및 협업 툴
![MacBook Air - 1 (2)](https://user-images.githubusercontent.com/85021536/205480415-4eb7c9ba-241c-48f6-b470-7bf1f8a302b3.png)

## API Docs
Mail -> https://documenter.getpostman.com/view/22570114/2s8YzMX5Hu

Member -> https://documenter.getpostman.com/view/22570114/2s8YzMX5Hv

Mood -> https://documenter.getpostman.com/view/22570114/2s8YzMX5Hw

Todo -> https://documenter.getpostman.com/view/24751832/2s8YzMX5NK

Palette -> https://documenter.getpostman.com/view/24751832/2s8YzMX5NL

## ERD 설계
![image](https://user-images.githubusercontent.com/105726931/205496221-1dbedf2b-01d3-4069-9624-7d3dac702758.png)


## 주요기능 시연
- 구글 회원가입
    1. 로그인시 신규 유저 회원가입 페이지로 이동
        ![회원가입](https://user-images.githubusercontent.com/103527404/205484257-44b3a866-7851-4548-9430-50788dedd65b.gif)

- 구글 로그인 및 로그아웃
    1. 로그인시 기존 유저 홈으로 라우팅
        ![로그아웃 및 로그인](https://user-images.githubusercontent.com/103527404/205484260-c4063dd3-17e4-468c-b8c0-50ee0f4b7ec3.gif)

- 오늘의 무드 기록
    
    1. 무드 목록 순회
        ![무드선택](https://user-images.githubusercontent.com/81802993/205482600-6c3d73ce-d960-4833-a2d9-1711be187192.gif)
    2. 다크모드
        ![다크모드](https://user-images.githubusercontent.com/81802993/205482612-928d08b8-c52b-4676-afb6-956e27252634.gif)
    3. 무드등록
        ![무드등록](https://user-images.githubusercontent.com/81802993/205482617-4981a257-8657-4bd4-b111-2753ed81c52d.gif)
    4. 무드상세보기
        ![무드상세보기](https://user-images.githubusercontent.com/81802993/205482671-c7b9acfb-0f9f-41a8-98bd-6f4e512a8c6b.gif)
    5. 무드수정
        ![무드수정](https://user-images.githubusercontent.com/81802993/205482676-766912ad-9984-4ee1-967c-0d8f0c09e71b.gif)


- 북마크 기능

![bookmark](https://user-images.githubusercontent.com/85021536/205480786-113a57d7-dcf4-4877-8849-c2749f6be241.gif)

- 친구 기능

![friend](https://user-images.githubusercontent.com/85021536/205480807-bf149ce3-0bdb-4937-bd8a-4f2cb43f8197.gif)

- 편지 기능

![letter](https://user-images.githubusercontent.com/85021536/205480805-37d4a47a-3569-41cb-b2ee-934229127cd7.gif)

- 투두리스트 기능
    1. 투두 추가, 완료처리, 삭제
        ![투두 완료](https://user-images.githubusercontent.com/81802993/205482567-3d2dca79-64cc-49de-88d9-102696c39595.gif)
    2. 어제 완료 못한 투두 오늘 불러오기
        ![어제 투두 불러오기](https://user-images.githubusercontent.com/81802993/205482742-9123751a-2d4b-4943-8ef4-89b404e58852.gif)

- 색 테마 구매 기능
    1. 색 테마 조회 
        ![색테마1](https://user-images.githubusercontent.com/103527404/205484266-22b751e4-9ca3-4294-b80d-289ff3676646.gif)
    2. 색 테마 구매 및 적용
        ![색테마2](https://user-images.githubusercontent.com/103527404/205484271-c3b713ff-86e6-4aaa-a327-8b414d3d3418.gif)

- 월별 감정 기록
    1. 상위 4개 갑정 추출하여 시각화
        ![한달기록](https://user-images.githubusercontent.com/103527404/205484318-3d7e6283-27ad-4926-acce-cfc8c4f8b7ec.gif)

- 연도별 감정 기록
    1. 히트맵 캘린더, 파이차트, 무드 및 투두 돌이켜보기
        ![1년치](https://user-images.githubusercontent.com/81802993/205482832-223e7da0-2d32-4d49-9d73-8f7e1e1f4261.gif)
    2. 1년치 더미데이터: 연도 변경
        ![1년치더미1](https://user-images.githubusercontent.com/81802993/205482842-5ceacbc2-18f4-410a-a182-ba4879b4fd8e.gif)
    3. 1년치 더미데이터: 셀 선택으로 특정 일자 선택
        ![1년치더미2](https://user-images.githubusercontent.com/81802993/205482847-fc0f0d38-1a95-4980-abb4-5d9c891411f7.gif)
    4. 1년치 더미데이터ㅣ 과거 일자의 무드 및 투두 돌이켜보기
        ![1년치더미3](https://user-images.githubusercontent.com/81802993/205482922-573e4899-8be1-4200-bf88-e2250ebee51a.gif)



