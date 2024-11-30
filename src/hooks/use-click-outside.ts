import type { RefObject } from 'react';
import { useEffect } from 'react';

const useClickOutside = (
    ref: RefObject<HTMLElement>,
    handler: (event: MouseEvent | TouchEvent) => void
) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node;
            if (!ref.current || !target || ref.current.contains(target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener, true);
        document.addEventListener('touchstart', listener, true);

        return () => {
            document.removeEventListener('mousedown', listener, true);
            document.removeEventListener('touchstart', listener, true);
        };
    }, [ref, handler]);
};

export default useClickOutside;
