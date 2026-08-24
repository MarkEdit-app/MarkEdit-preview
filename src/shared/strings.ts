type LocalizableKeys = {
  viewMode: string;
  changeMode: string;
  editMode: string;
  sideBySideMode: string;
  previewMode: string;
  syntaxHiddenMode: string;
  saveCleanHtml: string;
  saveStyledHtml: string;
  copyHtml: string;
  copyRichText: string;
  copyCode: string;
  failedToCopy: string;
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
    editMode: 'Markdown Source',
    sideBySideMode: 'Preview (Side-by-Side)',
    previewMode: 'Preview (Overlay)',
    syntaxHiddenMode: 'Mixed (Syntax Hidden)',
    saveCleanHtml: 'Save Clean HTML',
    saveStyledHtml: 'Save Styled HTML',
    copyHtml: 'Copy HTML',
    copyRichText: 'Copy Rich Text',
    copyCode: 'Copy Code',
    failedToCopy: 'Failed to copy. Please try again.',
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
    editMode: 'Markdown 源码',
    sideBySideMode: '预览（并排）',
    previewMode: '预览（覆盖）',
    syntaxHiddenMode: '混合（隐藏语法）',
    saveCleanHtml: '保存无样式 HTML',
    saveStyledHtml: '保存带样式 HTML',
    copyHtml: '复制 HTML',
    copyRichText: '复制富文本',
    copyCode: '复制代码',
    failedToCopy: '复制失败，请重试。',
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
    failedToCopy: '複製失敗，請再試一次。',
    editMode: 'Markdown 原始碼',
    sideBySideMode: '預覽（並排）',
    previewMode: '預覽（覆蓋）',
    syntaxHiddenMode: '混合（隱藏語法）',
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
