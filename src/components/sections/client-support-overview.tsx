import CampaignTrainingSupportImage from '@/images/campaign-training-support.webp';
import PhoneImage from '@/images/phone-mdg.webp';
import SupportReplaceAccountsImage from '@/images/support-replace-accounts.webp';
import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

interface ClientSupportOverviewProps {
    content: {
        title: string;
        subtitle: string;
        features: {
            title: string;
            description: string;
            subdescription?: string;
        }[];
    };
}
const ClientSupportOverview: React.FC<ClientSupportOverviewProps> = ({
    content
}) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const formatText = (text?: string) => {
        if (!text) return null;
        const formattedText = text
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

        return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
    };
    const cards = [
        {
            id: 'account-protection',
            title: (
                <span className="mb-3 block text-xl font-bold text-blue-500">
                    {content.features[0].title}
                </span>
            ),
            description: <>{formatText(content.features[0].description)}</>,
            image: SupportReplaceAccountsImage
        },
        {
            id: 'campaign-excellence',
            title: (
                <span className="mb-3 block text-xl font-bold text-blue-500">
                    {content.features[1].title}
                </span>
            ),
            description: <>{formatText(content.features[1].description)}</>,
            image: CampaignTrainingSupportImage
        }
    ];

    const containerVariants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const titleVariants = {
        hidden: {
            opacity: 0,
            y: -30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                duration: 0.8,
                bounce: 0.35
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95,
            y: 30
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring',
                duration: 0.6,
                bounce: 0.3
            }
        },
        hover: {
            scale: 1.02,
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -5 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: 'spring',
                duration: 1,
                bounce: 0.4
            }
        },
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8`}
        >
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate={isInView ? 'animate' : 'initial'}
                className="flex flex-col lg:flex-row lg:items-center lg:gap-12"
            >
                <div className="flex-1">
                    <motion.div className="mb-12" variants={titleVariants}>
                        <h2 className="mb-3 text-4xl font-bold">
                            <span className="text-blue-500">
                                {content.title}
                            </span>
                            <br />
                            <span className="text-gray-900">
                                {content.subtitle}
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid gap-6">
                        {cards.map((card) => (
                            <motion.div
                                key={card.id}
                                variants={cardVariants}
                                whileHover="hover"
                                className="rounded-[2rem] border-2 border-gray-100 bg-white p-8 shadow-lg"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:gap-8">
                                    <div className="mb-6 flex-1 md:mb-0">
                                        {card.title}
                                        <p className="text-lg text-gray-800">
                                            {card.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-center md:w-1/3">
                                        <motion.img
                                            variants={imageVariants}
                                            whileHover="hover"
                                            src={card.image.src}
                                            alt="Support illustration"
                                            className="pointer-events-auto h-auto w-full max-w-[180px] object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div variants={cardVariants} className="mt-8">
                        <p className="text-2xl font-medium md:text-3xl lg:text-4xl">
                            <span className="text-gray-800">
                                <span className="font-semibold">
                                    {content.features[2].title}:{' '}
                                    {formatText(
                                        content.features[2].description
                                    )}
                                </span>{' '}
                                {formatText(content.features[2].subdescription)}
                            </span>
                        </p>
                        <p className="mt-4 text-lg text-gray-800">
                            <span className="font-semibold">
                                {content.features[3].title}:
                            </span>{' '}
                            {formatText(content.features[3].description)}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-12 flex justify-center lg:mt-0 lg:w-1/3"
                    variants={imageVariants}
                >
                    <motion.img
                        whileHover="hover"
                        variants={imageVariants}
                        src={PhoneImage.src}
                        alt="Support Phone"
                        className="pointer-events-auto h-auto w-full max-w-[400px] object-contain"
                        loading="lazy"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ClientSupportOverview;
