/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

import { Pagination } from "swiper";
import { Mousewheel } from "swiper";
import { Navigation } from "swiper";

import CourseCard from "./coursecard";

export default function Carousel({ user, slides }) {
    const slideList = slides.sort((a, b) => a.id - b.id);

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
                className="hidden md:block"
            >
                {slideList.map((e, i) => {
                    return (
                        <SwiperSlide
                            key={i}
                            className="flex justify-center items-center"
                        >
                            <CourseCard
                                mod={e}
                                key={i}
                                image_url={`/courses_wp/${(
                                    i + 1
                                ).toString()}.jpg`}
                            />
                        </SwiperSlide>
                    );
                })}
                {user && user.is_staff ? (
                    <SwiperSlide className="flex justify-center items-center">
                        <div className="card w-80 lg:w-96 h-[70%] bg-base-200/50 rounded-[2rem]">
                            <figure>
                                <img
                                    src="/courses_wp/write.jpg"
                                    alt="miku"
                                    className="w-full h-48 object-cover"
                                />
                            </figure>
                            <div className="card-body relative">
                                <p className="text-gray-600 uppercase text-xs font-semibold">
                                    Admin
                                </p>
                                <h2 className="font-medium text-primary">
                                    Create
                                </h2>

                                <Link href="/learn/create">
                                    <button className="btn btn-secondary btn-circle hidden text-center shadow-lg shadow-secondary absolute -top-5 right-5">
                                        <i class="fa-solid fa-pen-to-square text-xl"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ) : null}
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
                className="md:hidden"
            >
                {slideList.map((e, i) => {
                    return (
                        <SwiperSlide
                            key={i}
                            className="flex justify-center items-center"
                        >
                            <CourseCard
                                mod={e}
                                key={i}
                                image_url={`/courses_wp/${(
                                    i + 1
                                ).toString()}.jpg`}
                            />
                        </SwiperSlide>
                    );
                })}
                {user && user.is_staff ? (
                    <SwiperSlide className="flex justify-center items-center">
                        <div className="card w-80 lg:w-96 h-[70%] bg-base-200/50 rounded-[2rem]">
                            <figure>
                                <img
                                    src="/courses_wp/write.jpg"
                                    alt="miku"
                                    className="w-full h-48 object-cover"
                                />
                            </figure>
                            <div className="card-body relative">
                                <p className="text-gray-600 uppercase text-xs font-semibold">
                                    Admin
                                </p>
                                <h2 className="font-medium text-primary">
                                    Create
                                </h2>

                                <Link href="/learn/create">
                                    <button className="btn btn-secondary btn-circle hidden text-center shadow-lg shadow-secondary absolute -top-5 right-5">
                                        <i class="fa-solid fa-pen-to-square text-xl"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ) : null}
            </Swiper>
        </>
    );
}
