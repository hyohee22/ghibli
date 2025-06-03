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
  document.querySelector('.footer-include').innerHTML = data;});

/* 아코디언 */
  window.onscroll = function () {
    let btn = document.getElementById("topBtn");
    btn.style.display = (window.scrollY > 300) ? "flex" : "none";
  };
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".notice-accordion-item");

  items.forEach(item => {
    const title = item.querySelector(".notice-accordion-title");
    const content = item.querySelector(".notice-accordion-content");

    title.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // 모든 아이템 닫기
      items.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".notice-accordion-title").classList.remove("active");

        const c = i.querySelector(".notice-accordion-content");
        c.style.maxHeight = null;
      });

      // 클릭한 아이템 열기
      if (!isActive) {
        item.classList.add("active");
        title.classList.add("active");

        // 실제 높이 계산해서 적용
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
