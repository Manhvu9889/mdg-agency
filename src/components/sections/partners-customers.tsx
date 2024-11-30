import ClientsImage from '@/images/items/clients.webp';
import NumberOfUsesImage from '@/images/items/number-of-uses.webp';
import Image1 from '@/images/items/ovftank_1.webp';
import Image10 from '@/images/items/ovftank_10.webp';
import Image11 from '@/images/items/ovftank_11.webp';
import Image12 from '@/images/items/ovftank_12.webp';
import Image2 from '@/images/items/ovftank_2.webp';
import Image3 from '@/images/items/ovftank_3.webp';
import Image4 from '@/images/items/ovftank_4.webp';
import Image5 from '@/images/items/ovftank_5.webp';
import Image6 from '@/images/items/ovftank_6.webp';
import Image7 from '@/images/items/ovftank_7.webp';
import Image8 from '@/images/items/ovftank_8.webp';
import Image9 from '@/images/items/ovftank_9.webp';
import ReviewsImage from '@/images/items/reviews.webp';
import TypicalPartnersImage from '@/images/items/typical-partners.webp';
import type { ImageMetadata } from 'astro';
import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface PartnersCustomersContent {
    title: string;
    subtitle: string;
    statistics: string[];
}

interface PartnersCustomersProps {
    className?: string;
    content: PartnersCustomersContent;
}

interface StatItemProps {
    image: ImageMetadata;
    title: string;
    endValue: number;
}

const StatItem: React.FC<StatItemProps> = ({ image, title, endValue }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        animateValue(0, endValue, 800);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [endValue]);

    const animateValue = (start: number, end: number, duration: number) => {
        const startTimestamp = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);

            const current = Math.floor(progress * (end - start) + start);

            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <div
            ref={elementRef}
            className="flex items-center gap-4 rounded-lg p-4"
        >
            <img
                src={image.src}
                alt={title}
                className="h-12 w-12 shrink-0 object-contain hue-rotate-[280deg] invert sm:h-14 sm:w-14"
            />
            <div className="flex flex-col">
                <p className="text-2xl font-bold text-[#FFE600] sm:text-3xl">
                    {count.toLocaleString()}+
                </p>
                <h3 className="text-sm font-medium text-white sm:text-base">
                    {title}
                </h3>
            </div>
        </div>
    );
};

const PartnersCustomers: React.FC<PartnersCustomersProps> = ({
    className,
    content
}) => {
    const stats = [
        {
            image: NumberOfUsesImage,
            title: content.statistics[0],
            endValue: 10000
        },
        {
            image: ReviewsImage,
            title: content.statistics[1],
            endValue: 1000
        },
        {
            image: ClientsImage,
            title: content.statistics[2],
            endValue: 500
        },
        {
            image: TypicalPartnersImage,
            title: content.statistics[3],
            endValue: 200
        }
    ];

    const swiperImages = [
        { id: 'partner-1', image: Image1 },
        { id: 'partner-2', image: Image2 },
        { id: 'partner-3', image: Image3 },
        { id: 'partner-4', image: Image4 },
        { id: 'partner-5', image: Image5 },
        { id: 'partner-6', image: Image6 },
        { id: 'partner-7', image: Image7 },
        { id: 'partner-8', image: Image8 },
        { id: 'partner-9', image: Image9 },
        { id: 'partner-10', image: Image10 },
        { id: 'partner-11', image: Image11 },
        { id: 'partner-12', image: Image12 }
    ];

    const getImageGroups = () => {
        const groups = [];
        for (let i = 0; i < swiperImages.length; i += 8) {
            groups.push({
                topRow: swiperImages.slice(i, i + 4),
                bottomRow: swiperImages.slice(i + 4, i + 8).length
                    ? swiperImages.slice(i + 4, i + 8)
                    : swiperImages.slice(0, 4)
            });
        }
        return groups;
    };

    return (
        <section className={className}>
            <div className="mb-6 text-center sm:mb-12">
                <h2 className="mb-2 text-2xl font-bold text-white sm:text-4xl">
                    {content.title}
                </h2>
                <p className="text-base text-gray-300 sm:text-xl">
                    {content.subtitle}
                </p>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-4 sm:mb-12 sm:gap-6 lg:grid-cols-4">
                {stats.map((stat) => (
                    <StatItem
                        key={`stat-${stat.title.toLowerCase().replace(/\s+/g, '-')}`}
                        image={stat.image}
                        title={stat.title}
                        endValue={stat.endValue}
                    />
                ))}
            </div>
            <div className="[&_.swiper-button-next]:text-primary [&_.swiper-button-next]:hover:text-primary/80 [&_.swiper-button-prev]:text-primary [&_.swiper-button-prev]:hover:text-primary/80 mb-6 sm:mb-12 [&_.swiper-pagination-bullet-active]:bg-blue-600 [&_.swiper-pagination-bullet]:bg-blue-600/60">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    loop={true}
                    pagination={{
                        clickable: true,
                        type: 'bullets',
                        dynamicBullets: true,
                        dynamicMainBullets: 3
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    className="cursor-grab px-2 active:cursor-grabbing sm:px-4 [&_.swiper-slide]:transition-transform [&_.swiper-slide]:duration-300 [&_.swiper-slide]:ease-in-out"
                >
                    {getImageGroups().map((group) => (
                        <SwiperSlide
                            key={`${group.topRow[0].id}-${group.bottomRow[0].id}`}
                        >
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
                                    {group.topRow.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-lg bg-white p-2 sm:p-3"
                                        >
                                            <img
                                                src={item.image.src}
                                                alt={`Partner ${item.id}`}
                                                className="xs:h-[45px] h-[40px] w-full rounded-lg object-contain sm:h-[50px] md:h-[55px] lg:h-[60px]"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
                                    {group.bottomRow.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-lg bg-white p-2 sm:p-3"
                                        >
                                            <img
                                                src={item.image.src}
                                                alt={`Partner ${item.id}`}
                                                className="xs:h-[45px] h-[40px] w-full rounded-lg object-contain sm:h-[50px] md:h-[55px] lg:h-[60px]"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default PartnersCustomers;
