import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  // 初回ロードでブックマーク取得
  useEffect(() => {
    chrome.storage.local.get("bookmarks").then((res) => {
      setBookmarks(res.bookmarks || []);
    });
  }, []);

  // 削除処理
  const deleteBookmark = async (id) => {
    setDeletingId(id); // アニメーション開始

    setTimeout(async () => {
      const result = await chrome.storage.local.get("bookmarks");
      const updated = (result.bookmarks || []).filter((b) => b.id !== id);

      await chrome.storage.local.set({ bookmarks: updated });
      setBookmarks(updated);
      setDeletingId(null);
    }, 250); // アニメーション時間と合わせる
  };

  return (
    <div className="p-4 space-y-3 w-80">
      <h1 className="text-xl font-bold text-cyan-300 mb-2 text-center">
        Bubble Bookmarks
      </h1>

      {bookmarks.map((b) => (
        <div
          key={b.id}
          className={`relative p-3 rounded-xl bg-gray-800/60 backdrop-blur-md border border-cyan-500/30 hover:bg-gray-700/60 transition shadow-lg ${
            deletingId === b.id ? "bubble-pop" : ""
          }`}
        >
          {/* 削除ボタン */}
          <button
            onClick={() => deleteBookmark(b.id)}
            className="absolute top-1 right-1 text-cyan-300 hover:text-red-300 transition text-sm"
            title="Delete"
          >
            ✕
          </button>

          <a href={b.url} target="_blank" className="block">
            <div className="text-2xl mb-1">{b.emoji}</div>
            <div className="font-semibold text-white">{b.title}</div>
            <div className="text-sm text-gray-400">{b.url}</div>
          </a>
        </div>
      ))}

      {bookmarks.length === 0 && (
        <p className="text-gray-400 text-center">まだバブルがありません。</p>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
