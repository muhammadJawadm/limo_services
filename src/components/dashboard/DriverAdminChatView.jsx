import { useEffect, useRef, useState } from 'react';
import { FiPaperclip, FiSend, FiSmile } from 'react-icons/fi';
import driverAvatar from '../../assets/driver1.png';
import driverAvatarFallback from '../../assets/driver1.png';
import useDriverAdminChat from '../../hooks/useDriverAdminChat';

const COMMON_EMOJIS = ['😊','😂','👍','❤️','🙏','😢','😎','🔥','✅','👌','😍','🤔','😅','🎉','💯','👏','🙌','😁','😆','🥳'];

function formatMsgTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export default function DriverAdminChatView() {
  const { messages, isLoading, isSending, error, isConnected, sendMessage } = useDriverAdminChat();
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const endRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!showEmojiPicker) return;
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  const handleSend = async () => {
    const didSend = await sendMessage(messageText);
    if (didSend) {
      setMessageText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (messageText.trim() && !isSending) handleSend();
    }
  };

  const insertEmoji = (emoji) => {
    setMessageText((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <section className="flex-1 px-4 pb-5 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
      <div className="mx-auto flex h-[calc(100vh-170px)] min-h-[560px] w-full max-w-[1100px] flex-col rounded-[22px] border border-[#ececec] bg-[#f8f8f8]">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-2xl bg-gray-200">
              <img
                src={driverAvatar}
                onError={(event) => {
                  event.target.src = driverAvatarFallback;
                }}
                alt="Florencio Dorrance"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#111111]">Admin Support</h3>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#4d4d4d]">
                <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-[#2b9f52]' : 'bg-gray-300'}`} />
                {isConnected ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-6 sm:px-7">
          {isLoading && (
            <div className="text-sm text-gray-500">Loading messages...</div>
          )}

          {!isLoading && error && (
            <div className="text-sm text-red-500">{error}</div>
          )}

          {!isLoading && !error && messages.length === 0 && (
            <div className="text-sm text-gray-500">Start the conversation with admin support.</div>
          )}

          {!isLoading && !error && messages.map((message) => {
            const isOwn = Boolean(message?.isOwn);

            return (
              <div
                key={message.id || `${message.senderId}-${message.createdAt}`}
                className={`flex items-end gap-3 ${isOwn ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <div className={`h-9 w-9 shrink-0 overflow-hidden rounded-full shadow-sm ${isOwn ? 'border border-gray-200 bg-gray-100' : 'bg-gray-200'}`}>
                  {isOwn ? (
                    <svg className="h-full w-full p-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  ) : (
                    <img
                      src={driverAvatar}
                      onError={(event) => {
                        event.target.src = driverAvatarFallback;
                      }}
                      alt="avatar"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className={`flex max-w-[82%] flex-col gap-1 ${isOwn ? 'items-end' : ''}`}>
                  <div className={`rounded-2xl px-4 py-2.5 text-sm ${isOwn ? 'rounded-br-sm bg-[#6159e6] text-white' : 'rounded-bl-sm bg-[#ececec] text-[#1a1a1a]'}`}>
                    {message.text}
                  </div>
                  {message.createdAt && (
                    <span className="text-[10px] text-gray-400 px-1">
                      {formatMsgTime(message.createdAt)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        <div className="border-t border-gray-200 bg-[#f8f8f8] px-4 py-4 sm:px-6 sm:py-5">
          <div className="relative flex min-h-[98px] w-full overflow-visible rounded-[18px] border border-gray-200 bg-white shadow-sm focus-within:border-[#1b2d5d] focus-within:ring-1 focus-within:ring-[#1b2d5d]">
            
            <textarea
              placeholder="Send a message..."
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              onKeyDown={handleKeyDown}
              className="h-[98px] flex-1 resize-none px-3 py-3 text-sm text-[#111111] outline-none placeholder:text-gray-400 sm:px-4 sm:py-4"
            />
            <div className="flex items-end gap-2 pb-3 pr-3 text-gray-500 sm:gap-3 sm:pb-4 sm:pr-4">
              <div className="relative mb-1" ref={emojiPickerRef}>
                <FiSmile
                  className="h-5 w-5 cursor-pointer transition hover:text-gray-800"
                  onClick={() => setShowEmojiPicker((v) => !v)}
                />
                {showEmojiPicker && (
                  <div className="absolute bottom-8 right-0 z-20 flex flex-wrap gap-1 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg w-[220px]">
                    {COMMON_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => insertEmoji(emoji)}
                        className="text-xl leading-none p-1 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleSend}
                disabled={!messageText.trim() || isSending}
                className="flex h-10 items-center gap-2 rounded-full bg-[#1b2d5d] px-5 text-sm font-medium text-white transition-colors hover:bg-[#132042] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? 'Sending...' : 'Send'}
                <FiSend className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
