const initCMS = async () => {
  const [{ default: CMS }, { vi }] = await Promise.all([
    import('decap-cms-app'),
    import('decap-cms-locales')
  ]);

  CMS.registerLocale('vi', vi);
  CMS.init();
};

initCMS().catch(() => {
  if (import.meta.env.DEV) {
    throw new Error('Failed to initialize CMS');
  }
});
