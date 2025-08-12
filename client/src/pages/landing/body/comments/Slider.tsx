import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import CommentCard from '../../../../components/ui/CommentCard'

export const Slider = () => {
    return (
        <div className="w-full">
            <Swiper
                spaceBetween={16}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    400: {
                        slidesPerView: 1.1,
                    },
                    650: {
                        slidesPerView: 1.3,
                    },
                    800: {
                        slidesPerView: 1.7,
                    },
                    1024: {
                        slidesPerView: 2.1,
                    },
                    1100: {
                        slidesPerView: 3,
                    },
                }}
                loop={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="*:py-4 "
            >
                <SwiperSlide>
                    <CommentCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CommentCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CommentCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CommentCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CommentCard />
                </SwiperSlide>
                <SwiperSlide>
                    <CommentCard />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
