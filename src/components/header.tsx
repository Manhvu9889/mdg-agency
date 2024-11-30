import LanguageSelector from '@/components/language-selector';
import useClickOutside from '@/hooks/use-click-outside';
import en from '@/i18n/locales/en.json';
import ru from '@/i18n/locales/ru.json';
import Logo from '@/images/icon/icon.webp';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC, ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';

interface NavItem {
    label: string;
    href: string;
}

const navigationItems: NavItem[] = [
    { label: en.navigation.items[0], href: '/#home' },
    { label: en.navigation.items[1], href: '/#service' },
    { label: en.navigation.items[2], href: '/#about' },
    { label: en.navigation.items[3], href: '/#contact' },
    { label: en.navigation.items[4], href: '/#news' },
    { label: en.navigation.items[5], href: '/#faq' }
] as const;

const ruNavigationItems: NavItem[] = [
    { label: ru.navigation.items[0], href: '/ru#home' },
    { label: ru.navigation.items[1], href: '/ru#service' },
    { label: ru.navigation.items[2], href: '/ru#about' },
    { label: ru.navigation.items[3], href: '/ru#contact' },
    { label: ru.navigation.items[4], href: '/ru#news' },
    { label: ru.navigation.items[5], href: '/ru#faq' }
] as const;

const telegramLink = 'https://t.me/mike_mdgagency';
const Header: FC = (): ReactElement => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [currentLang, setCurrentLang] = useState<'EN' | 'RU'>('EN');
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const path = window.location.pathname;
        if (path.startsWith('/ru')) {
            setCurrentLang('RU');
        } else {
            setCurrentLang('EN');
        }
    }, []);

    const handleLanguageChange = (newLang: 'EN' | 'RU') => {
        const currentPath = window.location.pathname;
        const hash = window.location.hash;

        if (newLang === 'EN') {
            const newPath = currentPath.replace(/^\/ru/, '') || '/';
            window.location.href = `${newPath}${hash}`;
        } else {
            const newPath = !currentPath.startsWith('/ru')
                ? `/ru${currentPath === '/' ? '' : currentPath}`
                : currentPath;
            window.location.href = `${newPath}${hash}`;
        }
    };

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';

        if (window.location.pathname.startsWith('/news')) {
            setActiveSection('news');
            return;
        }

        const handleScroll = () => {
            const sections = navigationItems.map(
                (item) => item.href.split('#')[1]
            );

            let closestSection = sections[0];
            let minDistance = Infinity;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const distance = Math.abs(rect.top);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestSection = section;
                    }
                }
            }

            setActiveSection(closestSection);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        const target = event.target as Node;
        const menuButton = document.querySelector(
            '[aria-label="Toggle navigation menu"]'
        );

        if (menuButton && !menuButton.contains(target)) {
            setIsMenuOpen(false);
        }
    };

    useClickOutside(mobileMenuRef, handleClickOutside);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <header className="sticky left-0 right-0 top-0 z-50 flex items-center justify-center bg-white shadow-lg backdrop-blur-sm">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex-shrink-0 transition-transform hover:scale-105">
                        <a
                            href="/"
                            className="flex items-center space-x-3"
                            aria-label="Go to homepage"
                        >
                            <img
                                src={Logo.src}
                                alt="Company Logo"
                                className="h-12 w-12"
                                width={48}
                                height={48}
                            />
                        </a>
                    </div>

                    <nav className="hidden flex-1 md:block">
                        <ul className="flex items-center justify-center space-x-1">
                            {(currentLang === 'EN'
                                ? navigationItems
                                : ruNavigationItems
                            ).map((item: NavItem) => (
                                <li key={item.href}>
                                    <a
                                        href={
                                            item.href.includes('#news')
                                                ? '/news'
                                                : item.href.includes('#home')
                                                  ? currentLang === 'EN'
                                                      ? '/'
                                                      : '/ru'
                                                  : item.href
                                        }
                                        className={`group relative px-4 py-2 text-sm font-medium transition-colors ${
                                            activeSection ===
                                            item.href.split('#')[1]
                                                ? 'text-blue-700'
                                                : 'text-gray-900 hover:text-blue-700'
                                        }`}
                                    >
                                        {item.label}
                                        <span
                                            className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-700 transition-transform ${
                                                activeSection ===
                                                item.href.split('#')[1]
                                                    ? 'scale-x-100'
                                                    : 'scale-x-0 group-hover:scale-x-100'
                                            }`}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="hidden items-center space-x-4 md:flex">
                        <LanguageSelector
                            currentLang={currentLang}
                            onLanguageChange={handleLanguageChange}
                        />
                        <a
                            href={telegramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:translate-y-[-1px] hover:shadow-lg active:translate-y-0"
                        >
                            {currentLang === 'EN'
                                ? en.navigation.contact_label
                                : ru.navigation.contact_label}
                        </a>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-lg border border-gray-300 p-2 text-gray-900 transition-colors hover:bg-gray-100 md:hidden"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation menu"
                    >
                        <FontAwesomeIcon
                            icon={isMenuOpen ? faTimes : faBars}
                            className="h-6 w-6"
                        />
                    </button>
                </div>

                {isMenuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="fixed inset-x-0 top-20 h-[calc(100vh-5rem)] bg-white md:hidden"
                    >
                        <nav className="h-full overflow-y-auto">
                            <ul className="space-y-2 p-4">
                                {(currentLang === 'EN'
                                    ? navigationItems
                                    : ruNavigationItems
                                ).map((item: NavItem) => (
                                    <li key={item.href}>
                                        <a
                                            href={
                                                item.href.includes('#news')
                                                    ? '/news'
                                                    : item.href.includes(
                                                            '#home'
                                                        )
                                                      ? currentLang === 'EN'
                                                          ? '/'
                                                          : '/ru'
                                                      : item.href
                                            }
                                            className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                                                activeSection ===
                                                item.href.split('#')[1]
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-gray-900 hover:bg-blue-50 hover:text-blue-700'
                                            }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                                <li className="pt-4">
                                    <a
                                        href={telegramLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-center text-base font-semibold text-white hover:shadow-lg"
                                    >
                                        {currentLang === 'EN'
                                            ? en.navigation.contact_label
                                            : ru.navigation.contact_label}
                                    </a>
                                </li>
                                <li className="pt-4">
                                    <LanguageSelector
                                        className="w-full"
                                        currentLang={currentLang}
                                        onLanguageChange={handleLanguageChange}
                                    />
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
