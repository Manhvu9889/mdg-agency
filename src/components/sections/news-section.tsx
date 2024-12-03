import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { CollectionEntry } from 'astro:content';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface NewsSectionProps {
    className: string;
    posts: CollectionEntry<'bai-viet'>[];
}

const NewsSection = ({ className, posts }: NewsSectionProps) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0);

    const getItemsPerPage = useCallback(() => {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }, []);

    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPage());
            setCurrentPage(0);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getItemsPerPage]);

    const maxPages = Math.ceil(posts.length / itemsPerPage) - 1;

    const handlePrevClick = () => {
        setDirection(-1);
        setCurrentPage((prev) => Math.max(0, prev - 1));
    };

    const handleNextClick = () => {
        setDirection(1);
        setCurrentPage((prev) => Math.min(maxPages, prev + 1));
    };

    const visiblePosts = useMemo(() => {
        const startIndex = currentPage * itemsPerPage;
        return posts.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, itemsPerPage, posts]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction > 0 ? '-100%' : '100%',
            opacity: 0,
            scale: 0.95
        })
    };

    if (posts.length === 0) return null;

    return (
        <section className={className}>
            <div className="mb-8 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white">
                    What's new this week?
                </h2>
                <p className="text-blue-100">News articles, expertise</p>
            </div>

            <div className="relative">
                <div className="relative mx-8 sm:mx-12">
                    <div className="w-full overflow-hidden">
                        <AnimatePresence
                            initial={false}
                            custom={direction}
                            mode="wait"
                        >
                            <motion.div
                                key={currentPage}
                                className="flex gap-4 sm:gap-6"
                                style={{ width: '100%' }}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: {
                                        type: 'spring',
                                        stiffness: 200,
                                        damping: 25
                                    },
                                    opacity: { duration: 0.3 },
                                    scale: { duration: 0.3 },
                                    layout: { duration: 0.3 }
                                }}
                            >
                                {visiblePosts.map((post) => (
                                    <article
                                        key={post.slug}
                                        className="flex h-[32rem] w-full flex-shrink-0 flex-col overflow-hidden rounded-xl bg-white/95 shadow-lg backdrop-blur-sm sm:h-auto md:h-[38rem] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                                        style={{ flex: '0 0 auto' }}
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={post.data.thumbnail.src}
                                                alt={post.data.title}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                                width={400}
                                                height={400}
                                            />
                                            <span className="absolute right-4 top-4 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                                {post.data.category}
                                            </span>
                                        </div>

                                        <div className="flex h-[calc(32rem-14rem)] flex-col p-6 sm:h-auto">
                                            <time className="mb-2 block text-sm text-gray-600">
                                                {post.data.readTime}
                                            </time>
                                            <h3 className="mb-3 line-clamp-2 min-h-[3.5rem] text-xl font-semibold text-gray-900">
                                                {post.data.title}
                                            </h3>
                                            <p className="mb-4 line-clamp-4 min-h-[5rem] text-gray-700">
                                                {post.data.description}
                                            </p>
                                            <div className="mt-auto">
                                                <a
                                                    href={`/news/${post.slug}`}
                                                    className="inline-flex items-center font-medium text-blue-800 transition-colors hover:text-blue-900"
                                                    title={`Read more about ${post.data.title}`}
                                                    aria-label={`Read full article about ${post.data.title}`}
                                                    rel="article"
                                                >
                                                    Read more
                                                    <FontAwesomeIcon
                                                        icon={faArrowRight}
                                                        className="ml-2 h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <button
                    onClick={handlePrevClick}
                    disabled={currentPage === 0}
                    className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 p-2 text-white transition-all hover:bg-blue-700 disabled:opacity-50 sm:-left-4 sm:p-3"
                    aria-label="Previous posts"
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="h-4 w-4 sm:h-5 sm:w-5"
                    />
                </button>
                <button
                    onClick={handleNextClick}
                    disabled={currentPage >= maxPages}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 p-2 text-white transition-all hover:bg-blue-700 disabled:opacity-50 sm:-right-4 sm:p-3"
                    aria-label="Next posts"
                >
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="h-4 w-4 sm:h-5 sm:w-5"
                    />
                </button>
            </div>

            <div className="mt-12 text-center">
                <a
                    href="/news"
                    className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-white transition-colors hover:bg-white/20"
                    title="View all news articles"
                    aria-label="View all news articles"
                    rel="archives"
                >
                    Show more news
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="h-4 w-4"
                        aria-hidden="true"
                    />
                </a>
            </div>
        </section>
    );
};

export default NewsSection;
