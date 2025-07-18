/*
//마우스 휠을 내렸을때, 다음 행으로 전체화면 애니메이션 설정
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)
    // gsap code here!
    
    let panels = gsap.utils.toArray(".all");
    // we'll create a ScrollTrigger for each panel just to track when each panel's top hits the top of the viewport (we only need this for snapping)
    let tops = panels.map(panel => ScrollTrigger.create({trigger: panel, start: "top top"}));
    
    panels.forEach((panel, i) => {
        ScrollTrigger.create({
        trigger: panel,
        start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
        pin: true, 
        pinSpacing: false 
        });
    });
    
    ScrollTrigger.create({
        snap: {
        snapTo: (progress, self) => {
        let panelStarts = tops.map(st => st.start), // an Array of all the starting scroll positions. We do this on each scroll to make sure it's totally responsive. Starting positions may change when the user resizes the viewport
            snapScroll = gsap.utils.snap(panelStarts, self.scroll()); // find the closest one
        return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll); // snapping requires a progress value, so convert the scroll position into a normalized progress value between 0 and 1
        },
        duration: 0.5
        }
    });
});
*/

/* 스크롤 트리거 */
document.addEventListener("DOMContentLoaded", (event) => {
gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.create({
trigger: "#wrap_slide", // swiper 영역
start: "top center",    // swiper가 뷰포트 중간에 닿을 때
end: "bottom center",
onEnter: () => {
    document.querySelector('#wrap_slide').scrollIntoView({
    behavior: 'smooth'
    });
},
onEnterBack: () => {
    document.querySelector('#wrap_slide').scrollIntoView({
    behavior: 'smooth'
    });
}
});
// 스크롤 트리거 작성 종료
});

let isAnimating = false;  // 애니메이션 진행 중 플래그

const swiper = new Swiper('#wrap_slide', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1000,
    mousewheel: true,
    on: {
    reachEnd: () => {
        // 마지막 슬라이드에 도달하면 스와이퍼 휠 끄기
        swiper.mousewheel.disable();
          // ✅ 5초 후에 scrollIntoView 실행
        setTimeout(() => {
            swiper.mousewheel.enable(); // 휠 재활성화
            document.querySelector('.list').scrollIntoView({ behavior: 'smooth' });
        }, 2000); // 원하는 지연 시간 조정 가능 (예: 2000ms)
    },
    reachBeginning: () => {
        // 다시 처음 슬라이드로 오면 필요시 enable
        swiper.mousewheel.disable();
        setTimeout(() => {
            swiper.mousewheel.enable();
            document.querySelector('.value').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    }
    }
});
let goingForward = true;  // 진행 방향 상태

document.querySelector('#wrap_slide').addEventListener('click', () => {
const lastIndex = swiper.slides.length - 1;
const currentIndex = swiper.activeIndex;

if (goingForward) {
    if (currentIndex < lastIndex) {
    swiper.slideNext();
    } else {
    goingForward = false;  // 마지막 슬라이드라면 역방향으로 변경
    swiper.slidePrev();
    }
} else {
    if (currentIndex > 0) {
    swiper.slidePrev();
    } else {
    goingForward = true;  // 첫 슬라이드라면 다시 정방향으로 변경
    swiper.slideNext();
    }
}
});
// 추가: 위로 스크롤해서 다시 Swiper로 들어오면 활성화
window.addEventListener('scroll', () => {
    const swiperEl = document.querySelector('#wrap_slide');
    const rect = swiperEl.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
    // 화면 안에 다시 Swiper가 들어오면 활성화
    swiper.mousewheel.enable();
    }
});

if (swiper.isEnd) {
    document.querySelector('.list').scrollIntoView({ behavior: 'smooth' });
}
/* 
1. 스크롤 시, 스와이퍼 영역 중간에 도착하면 전체화면 에니메이션
2. 스와이퍼 마지막까지 완료하면 스크롤로 푸터까지 볼 수 있음
3. 역순으로(스크롤 올림) 스와이퍼 첫페이지에 도착하면 이전장으로 이동
+ 스크롤, 스와이프, 클릭으로 이동 가능
*/


/* 1행 스와이퍼 적용 */
const bestSwiper = new Swiper('#gate_slide',{
    //옵션:값,
    loop:true,
    autoplay:{
	delay:3000,
    disableOnInteraction:false,
},
})


const value = new Swiper('#value_slide',{
    slidesPerView:1.5,
    centeredSlides:true,
    loop:true,
    autoplay:{
	delay:3500,
    disableOnInteraction:false,
    },
    navigation:{
        nextEl:'#value_slide .swiper-button-next',
        prevEl:'#value_slide .swiper-button-prev',
    },
    breakpoints: { //반응형 조건 속성
        320: { 
        slidesPerView: 3,
        direction: 'vertical',
        spaceBetween:10,
        },
        799: {
        slidesPerView:1.5,
        direction: 'horizontal',
        spaceBetween:100,
        },
    }
})

