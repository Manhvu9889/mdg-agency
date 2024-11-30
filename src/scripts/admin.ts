import CMS from 'decap-cms-app';
import { vi } from 'decap-cms-locales';
import netlifyIdentity from 'netlify-identity-widget';
CMS.registerLocale('vi', vi);

CMS.init();
netlifyIdentity.init();
netlifyIdentity.on('login', () => {
    window.location.href = '/admin/';
});

netlifyIdentity.on('logout', () => {
    window.location.href = '/admin';
});
