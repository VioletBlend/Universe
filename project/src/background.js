// Initialize context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'addBookmark',
    title: 'Add to Bubble Bookmarks',
    contexts: ['page', 'link']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'addBookmark' && tab?.title) {
    const url = info.linkUrl || info.pageUrl || '';
    const title = info.linkUrl ? info.selectionText || url : tab.title;
    
    const result = await chrome.storage.local.get('bookmarks');
    const bookmarks = result.bookmarks || [];
    
    const newBookmark = {
      id: crypto.randomUUID(),
      title,
      url,
      emoji: '🌐',
      createdAt: Date.now()
    };
    
    await chrome.storage.local.set({
      bookmarks: [newBookmark, ...bookmarks]
    });
  }
});