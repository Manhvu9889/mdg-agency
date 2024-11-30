import useClickOutside from '@/hooks/use-click-outside';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';

const FLAG_CDN_BASE = 'https://flagcdn.com/16x12';

interface Language {
    code: 'EN' | 'RU';
    label: string;
    flagCode: string;
}

const languages: Language[] = [
    {
        code: 'EN',
        label: 'English',
        flagCode: 'us'
    },
    {
        code: 'RU',
        label: 'русский',
        flagCode: 'ru'
    }
];

interface LanguageSelectorProps {
    className?: string;
    currentLang: Language['code'];
    onLanguageChange: (code: Language['code']) => void;
}

const getFlagUrl = (countryCode: string) =>
    `${FLAG_CDN_BASE}/${countryCode.toLowerCase()}.webp`;

const FlagImage: React.FC<{
    language: Language;
    onError: () => void;
}> = ({ language, onError }) => (
    <img
        src={getFlagUrl(language.flagCode)}
        alt={`${language.label} flag`}
        className="h-3 w-4 object-cover"
        width={16}
        height={12}
        loading="lazy"
        onError={onError}
    />
);

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    className = '',
    currentLang,
    onLanguageChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [flagError, setFlagError] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, () => setIsOpen(false));

    const selectedLanguage = languages.find(
        (lang) => lang.code === currentLang
    );
    const nextLanguage = languages.find((lang) => lang.code !== currentLang);

    const handleImageError = () => {
        setFlagError(true);
    };

    return (
        <div
            ref={dropdownRef}
            className={`relative ${className}`}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={() => onLanguageChange(nextLanguage?.code ?? 'EN')}
                className="group flex items-center space-x-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600 md:hidden"
            >
                {selectedLanguage && !flagError && (
                    <FlagImage
                        language={selectedLanguage}
                        onError={handleImageError}
                    />
                )}
                <span>{selectedLanguage?.code}</span>
            </button>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group hidden items-center space-x-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600 md:flex"
            >
                {selectedLanguage && !flagError && (
                    <FlagImage
                        language={selectedLanguage}
                        onError={handleImageError}
                    />
                )}
                <span>{selectedLanguage?.code}</span>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`h-3 w-3 transform text-gray-400 transition-transform duration-200 ease-in-out group-hover:text-blue-600 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 hidden w-48 origin-top-right animate-dropdown rounded-lg border border-gray-100 bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 md:block">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => {
                                onLanguageChange(language.code);
                                setIsOpen(false);
                            }}
                            className={`flex w-full items-center space-x-3 px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                                currentLang === language.code
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700'
                            }`}
                        >
                            {!flagError && (
                                <FlagImage
                                    language={language}
                                    onError={handleImageError}
                                />
                            )}
                            <span>{language.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
