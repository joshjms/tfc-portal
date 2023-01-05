import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

import { Pagination } from "swiper";
import { Mousewheel } from "swiper";
import { Navigation } from "swiper";

import CourseCard from "./coursecard";

export default function Carousel({ user, slides }) {
    if (!user) {
        return (
            <>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    mousewheel={true}
                    modules={[Pagination, Navigation, Mousewheel]}
                    className="hidden lg:block"
                >
                    {slides.map((e, i) => (
                        <SwiperSlide key={i}>
                            <CourseCard mod={e} progress={0} key={i} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    mousewheel={true}
                    modules={[Pagination, Navigation, Mousewheel]}
                    className="lg:hidden"
                >
                    {slides.map((e, i) => (
                        <SwiperSlide key={i}>
                            <CourseCard mod={e} progress={0} key={i} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        );
    }

    return (
        <>
            <Swiper
                slidesPerView={2}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                mousewheel={true}
                modules={[Pagination, Navigation, Mousewheel]}
                className="hidden lg:block"
            >
                {slides.map((e, i) => {
                    const read = user.account.read.filter((f) =>
                        e.chapter.some((g) => f.id === g.id)
                    );

                    const progress =
                        e.chapter.length === 0
                            ? 0
                            : (read.length / e.chapter.length) * 100;

                    return (
                        <SwiperSlide key={i}>
                            <CourseCard mod={e} progress={progress} key={i} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                mousewheel={true}
                modules={[Pagination, Navigation, Mousewheel]}
                className="lg:hidden"
            >
                {slides.map((e, i) => {
                    const read = user.account.read.filter((f) =>
                        e.chapter.some((g) => f.id === g.id)
                    );

                    const progress =
                        e.chapter.length === 0
                            ? 0
                            : (read.length / e.chapter.length) * 100;

                    return (
                        <SwiperSlide key={i}>
                            <CourseCard mod={e} progress={progress} key={i} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
