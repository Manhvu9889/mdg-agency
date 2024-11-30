import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQSection {
    title: string;
    description: string;
    questions: FAQ[];
}

const FAQs: React.FC<{ className: string; faqData: FAQSection }> = ({
    className,
    faqData
}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const midPoint = Math.ceil(faqData.questions.length / 2);
    const leftColumnFAQs = faqData.questions.slice(0, midPoint);
    const rightColumnFAQs = faqData.questions.slice(midPoint);

    const renderFAQColumn = (faqs: FAQ[], startIndex: number) => (
        <div className="space-y-6">
            {faqs.map((faq, index) => {
                const actualIndex = startIndex + index;
                return (
                    <div
                        key={`faq-${actualIndex}`}
                        className="group relative overflow-hidden rounded-xl border border-blue-900/50 bg-gray-900/30 backdrop-blur-sm transition-all duration-300 hover:border-blue-700/50 hover:bg-gray-900/50"
                    >
                        <button
                            className="flex w-full items-center justify-between px-8 py-6 text-left transition-colors duration-300"
                            onClick={() => toggleFAQ(actualIndex)}
                            aria-expanded={activeIndex === actualIndex}
                        >
                            <span
                                className="pr-4 font-medium text-gray-100 transition-colors duration-300 group-hover:text-blue-100"
                                dangerouslySetInnerHTML={{
                                    __html: faq.question
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`h-4 w-4 flex-shrink-0 transform text-blue-400 transition-all duration-300 group-hover:text-blue-300 ${
                                    activeIndex === actualIndex
                                        ? 'rotate-180'
                                        : ''
                                }`}
                            />
                        </button>

                        <div
                            className={`transition-all duration-300 ease-in-out ${
                                activeIndex === actualIndex
                                    ? 'max-h-[1000px] opacity-100'
                                    : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="px-8 pb-6">
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-800/50 to-transparent" />
                                <p
                                    className="mt-4 whitespace-pre-line text-gray-300"
                                    dangerouslySetInnerHTML={{
                                        __html: faq.answer
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <section className={className}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
                        FAQs
                    </h2>
                    <p className="mt-4 text-gray-400">
                        Everything you need to know about our services. Can't
                        find the answer you're looking for? Feel free to contact
                        us.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-2">
                    {renderFAQColumn(leftColumnFAQs, 0)}
                    {renderFAQColumn(rightColumnFAQs, midPoint)}
                </div>
            </div>
        </section>
    );
};

export default FAQs;
