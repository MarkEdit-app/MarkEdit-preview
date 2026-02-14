type LocalizableKeys = {
  viewMode: string;
  changeMode: string;
  editMode: string;
  sideBySideMode: string;
  previewMode: string;
  saveCleanHtml: string;
  saveStyledHtml: string;
  copyHtml: string;
  copyRichText: string;
  copyCode: string;
  untitled: string;
  increaseZoom: string;
  decreaseZoom: string;
  resetZoom: string;
  version: string;
  checkReleases: string;
  newVersionAvailable: string;
  viewReleasePage: string;
  remindMeLater: string;
  skipThisVersion: string;
};

const strings: Record<Locale, Localizable> = {
  'default': {
    viewMode: 'View Mode',
    changeMode: 'Change Mode',
    editMode: 'Edit Mode',
    sideBySideMode: 'Side-by-Side Mode',
    previewMode: 'Preview Mode',
    saveCleanHtml: 'Save Clean HTML',
    saveStyledHtml: 'Save Styled HTML',
    copyHtml: 'Copy HTML',
    copyRichText: 'Copy Rich Text',
    copyCode: 'Copy Code',
    untitled: 'Untitled',
    increaseZoom: 'Increase Zoom',
    decreaseZoom: 'Decrease Zoom',
    resetZoom: 'Reset Zoom',
    version: 'Version',
    checkReleases: 'Check Releases',
    newVersionAvailable: 'is available!',
    viewReleasePage: 'View Release Page',
    remindMeLater: 'Remind Me Later',
    skipThisVersion: 'Skip This Version',
  },
  'zh-CN': {
    viewMode: '视图模式',
    changeMode: '切换模式',
    editMode: '编辑模式',
    sideBySideMode: '并排模式',
    previewMode: '预览模式',
    saveCleanHtml: '保存无样式 HTML',
    saveStyledHtml: '保存带样式 HTML',
    copyHtml: '复制 HTML',
    copyRichText: '复制富文本',
    copyCode: '复制代码',
    untitled: '未命名',
    increaseZoom: '放大页面',
    decreaseZoom: '缩小页面',
    resetZoom: '重置缩放',
    version: '版本',
    checkReleases: '查看版本',
    newVersionAvailable: '已发布！',
    viewReleasePage: '查看发布页面',
    remindMeLater: '稍后提醒我',
    skipThisVersion: '跳过这个版本',
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
    previewMode: '預覽模式',
    untitled: '未命名',
    increaseZoom: '放大頁面',
    decreaseZoom: '縮小頁面',
    resetZoom: '重置縮放',
    version: '版本',
    checkReleases: '檢視版本',
    newVersionAvailable: '已釋出！',
    viewReleasePage: '檢視釋出頁面',
    remindMeLater: '稍後提醒我',
    skipThisVersion: '跳過這個版本',
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
