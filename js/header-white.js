/* -------------- header ---------------- */
fetch('../include/header.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.header-include').innerHTML = data;
    //언어 변경 이벤트
    const globalIcon = document.querySelector('.global-btn');
    const globalList = document.querySelector('.global-list');
    /* console.log(globalIcon, globalList); */
    globalIcon.addEventListener('click', (e) => {
      e.preventDefault();
      if (globalList.style.display === "block") {
        globalList.style.display = "none";
      } else {
        globalList.style.display = "block";
      }
    });

    //서브메뉴 이벤트
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const subWrap = document.querySelector('.sub-wrap');
    const closeBtn = document.querySelector('.close-btn');

    /* console.log(hamburgerBtn, subWrap); */
    hamburgerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (subWrap.style.display === "block") {
        subWrap.style.display = "none";
      } else {
        subWrap.style.display = "block";
      }
    });
    closeBtn.addEventListener('click', ()=>{
        subWrap.style.display = "none";
    });
  });

/* -------------- footer ---------------- */
fetch('../include/footer.html')
.then(response => response.text())
.then(data => {
document.querySelector('.footer-include').innerHTML = data;})

// 스크롤 이벤트
window.onscroll = function () {
  let btn = document.getElementById("topBtn");
  btn.style.display = (window.scrollY > 300) ? "flex" : "none";
};

/* -------------- subpage movie-list ---------------- */
if (document.querySelector('.movie-list-content')) {
  // 요소 선택
  let movieTitle = document.querySelectorAll('.movie-desc strong');
  let movieSearch = document.querySelector('.movie-search label input');
  let moviePoster = document.querySelectorAll('.movie-poster');
  let noResult = document.querySelector('.no-result');
  let movieList = document.querySelector('.movie-list');
  let movieItems = Array.from(moviePoster);
  let movieSelect = document.querySelector('.movie-list-array');

  // 요소가 전부 존재할 때만 실행
  if (movieTitle.length && movieSearch && noResult && moviePoster.length && movieList && movieSelect) {
    // 타이핑 placeholder
    let movieTitleIndex = 0;
    let charIndex = 0;

    function type() {
      let current = movieTitle[movieTitleIndex].textContent;
      movieSearch.placeholder = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        setTimeout(() => {
          charIndex = 0;
          movieTitleIndex = (movieTitleIndex + 1) % movieTitle.length;
          type();
        }, 2000);
      } else {
        setTimeout(type, 100);
      }
    }

    type();

    // 검색 기능
    movieSearch.addEventListener('input', function () {
      let keyword = this.value.trim().toLowerCase();
      let matchCount = 0;

      movieTitle.forEach((title, index) => {
        let movieTitleText = title.textContent.toLowerCase();
        let movieItem = moviePoster[index];

        if (movieTitleText.includes(keyword)) {
          movieItem.style.display = 'block';
          matchCount++;
        } else {
          movieItem.style.display = 'none';
        }
      });

      noResult.style.display = matchCount === 0 ? 'block' : 'none';
    });

    // 정렬 기능
    function sortMovies(type) {
      let sorted = [];

      if (type === 'old') {
        sorted = movieItems.sort((a, b) => new Date(a.dataset.release) - new Date(b.dataset.release));
      } else if (type === 'new') {
        sorted = movieItems.sort((a, b) => new Date(b.dataset.release) - new Date(a.dataset.release));
      } else if (type === 'asc') {
        sorted = movieItems.sort((a, b) => {
          const titleA = a.querySelector('.movie-desc strong').textContent.toLowerCase();
          const titleB = b.querySelector('.movie-desc strong').textContent.toLowerCase();
          return titleA.localeCompare(titleB);
        });
      }

      sorted.forEach(item => movieList.appendChild(item));
    }

    movieSelect.addEventListener('change', (e) => {
      sortMovies(e.target.value);
    });
  }
}

/* -------------- subpage movie-list ---------------- */
/* -------------- section.movie-music ---------------- */
// 요소 선택
let musicWrap = document.querySelector('.movie-music-inner');
let musicAudio = document.querySelector('.movie-music-audio');
let musicPrevBtn = document.querySelector('.movie-music-prev-btn');
let musicNextBtn = document.querySelector('.movie-music-next-btn');
let musicPlayBtn = document.querySelector('.music-on');
let musicPauseBtn = document.querySelector('.music-off');
let musicProgress = document.querySelector('.movie-music-progress-bar');
let musicProgressBar = document.querySelector('.movie-music-bar');
let musicCurrentTimer = document.querySelector('.movie-music-current-timer');
let musicDurationTimer = document.querySelector('.movie-music-duration-timer');

// 재생/일시정지 제어
musicPlayBtn.addEventListener('click', function () {
  musicAudio.play();
  musicPlayBtn.style.display = 'none';
  musicPauseBtn.style.display = 'block';
});

musicPauseBtn.addEventListener('click', function () {
  musicAudio.pause();
  musicPauseBtn.style.display = 'none';
  musicPlayBtn.style.display = 'block';
});

// 이전/다음 버튼 (현재는 동일한 기능: 처음부터 재생)
musicPrevBtn.addEventListener('click', function () {
  musicAudio.currentTime = 0;
  musicAudio.play();
});

musicNextBtn.addEventListener('click', function () {
  musicAudio.currentTime = 0;
  musicAudio.play();
});

// 전체 시간 표시 (음악 로드 시 1회 실행)
musicAudio.addEventListener('loadeddata', () => {
  let audioDuration = musicAudio.duration;
  let totalMin = Math.floor(audioDuration / 60);
  let totalSec = Math.floor(audioDuration % 60).toString().padStart(2, '0');
  musicDurationTimer.innerText = `${totalMin}:${totalSec}`;
});

// 재생 중 시간 업데이트 + 진행 바
musicAudio.addEventListener('timeupdate', e => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  musicProgressBar.style.width = `${progressWidth}%`;

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60).toString().padStart(2, '0');
  musicCurrentTimer.innerText = `${currentMin}:${currentSec}`;
});

// 진행 바 클릭으로 위치 변경
musicProgress.addEventListener('click', (e) => {
  let progressWidth = musicProgress.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = musicAudio.duration;

  musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
});

/* -------------- section.movie-character ---------------- */
// 캐릭터 소개 탭
let characterBtn = document.querySelectorAll('.movie-character-list li button');
let characterInfo = document.querySelectorAll('.movie-character-information-list > li');

console.log(characterBtn, characterInfo);

characterBtn.forEach(function(btn, index){
  btn.addEventListener('click', function(){
    characterBtn.forEach(function(button){
      button.classList.remove('active');
    })
    characterInfo.forEach(function(info){
      info.classList.remove('active');
    })
    btn.classList.add('active');
    characterInfo[index].classList.add('active');
  })
})

/* -------------- section.movie-image ---------------- */
// swiper
var swiper = new Swiper(".movie-image-swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

