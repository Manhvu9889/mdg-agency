interface NetlifyUser {
    id: string;
    email: string;
    user_metadata: {
        full_name?: string;
        avatar_url?: string;
    };
    app_metadata: {
        provider?: string;
        roles?: string[];
    };
    created_at: string;
    confirmed_at: string;
    updated_at: string;
}

interface NetlifyIdentity {
    on: (
        event: 'init' | 'login' | 'logout',
        callback: (user?: NetlifyUser) => void
    ) => void;
    open: (tab?: 'login' | 'signup') => void;
    close: () => void;
}

declare global {
    interface Window {
        netlifyIdentity: NetlifyIdentity;
    }
}

export {};
