import {
    faFacebook,
    faInstagram,
    faTiktok,
    faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
    faEdit,
    faEllipsisH,
    faSearch,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { CollectionEntry } from 'astro:content';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

type BlogPost = CollectionEntry<'bai-viet'>;

interface NewsItemsProps {
    posts: BlogPost[];
}

const ITEMS_PER_PAGE = 6;

const SKELETON_ITEMS = Array.from(
    { length: ITEMS_PER_PAGE },
    (_, i) => `skeleton-${i}`
);

const categories = [
    {
        id: 'facebook',
        label: 'Facebook',
        icon: faFacebook,
        color: 'text-[#1877F2]'
    },
    {
        id: 'tiktok',
        label: 'TikTok',
        icon: faTiktok,
        color: 'text-[#000000]'
    },
    {
        id: 'youtube',
        label: 'YouTube',
        icon: faYoutube,
        color: 'text-[#FF0000]'
    },
    {
        id: 'instagram',
        label: 'Instagram',
        icon: faInstagram,
        color: 'text-[#E4405F]'
    },
    {
        id: 'content-writer',
        label: 'Content Writer',
        icon: faEdit,
        color: 'text-[#4B5563]'
    },
    {
        id: 'other',
        label: 'Other',
        icon: faEllipsisH,
        color: 'text-[#6B7280]'
    }
] as const;

const NewsItems: React.FC<NewsItemsProps> = ({ posts }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setIsLoading(true);
            try {
                setDebouncedSearchQuery(query);
                setCurrentPage(1);
            } finally {
                setIsLoading(false);
            }
        }, 300),
        []
    );

    useEffect(() => {
        debouncedSearch(searchQuery);
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchQuery, debouncedSearch]);

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                post.data.title
                    .toLowerCase()
                    .includes(debouncedSearchQuery.toLowerCase()) ||
                post.data.description
                    .toLowerCase()
                    .includes(debouncedSearchQuery.toLowerCase());
            const matchesCategory =
                !selectedCategory || post.data.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [posts, debouncedSearchQuery, selectedCategory]);

    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const currentPosts = filteredPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div>
            <div className="mb-12 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg md:p-8">
                <div className="relative mb-8">
                    <input
                        type="search"
                        placeholder="Search articles..."
                        className="w-full cursor-text rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2 pl-12 text-lg transition-all duration-200 placeholder:text-gray-400 hover:bg-gray-100 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search articles"
                    />
                    <FontAwesomeIcon
                        icon={isLoading ? faSpinner : faSearch}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transform text-xl ${isLoading ? 'animate-spin text-blue-500' : 'text-gray-400'}`}
                        aria-hidden="true"
                    />
                </div>

                <div className="space-y-3">
                    <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-600">
                        Filter by Platform
                    </h2>
                    <div
                        className="flex flex-wrap gap-3"
                        aria-label="Filter by category"
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() =>
                                    setSelectedCategory(
                                        selectedCategory === category.id
                                            ? null
                                            : category.id
                                    )
                                }
                                className={`flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ${
                                    selectedCategory === category.id
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/50'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow'
                                }`}
                                aria-pressed={selectedCategory === category.id}
                            >
                                <FontAwesomeIcon
                                    icon={category.icon}
                                    className={`text-lg ${
                                        selectedCategory === category.id
                                            ? 'text-white'
                                            : category.color
                                    }`}
                                    aria-hidden="true"
                                />
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    SKELETON_ITEMS.map((id) => (
                        <div
                            key={id}
                            className="overflow-hidden rounded-2xl bg-white p-4 shadow-lg"
                        >
                            <div className="relative mb-4 h-48 w-full animate-pulse overflow-hidden rounded-xl bg-gray-200">
                                <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 w-1/4 animate-pulse rounded-full bg-gray-200" />
                                <div className="h-6 w-3/4 animate-pulse rounded-full bg-gray-200" />
                                <div className="h-4 w-full animate-pulse rounded-full bg-gray-200" />
                            </div>
                        </div>
                    ))
                ) : currentPosts.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="mb-6 text-5xl text-gray-300"
                        />
                        <h3 className="mb-3 text-2xl font-bold text-gray-700">
                            No Articles Found
                        </h3>
                        <p className="max-w-md text-gray-500">
                            Try adjusting your search terms or filters to find
                            what you're looking for
                        </p>
                    </div>
                ) : (
                    currentPosts.map((post) => (
                        <article
                            key={post.id}
                            className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl active:scale-95"
                            onClick={() =>
                                (window.location.href = `/news/${post.slug}`)
                            }
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    loading="lazy"
                                    src={post.data.thumbnail.src}
                                    alt={post.data.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                            <div className="p-6">
                                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium uppercase tracking-wide text-gray-700">
                                    <FontAwesomeIcon
                                        icon={
                                            categories.find(
                                                (c) =>
                                                    c.id === post.data.category
                                            )?.icon ?? faEllipsisH
                                        }
                                        className={
                                            categories.find(
                                                (c) =>
                                                    c.id === post.data.category
                                            )?.color ?? 'text-gray-500'
                                        }
                                    />
                                    {post.data.category}
                                </span>
                                <h3 className="mb-3 mt-4 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-500">
                                    {post.data.title}
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    {post.data.description}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="text-gray-400"
                                        />
                                        {post.data.readTime}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <nav
                    className="mt-16 flex justify-center space-x-3"
                    aria-label="Pagination"
                >
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="cursor-pointer rounded-xl bg-white px-6 py-3 font-medium text-gray-700 shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Previous page"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={`page-${i + 1}`}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`cursor-pointer rounded-xl px-6 py-3 font-medium shadow-md transition-all duration-200 hover:shadow-lg active:scale-95 ${
                                currentPage === i + 1
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="cursor-pointer rounded-xl bg-white px-6 py-3 font-medium text-gray-700 shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Next page"
                    >
                        Next
                    </button>
                </nav>
            )}
        </div>
    );
};

export default NewsItems;
