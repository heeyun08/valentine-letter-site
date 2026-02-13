# Valentine Letter Web

발렌타인데이 메시지 + 편지봉투 클릭 시 편지 이미지와 기프티콘 이미지가 나타나는 간단한 웹페이지입니다.

## 왜 이 방식이 좋은가요?

처음 웹개발을 시작할 때는 **HTML + CSS + JavaScript** 조합이 가장 쉽고 빠릅니다.

- HTML: 화면 구조 만들기
- CSS: 디자인 꾸미기
- JavaScript: 클릭 시 동작(편지봉투 열기) 처리

## 파일 구조

```text
.
├── index.html
├── style.css
├── script.js
├── assets
│   ├── letter-placeholder.svg
│   └── gifticon-placeholder.svg
└── README.md
```

## 실행 방법 (설치 없이)

터미널에서 아래 명령어를 실행하세요.

```bash
cd "/Users/사용자이름/폴더이름/valentine-letter-site"
python3 -m http.server 5500
```

브라우저에서 아래 주소로 접속합니다.

```text
http://localhost:5500
```

## 내 편지/기프티콘 이미지로 바꾸기

1. `assets/letter-placeholder.svg` 를 원하는 편지 이미지 파일로 교체  
   (예: `assets/my-letter.png`)
2. `assets/gifticon-placeholder.svg` 를 원하는 기프티콘 이미지 파일로 교체  
   (예: `assets/my-gifticon.jpg`)
3. `index.html` 에서 이미지 경로를 수정

예시:

```html
<img src="./assets/my-letter.png" alt="손편지 이미지" />
<img src="./assets/my-gifticon.jpg" alt="기프티콘 이미지" />
```

## 문구 바꾸기

`index.html` 의 아래 문장을 원하는 문장으로 수정하면 됩니다.

- 제목: `Happy Valentine's Day`
- 본문: `늘 내 곁에 있어줘서 고마워. 오늘도 많이 사랑해!`
