const initCMS = async () => {
  const [{ default: CMS }, { vi }, { default: netlifyIdentity }] = await Promise.all([
    import('decap-cms-app'),
    import('decap-cms-locales'),
    import('netlify-identity-widget')
  ]);

  CMS.registerLocale('vi', vi);
  CMS.init();

  netlifyIdentity.init();

  netlifyIdentity.on('login', () => {
    window.location.href = '/admin/';
  });

  netlifyIdentity.on('logout', () => {
    window.location.href = '/admin';
  });
};

initCMS().catch(() => {
  if (import.meta.env.DEV) {
    throw new Error('Failed to initialize CMS');
  }
});
