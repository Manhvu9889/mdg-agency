import OptimizedPricingImage from '@/images/optimized-pricing.webp';
import TrustedAdsGrowthImage from '@/images/trusted-ads-growth.webp';
import {
    faCheckCircle,
    faMessage,
    faPhone,
    faUserGroup
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
interface HighLimitedAccountsProps {
    className?: string;
    content: {
        title: string;
        subtitle: string;
        pricing: {
            title: string;
            description: string;
            details: string;
        };
        ads_growth: {
            title: string;
            subtitle: string;
            details: string;
        };
        process: {
            title: string;
            steps: {
                title: string;
                description: string;
            }[];
        };
    };
}

const HighLimitedAccounts: React.FC<HighLimitedAccountsProps> = ({
    className,
    content
}) => {
    const formatText = (text: string): string => {
        return text
            .replace(
                /\*blue\*(.*?)\*blue\*/g,
                '<span class="font-semibold text-blue-600">$1</span>'
            )
            .replace(
                /\*yellow\*(.*?)\*yellow\*/g,
                '<span class="font-semibold text-yellow-300">$1</span>'
            )
            .replace(
                /\*white\*(.*?)\*white\*/g,
                '<span class="font-semibold text-white">$1</span>'
            )
            .replace(
                /\*\*(.*?)\*\*/g,
                '<span class="font-semibold text-gray-700">$1</span>'
            );
    };

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const telegramLink = 'https://t.me/mdg_agency';
    const steps = [
        {
            icon: faMessage,
            title: content.process.steps[0].title,
            description: content.process.steps[0].description,
            number: 1
        },
        {
            icon: faPhone,
            title: content.process.steps[1].title,
            description: content.process.steps[1].description,
            number: 2
        },
        {
            icon: faUserGroup,
            title: content.process.steps[2].title,
            description: content.process.steps[2].description,
            number: 3
        },
        {
            icon: faCheckCircle,
            title: content.process.steps[3].title,
            description: content.process.steps[3].description,
            number: 4
        }
    ];

    const cards = [
        {
            title: content.pricing.title,
            highlight: content.pricing.description,
            description: <>{content.pricing.details}</>,
            image: OptimizedPricingImage
        },
        {
            title: content.ads_growth.title,
            highlight: content.ads_growth.subtitle,
            description: <>{content.ads_growth.details}</>,
            image: TrustedAdsGrowthImage
        }
    ];

    return (
        <section
            ref={sectionRef}
            className={`px-4 ${className} overflow-hidden`}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="mb-8 sm:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={
                            isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: -50 }
                        }
                        transition={{
                            duration: 0.8,
                            type: 'spring',
                            bounce: 0.4
                        }}
                        className="text-left"
                    >
                        <motion.h2
                            className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl"
                            initial={{ opacity: 0, x: -50 }}
                            animate={
                                isInView
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -50 }
                            }
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {content.title}
                        </motion.h2>
                        <motion.p
                            className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
                            initial={{ opacity: 0, x: 50 }}
                            animate={
                                isInView
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: 50 }
                            }
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {content.subtitle}
                        </motion.p>
                    </motion.div>
                </div>

                <div className="mb-12 grid gap-4 sm:mb-16 sm:gap-6 md:grid-cols-2">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{
                                opacity: 0,
                                x: index === 0 ? -100 : 100,
                                rotateY: 45
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                                rotateY: 0
                            }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.3,
                                duration: 0.8,
                                type: 'spring',
                                bounce: 0.4
                            }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                            }}
                            className="rounded-[1.5rem] border-2 border-gray-100 bg-white p-4 shadow-lg transition-all duration-300 hover:border-blue-100 sm:rounded-[2rem] sm:p-8"
                        >
                            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
                                        {card.title}
                                    </h3>
                                    <p className="mb-2 text-base font-medium text-blue-600 sm:mb-3 sm:text-lg">
                                        {card.highlight}
                                    </p>
                                    <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: formatText(
                                                    card.title ===
                                                        'Optimized Pricing'
                                                        ? content.pricing
                                                              .details
                                                        : content.ads_growth
                                                              .details
                                                )
                                            }}
                                        />
                                    </p>
                                </div>
                                <div className="flex justify-center lg:w-1/3">
                                    <motion.div
                                        className="relative cursor-pointer"
                                        whileHover={{
                                            scale: 1.1,
                                            transition: {
                                                type: 'spring',
                                                stiffness: 400,
                                                damping: 25
                                            }
                                        }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 rounded-xl blur-lg"
                                            initial={{ opacity: 0 }}
                                            whileHover={{
                                                opacity: [0, 0.5, 0.3],
                                                scale: [1, 1.05, 1],
                                                transition: {
                                                    duration: 1,
                                                    repeat: Infinity
                                                }
                                            }}
                                            style={{
                                                background:
                                                    'linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(37, 99, 235, 0.4))',
                                                zIndex: -1
                                            }}
                                        />
                                        <motion.img
                                            src={card.image.src}
                                            alt={card.title}
                                            className="relative h-auto w-full rounded-xl object-contain"
                                            loading="lazy"
                                            whileHover={{
                                                filter: 'brightness(1.1)',
                                                transition: {
                                                    duration: 0.2
                                                }
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mb-8">
                    <motion.h2
                        className="mb-3 text-center text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl md:text-3xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {content.process.title}
                    </motion.h2>

                    <div className="mx-auto">
                        <div className="relative grid grid-cols-2 gap-4 sm:gap-8 md:flex md:flex-row md:justify-between">
                            <motion.div
                                className="absolute left-0 hidden w-full md:block"
                                style={{
                                    top: '28px',
                                    height: '2px',
                                    background: '#2563eb',
                                    zIndex: 1
                                }}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />

                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.2 + index * 0.2,
                                        duration: 0.6,
                                        type: 'spring'
                                    }}
                                    className="relative flex flex-1 flex-col items-center text-center"
                                >
                                    <div className="relative">
                                        <a
                                            href={telegramLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <motion.div
                                                whileHover={{
                                                    scale: 1.15
                                                }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 260,
                                                    damping: 20
                                                }}
                                                className="relative mb-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white text-blue-600 shadow-lg transition-all hover:bg-blue-50"
                                                style={{
                                                    border: '2px solid #2563eb',
                                                    zIndex: 2
                                                }}
                                            >
                                                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                                    {step.number}
                                                </span>
                                                <FontAwesomeIcon
                                                    icon={step.icon}
                                                    className="text-xl"
                                                />
                                            </motion.div>
                                        </a>
                                    </div>
                                    <a
                                        href={telegramLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-center"
                                    >
                                        <h3 className="mb-2 hidden font-bold text-blue-600 hover:text-blue-700 sm:block sm:text-2xl">
                                            {step.title}
                                        </h3>
                                        <p className="text-base font-medium text-gray-600 hover:text-gray-700">
                                            {step.description}
                                        </p>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HighLimitedAccounts;
