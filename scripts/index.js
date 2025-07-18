
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

