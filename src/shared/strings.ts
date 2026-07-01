type LocalizableKeys = {
  viewMode: string;
  changeMode: string;
  editMode: string;
  sideBySideMode: string;
  sideBySideReverseMode: string;
  previewMode: string;
  saveCleanHtml: string;
  saveStyledHtml: string;
  copyHtml: string;
  copyRichText: string;
  copyCode: string;
  untitled: string;
  update: string;
  version: string;
  checkReleases: string;
  updateAndRelaunch: string;
  newVersionAvailable: string;
  viewReleasePage: string;
  remindMeLater: string;
  skipThisVersion: string;
  failedToUpdate: string;
  source: string;
  preview: string;
};

const strings: Record<Locale, Localizable> = {
  'default': {
    viewMode: 'View Mode',
    changeMode: 'Change Mode',
    editMode: 'Edit Mode',
    sideBySideMode: 'Side-by-Side Mode',
    sideBySideReverseMode: 'Reverse Side-by-Side Mode',
    previewMode: 'Preview Mode',
    saveCleanHtml: 'Save Clean HTML',
    saveStyledHtml: 'Save Styled HTML',
    copyHtml: 'Copy HTML',
    copyRichText: 'Copy Rich Text',
    copyCode: 'Copy Code',
    untitled: 'Untitled',
    update: 'Update',
    version: 'Version',
    checkReleases: 'Check Releases',
    updateAndRelaunch: 'Update and Relaunch',
    newVersionAvailable: 'is available!',
    viewReleasePage: 'View Release Page',
    remindMeLater: 'Remind Me Later',
    skipThisVersion: 'Skip This Version',
    failedToUpdate: 'Failed to update. Please try again later.',
    source: 'Source',
    preview: 'Preview',
  },
  'zh-CN': {
    viewMode: '视图模式',
    changeMode: '切换模式',
    editMode: '编辑模式',
    sideBySideMode: '并排模式',
    sideBySideReverseMode: '反向并排模式',
    previewMode: '预览模式',
    saveCleanHtml: '保存无样式 HTML',
    saveStyledHtml: '保存带样式 HTML',
    copyHtml: '复制 HTML',
    copyRichText: '复制富文本',
    copyCode: '复制代码',
    untitled: '未命名',
    update: '更新',
    version: '版本',
    checkReleases: '查看版本',
    updateAndRelaunch: '更新并重新启动',
    newVersionAvailable: '已发布！',
    viewReleasePage: '查看发布页面',
    remindMeLater: '稍后提醒我',
    skipThisVersion: '跳过这个版本',
    failedToUpdate: '更新失败，请稍后再试。',
    source: '源码',
    preview: '预览',
  },
  'zh-TW': {
    viewMode: '視圖模式',
    changeMode: '切換模式',
    saveCleanHtml: '儲存無樣式 HTML',
    saveStyledHtml: '儲存帶樣式 HTML',
    copyHtml: '拷貝 HTML',
    copyRichText: '複製富文字',
    copyCode: '拷貝程式碼',
    editMode: '編輯模式',
    sideBySideMode: '並排模式',
    sideBySideReverseMode: '反向並排模式',
    previewMode: '預覽模式',
    untitled: '未命名',
    update: '更新',
    version: '版本',
    checkReleases: '檢視版本',
    updateAndRelaunch: '更新並重新啟動',
    newVersionAvailable: '已釋出！',
    viewReleasePage: '檢視釋出頁面',
    remindMeLater: '稍後提醒我',
    skipThisVersion: '跳過這個版本',
    failedToUpdate: '更新失敗，請稍後再試。',
    source: '原始碼',
    preview: '預覽',
  },
};

export function localized(key: keyof LocalizableKeys): string {
  return stringTable[key];
}

const locales = ['default', 'zh-CN', 'zh-TW'] as const;
type Locale = typeof locales[number];
type Localizable = Record<keyof LocalizableKeys, string>;

const stringTable = strings[(() => {
  const language = navigator.language as Locale;
  return locales.includes(language) ? language : 'default';
})()];
