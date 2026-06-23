"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import { Button } from "@heroui/react";
import { Icon } from "@gravity-ui/uikit";
import {
  BookOpen,
  Heart,
  Persons,
  ArrowRight,
} from "@gravity-ui/icons";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    icon: BookOpen,
    title: "Capture Your Life Lessons",
    description:
      "Every experience holds a lesson. Preserve your thoughts, memories, and wisdom in one place to reflect on your personal journey.",
  },
  {
    id: 2,
    icon: Heart,
    title: "Learn, Reflect & Grow",
    description:
      "Mark your favorite lessons, revisit meaningful experiences, and track your progress as you continue growing every day.",
  },
  {
    id: 3,
    icon: Persons,
    title: "Share Wisdom With Others",
    description:
      "Explore inspiring stories from the community and share your own life lessons to motivate and help others.",
  },
];

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700">
      {/* Decorative Background */}
      <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="container mx-auto px-6 py-20 lg:py-28">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="grid items-center gap-14 lg:grid-cols-2">
                {/* Left Content */}
                <div className="space-y-8 text-white">
                  <div className="inline-flex rounded-2xl bg-white/15 p-5 backdrop-blur-lg">
                    <Icon data={slide.icon} size={56} />
                  </div>

                  <div>
                    <h1 className="text-4xl font-extrabold leading-tight lg:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-100">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      as={Link}
                      href="/lessons"
                      size="lg"
                      className="bg-white font-semibold text-emerald-600 hover:bg-emerald-50"
                      endContent={<Icon data={ArrowRight} size={16} />}
                    >
                      Explore Lessons
                    </Button>

                    <Button
                      as={Link}
                      href="/add-lesson"
                      variant="bordered"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-emerald-600"
                    >
                      Share Your Lesson
                    </Button>
                  </div>
                </div>

                {/* Right Card */}
                <div className="flex justify-center">
                  <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
                    <h2 className="mb-8 text-2xl font-bold text-white">
                      Why Digital Life Lessons?
                    </h2>

                    <div className="space-y-5">
                      <div className="rounded-2xl bg-white/10 p-5 transition hover:bg-white/20">
                        <div className="mb-2 flex items-center gap-3">
                          <Icon data={BookOpen} size={22} />
                          <h3 className="font-semibold text-white">
                            Organize Your Wisdom
                          </h3>
                        </div>

                        <p className="text-sm text-emerald-100">
                          Store your personal experiences in one secure place
                          and organize them for easy access.
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/10 p-5 transition hover:bg-white/20">
                        <div className="mb-2 flex items-center gap-3">
                          <Icon data={Heart} size={22} />
                          <h3 className="font-semibold text-white">
                            Save Favorites
                          </h3>
                        </div>

                        <p className="text-sm text-emerald-100">
                          Bookmark the lessons that inspire you the most and
                          revisit them whenever you need motivation.
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/10 p-5 transition hover:bg-white/20">
                        <div className="mb-2 flex items-center gap-3">
                          <Icon data={Persons} size={22} />
                          <h3 className="font-semibold text-white">
                            Learn From the Community
                          </h3>
                        </div>

                        <p className="text-sm text-emerald-100">
                          Discover meaningful stories and life experiences
                          shared by people from around the world.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 rounded-2xl bg-emerald-400/20 p-4 text-center">
                      <p className="text-sm font-medium text-white">
                    <span className="font-bold">Every lesson matters.</span>
                        <br />
                        Build your collection of wisdom, one story at a time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}