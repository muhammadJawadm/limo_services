import { useEffect, useMemo, useRef, useState } from 'react';
import { FiPaperclip, FiSmile, FiSend } from 'react-icons/fi';
import driverAvatar from '../../assets/driver1.png';
import driverAvatarFallback from '../../assets/driver1.png';
import useRideChat from '../../hooks/useRideChat';

export default function MessagesModal({ isOpen, onClose, rideId, bookingDetails }) {
  const { role, userId, messages, isLoading, error, isConnected, sendMessage } = useRideChat(rideId);
  const [messageText, setMessageText] = useState('');
  const endRef = useRef(null);

  const headerName = useMemo(() => {
    const driver = bookingDetails?.driver || bookingDetails?.driverDetails || bookingDetails?.chauffeur || {};
    const passenger = bookingDetails?.passenger || bookingDetails?.passengerDetails || bookingDetails?.bookerDetails || {};

    if (role === 'driver') {
      return [passenger.firstName, passenger.lastName].filter(Boolean).join(' ') || 'Passenger';
    }

    return [driver.firstName, driver.lastName].filter(Boolean).join(' ') || 'Driver';
  }, [bookingDetails, role]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const didSend = sendMessage(messageText);
    if (didSend) {
      setMessageText('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex h-[85vh] w-full max-w-[800px] flex-col rounded-[30px] bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0 rounded-2xl bg-gray-200 shadow-sm overflow-hidden">
              <img
                src={driverAvatar}
                onError={(e) => { e.target.src = driverAvatarFallback; }}
                alt="Driver Avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#111]">{headerName}</h3>
              <div className="flex items-center gap-1.5 text-[13px] text-[#4d4d4d]">
                <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-[#2b9f52]' : 'bg-gray-300'}`} />
                {isConnected ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-[#f2f2f2] p-2 text-[#4d4d4d] transition-colors hover:bg-gray-200"
          >
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 bg-white flex flex-col gap-5">
          {!rideId && (
            <div className="text-sm text-gray-500">Select a ride to start chatting.</div>
          )}

          {rideId && isLoading && (
            <div className="text-sm text-gray-500">Loading messages...</div>
          )}

          {rideId && !isLoading && error && (
            <div className="text-sm text-red-500">{error}</div>
          )}

          {rideId && !isLoading && !error && messages.length === 0 && (
            <div className="text-sm text-gray-500">No messages yet.</div>
          )}

          {rideId && !isLoading && !error && messages.map((message) => {
            const isOwn = message?.senderId === userId || message?.senderRole === role;

            return (
              <div
                key={message.id || `${message.senderId}-${message.createdAt}`}
                className={`flex items-end gap-3 ${isOwn ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <div className={`h-10 w-10 shrink-0 rounded-full overflow-hidden shadow-sm ${isOwn ? 'border border-gray-100 bg-gray-100' : 'bg-gray-200'}`}>
                  {isOwn ? (
                    <svg className="w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                  ) : (
                    <img src={driverAvatar} onError={(e) => { e.target.src = driverAvatarFallback; }} alt="avatar" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className={`flex flex-col gap-2 max-w-[80%] ${isOwn ? 'items-end' : ''}`}>
                  <div className={`rounded-[20px] px-5 py-3 text-[15px] ${isOwn ? 'rounded-br-sm bg-[#6b5cd4] text-white' : 'rounded-bl-sm bg-[#f2f2f2] text-[#111]'}`}>
                    {message.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Input Area */}
        <div className="shrink-0 px-4 py-4 sm:px-6 sm:py-6 md:px-8 bg-white">
          <div className="flex w-full h-[100px] sm:h-[120px] md:h-[150px] overflow-hidden rounded-[20px] sm:rounded-[25px] border border-gray-200 shadow-sm focus-within:border-[#1b2d5d] focus-within:ring-1 focus-within:ring-[#1b2d5d] transition-all">
            <div className="flex items-start pt-3 sm:pt-4 pl-3 sm:pl-4 text-gray-400">
              <FiPaperclip className="cursor-pointer text-gray-600 hover:text-gray-900 transition w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <textarea
              type="text"
              placeholder="Send a message..."
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              className="resize-none flex-1 px-3 py-3 sm:px-4 sm:py-4 text-[14px] sm:text-[15px] text-[#111] outline-none placeholder:text-gray-400"
            />
            <div className="flex items-end pr-2 sm:pr-3 gap-2 sm:gap-3 text-gray-400 pb-2.5 sm:pb-3">
              <FiSmile className="cursor-pointer text-gray-600 hover:text-gray-900 transition mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5" />
              <button
                onClick={handleSend}
                disabled={!rideId || !messageText.trim()}
                className="flex h-[36px] sm:h-[42px] items-center gap-1.5 sm:gap-2 rounded-full bg-[#1b2d5d] px-4 sm:px-5 text-[13px] sm:text-sm font-medium text-white transition-colors hover:bg-[#132042] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
                <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
