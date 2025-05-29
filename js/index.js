/* -------------- music ---------------- */
const musicMainpage = document.querySelector('.music-mainpage');
const musicWrap = document.querySelector('.music-wrap');
const mainPagination = document.getElementById('mainPagination'); // ← 여기서 선언해줘야 사용 가능!

// 음악 팝업 애니메이션 + 페이지네이션 숨기기
function musicAnimation(delay = 1000) {
  setTimeout(() => {
    let musicOverlay = document.querySelector('.music-overlay');
    let musicContent = document.querySelector('.music-content');

    // ✅ 음악 팝업 띄우기
    musicOverlay.style.opacity = '1';
    musicContent.style.opacity = '1';
    musicContent.style.top = '50%';

    // ✅ 페이지네이션 숨기기
    mainPagination.classList.add('hidden');
  }, delay);
}

musicAnimation();  // 페이지 로드시 실행

// 음악 ON
document.querySelector('.musicOn').addEventListener('click', function() {
  musicMainpage.play();
  musicWrap.style.display = 'none';

  // ✅ 페이지네이션 다시 보이기
  mainPagination.classList.remove('hidden');

  window.scrollTo(0, 0);
});

// 음악 OFF
document.querySelector('.musicOff').addEventListener('click', function() {
  musicMainpage.pause();
  musicMainpage.currentTime = 0;
  musicWrap.style.display = 'none';

  // ✅ 페이지네이션 다시 보이기
  mainPagination.classList.remove('hidden');

  window.scrollTo(0, 0);
});



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
  
/* -------------------- pagenation -------------------- */
document.addEventListener('DOMContentLoaded', function() {
  let mainPagination = document.getElementById('mainPagination');
  let paginationItems = document.querySelectorAll('.pagination-item');
  let sections = [
      document.getElementById('main-section'),
      document.getElementById('notice-section'),
      document.getElementById('event-section'),
      document.getElementById('movie-section'),
      document.getElementById('inside-section'),
      document.getElementById('map-section'),
      document.getElementById('email-section')
  ].filter(el => el != null);

  // 스크롤값 기준 숨길 범위 (예: 2000 ~ 3000)
  const hideStart = 100;
  const hideEnd = 1800;

  function updatePagination() {
      let scrollPosition = window.scrollY;
      console.log('현재 스크롤 위치:', scrollPosition);  // 👈 디버깅용 콘솔 로그

      let currentActivePageNum = 1;

      for (let i = sections.length - 1; i >= 0; i--) {
          let section = sections[i];
          if (!section) continue;

          let activationThreshold = section.offsetTop - window.innerHeight * 0.3;

          if (scrollPosition >= activationThreshold) {
              currentActivePageNum = i + 1;
              break;
          }
      }

      paginationItems.forEach(item => {
          const pageNum = parseInt(item.dataset.page);
          item.classList.toggle('active', pageNum === currentActivePageNum);
      });

      if (scrollPosition >= hideStart && scrollPosition <= hideEnd) {
          mainPagination.classList.add('hidden');
      } else {
          mainPagination.classList.remove('hidden');
      }
  }

  paginationItems.forEach(item => {
      item.addEventListener('click', function(e) {
          e.preventDefault();
          let targetId = this.getAttribute('href');
          let targetSection = document.querySelector(targetId);

          if (targetSection) {
              const offset = 0;
              const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementPosition - offset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  window.addEventListener('scroll', updatePagination);
  window.addEventListener('resize', updatePagination);

  updatePagination();
});



/* -------------------- ghibli-mainvisual -------------------- */
// 메인 비주얼 - 비디오 확대
let mainvisualLogo = document.querySelector('.ghibli-main-logo');
let mainvisualMedia = document.querySelector('.ghibli-mainvisual-media');
let mainvisualVideo = document.querySelector('.ghibli-mainvisual-video');

document.addEventListener('scroll', function() {
  let scrollPosition = window.scrollY;
  if(scrollPosition > 100){
    mainvisualLogo.style.opacity = '0';
    mainvisualMedia.style.position = 'fixed';
    mainvisualMedia.style.width = '100vw';
    mainvisualVideo.style.maxWidth = '100vw';
  }else{
    mainvisualLogo.style.opacity = '1';
    mainvisualMedia.style.position = 'relative';
    mainvisualMedia.style.width = '1160px';
    mainvisualVideo.style.maxWidth = '100vw';
  }
});

// 메인 비주얼 - 캐치프레이즈 등장
let catchphrase = document.querySelector('.ghibli-catchphrase h1');

document.addEventListener('scroll', function(){
  let scrollPosition = window.scrollY;
  if(scrollPosition > 400){
    catchphrase.style.bottom = '300px';
    catchphrase.style.opacity = '1';
  }else{
    catchphrase.style.bottom = '0';
    catchphrase.style.opacity = '0';
  }
})

// 메인 비주얼 - about
let aboutSection = document.querySelector('.ghibli-about');
let mainvisualOverlay = document.querySelector('.ghibli-mainvisual-overlay');

document.addEventListener('scroll', function(){
  let scrollPosition = window.scrollY;
  if(scrollPosition > 1000){
    aboutSection.style.bottom = '0';
    aboutSection.style.opacity = '1';
    mainvisualOverlay.style.opacity = '1';
  }else{
    aboutSection.style.bottom = '-100px';
    aboutSection.style.opacity = '0';
    mainvisualOverlay.style.opacity = '0';
  }
})

// 메인 비주얼 - about - history 애니메이션 제어
let ghibliAboutHistoryList = document.querySelector('.ghibli-about-history');

ghibliAboutHistoryList.addEventListener('mouseenter', function(){
  ghibliAboutHistoryList.style.animationPlayState = 'paused';
})

ghibliAboutHistoryList.addEventListener('mouseleave', function(){
  ghibliAboutHistoryList.style.animationPlayState = 'running';
})

// 메인 비주얼 - about - history btn → background 제어
// swiper
const swiper2 = new Swiper(".ghibli-mainvisual-image-swiper", {
  loop: true, // 순환 재생
  autoplay: {
    delay: 5000,
  },
  effect: "fade",
})

// btn → swiper .active 제어
let mainvisualAboutMovieTitleBtn = document.querySelectorAll('.ghibli-about-history button');
let mainvisualAboutBGImgSwiper = document.querySelectorAll('.ghibli-mainvisual-image-swiper');

mainvisualAboutMovieTitleBtn.forEach(function(btn, index){
  btn.addEventListener('click', function(){
    mainvisualAboutMovieTitleBtn.forEach(function(button){
      button.classList.remove('active');
    })
    mainvisualAboutBGImgSwiper.forEach(function(BGImgSwiper){
      BGImgSwiper.classList.remove('active');
    })
    btn.classList.add('active');
    mainvisualAboutBGImgSwiper[index].classList.add('active');
  })
})


console.log(mainvisualAboutMovieTitleBtn, mainvisualAboutBGImgSwiper);
/* -------------------- section: event-------------------- */
var swiper3 = new Swiper(".event-ticket-swiper", {
  direction: 'vertical',
  slidesPerView: 3,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  mousewheel: false,
});

// 날짜 요소들 가져오기
var dateLinks = document.querySelectorAll(".event-calnder-date");

// 날짜 클릭하면 해당 슬라이드로 이동!
dateLinks.forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault(); 
    var targetSlide = this.getAttribute("data-target"); 
    var slideNumber;

    if (targetSlide === "slide1") {
      slideNumber = 0;
    } else if (targetSlide === "slide2") {
      slideNumber = 1;
    } else if (targetSlide === "slide3") {
      slideNumber = 2;
    } else if (targetSlide === "slide4") {
      slideNumber = 3;
    } else {
      return;
    }

    swiper3.slideToLoop(slideNumber, 500);  // 수정된 부분
  });
});

/* -------------------- section: movie-film -------------------- */
// swiper
  const swiper = new Swiper(".movie-film-swiper", {
    loop: true, // 순환 재생
    autoplay: {
      delay: 5000, // 5초마다 자동 전환
      disableOnInteraction: false, // 유저 조작 후에도 자동 재생 유지
      pauseOnMouseEnter: true // 마우스 올리면 멈춤
    },
    spaceBetween: 10,
    slidesPerView: 2,
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      }
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  })

// swiper > div .movie-trailer-youtube
document.addEventListener("DOMContentLoaded", function () {
  const previews = document.querySelectorAll(".movie-trailer-youtube");

  previews.forEach(preview => {
    const videoId = preview.dataset.videoId;

    preview.addEventListener("mouseenter", function () {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
      iframe.frameBorder = "0";
      iframe.allow = "autoplay; encrypted-media";
      iframe.allowFullscreen = true;
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      
      preview.appendChild(iframe);
    });

    preview.addEventListener("mouseleave", function () {
      preview.innerHTML = ""; // iframe 제거
    });
    
  });
});

/* -------------- section.ghibli-inside ---------------- */
function showContent(index) {
  let items = document.querySelectorAll('.content-item');
  let selected = items[index];
  let title = selected.querySelector('h5').innerText;
  let description = selected.querySelector('p').innerText;
  let imageSrc = selected.querySelector('img').getAttribute('src');
  document.getElementById('sub-title').innerText = title;
  document.getElementById('description').innerText = description;
  document.getElementById('main-image').setAttribute('src', imageSrc);
}
  window.addEventListener('DOMContentLoaded', () => {
    showContent(0);
  });





/* -------------- footer ---------------- */
  fetch('../include/footer.html')
.then(response => response.text())
.then(data => {
  document.querySelector('.footer-include').innerHTML = data;})

  window.onscroll = function () {
    let btn = document.getElementById("topBtn");
    btn.style.display = (window.scrollY > 300) ? "flex" : "none";
  };