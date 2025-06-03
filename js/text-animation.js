/* -------------- header ---------------- */
fetch('../include/header.html')
  .then(response => response.text())
  .then(data => {
    const headerElement = document.querySelector('.header-include');
    if (headerElement) {
      headerElement.innerHTML = data;

      const globalIcon = headerElement.querySelector('.global-btn');
      const globalList = headerElement.querySelector('.global-list');
      if (globalIcon && globalList) {
        globalIcon.addEventListener('click', (e) => {
          e.preventDefault();
          globalList.style.display = (globalList.style.display === "block") ? "none" : "block";
        });
      }

      const hamburgerBtn = headerElement.querySelector('.hamburger-btn');
      const subWrap = headerElement.querySelector('.sub-wrap');
      const closeBtn = headerElement.querySelector('.close-btn');
      if (hamburgerBtn && subWrap && closeBtn) {
        hamburgerBtn.addEventListener('click', (e) => {
          e.preventDefault();
          subWrap.style.display = (subWrap.style.display === "block") ? "none" : "block";
        });
        closeBtn.addEventListener('click', () => {
          subWrap.style.display = "none";
        });
      }
    }
  });

/* -------------- qna ---------------- */
window.addEventListener("scroll", function () {
  const btn = document.getElementById("topBtn");
  if (btn) {
    btn.style.display = (window.scrollY > 300) ? "flex" : "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".qna-accordion-item");

  items.forEach(item => {
    const title = item.querySelector(".qna-accordion-title");
    const content = item.querySelector(".qna-accordion-content");

    title.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      items.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".qna-accordion-title").classList.remove("active");
        const c = i.querySelector(".qna-accordion-content");
        c.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        title.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});

function updateQnAContent() {
  const qnaItems = document.querySelectorAll('.qna-btn-item span');

  if (qnaItems.length >= 3) { // qnaItems 길이 체크!
    if (window.innerWidth <= 768) {
      qnaItems[0].innerHTML = '질문 등록';
      qnaItems[1].innerHTML = '이용 정보';
      qnaItems[2].innerHTML = '의견 제안';
    } else {
      qnaItems[0].innerHTML = '궁금한 사항을 질문등록으로 <br>남겨주시면 신속히 답변드리겠습니다.';
      qnaItems[1].innerHTML = '지브리 홈페이지 이용정보를 <br>알려드리겠습니다.';
      qnaItems[2].innerHTML = '지브리 홈페이지 이용 시 불편하셨던 점이나 제안하실 의견을 남겨주세요.';
    }
  }
}

updateQnAContent();
window.addEventListener('resize', updateQnAContent);

/* -------------- event ---------------- */
const calendarContainer = document.getElementById('calendar');
const monthTitle = document.getElementById('monthTitle');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const defaultMessage = document.getElementById('defaultMessage');
const eventCards = document.getElementById('eventCards');

const monthsData = {
  6: { name: '6월', lastDay: 30, firstWeekday: 0 },
  7: { name: '7월', lastDay: 31, firstWeekday: 2 }
};

let currentYear = 2025;
let currentMonth = 6;

// 달력 초기화
function clearCalendar() {
  calendarContainer.innerHTML = '';

  if (defaultMessage) defaultMessage.style.display = 'block';
  if (eventCards) eventCards.style.display = 'none';
}

//달력
function renderCalendar(year, month) {
  clearCalendar();

  // 데이터가 없으면 메시지 출력
  if (!monthsData[month]) {
    monthTitle.textContent = `${year}년 ${month}월 데이터 없음`;
    return;
  }

  const { name, lastDay, firstWeekday } = monthsData[month];
  monthTitle.textContent = `${year}년 ${name} 이벤트 달력`;

  const totalCells = Math.ceil((firstWeekday + lastDay) / 7) * 7;

  // 시작 요일 전 빈 칸
  for (let i = 0; i < firstWeekday; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('day', 'empty');
    calendarContainer.appendChild(emptyCell);
  }

  // 날짜 출력
  for (let day = 1; day <= lastDay; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');

    const weekday = (firstWeekday + day - 1) % 7;

    let dateColor = '#333'; // 평일 기본색
    let eventColor = '#7A8450'; // 이벤트 텍스트 색

    if (weekday === 0) { // 일요일
      dateColor = '#FF6B6B';
      eventColor = '#FF6B6B';
    } else if (weekday === 6) { // 토요일
      dateColor = '#4D96FF';
      eventColor = '#4D96FF';
    }

    dayDiv.innerHTML = `
      <div style="color:${dateColor}; font-weight:bold;">${day}</div>
      <div style="font-size:14px; color:${eventColor}; margin-top:10px;">3개 이벤트</div>
    `;

    // 날짜 클릭 시 기본 메시지 숨기고 이벤트 카드 보여주기
    dayDiv.addEventListener('click', () => {
      if (defaultMessage) defaultMessage.style.display = 'none';
      if (eventCards) eventCards.style.display = 'block';
    });

    calendarContainer.appendChild(dayDiv);
  }

  // 마지막 빈 칸 채우기
  const remainingCells = totalCells - (firstWeekday + lastDay);
  for (let i = 0; i < remainingCells; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('day', 'empty');
    calendarContainer.appendChild(emptyCell);
  }
}

// 이전 달로 이동
prevMonthBtn?.addEventListener('click', () => {
  if (currentMonth > 6) {
    currentMonth--;
    renderCalendar(currentYear, currentMonth);
  } else {
    alert('이전 달 정보가 없습니다!');
  }
});

// 다음 달로 이동
nextMonthBtn?.addEventListener('click', () => {
  if (currentMonth < 7) {
    currentMonth++;
    renderCalendar(currentYear, currentMonth);
  } else {
    alert('다음 달 정보가 없습니다!');
  }
});

renderCalendar(currentYear, currentMonth);


/* -------------- footer ---------------- */
fetch('../include/footer.html')
  .then(response => response.text())
  .then(data => {
    const footerElement = document.querySelector('.footer-include');
    if (footerElement) {
      footerElement.innerHTML = data;
    }
  });
