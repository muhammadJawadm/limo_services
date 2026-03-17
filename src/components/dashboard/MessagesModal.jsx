import { FiPaperclip, FiSmile, FiSend } from 'react-icons/fi';
import driverAvatar from '../../assets/driver1.png'; // Assuming an avatar exists, optionally fallback
import driverAvatarFallback from '../../assets/driver1.png';

export default function MessagesModal({ isOpen, onClose }) {
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
              <h3 className="text-lg font-bold text-[#111]">Florencio Dorrance</h3>
              <div className="flex items-center gap-1.5 text-[13px] text-[#4d4d4d]">
                <span className="h-2 w-2 rounded-full bg-[#2b9f52]" />
                Online
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

          {/* Received Message Block */}
          <div className="flex items-end gap-3 self-start">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 overflow-hidden shadow-sm">
              <img src={driverAvatar} onError={(e) => { e.target.src = driverAvatarFallback; }} alt="avatar" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-2 max-w-[80%]">
              <div className="rounded-[20px] rounded-bl-sm bg-[#f2f2f2] px-5 py-3 text-[15px] text-[#111]">
                omg, this is amazing
              </div>
              <div className="rounded-[20px] rounded-bl-sm bg-[#f2f2f2] px-5 py-3 text-[15px] text-[#111] self-start">
                perfect! ✅
              </div>
              <div className="rounded-[20px] rounded-bl-sm bg-[#f2f2f2] px-5 py-3 text-[15px] text-[#111] self-start">
                Wow, this is really epic
              </div>
            </div>
          </div>

          {/* Sent Message Block */}
          <div className="flex items-end gap-3 self-end flex-row-reverse">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 overflow-hidden shadow-sm relative border border-gray-100">
              <svg className="absolute w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
            </div>
            <div className="flex flex-col gap-2 max-w-[80%] items-end">
              <div className="rounded-[20px] rounded-br-sm bg-[#6b5cd4] px-5 py-3 text-[15px] text-white">
                How are you?
              </div>
            </div>
          </div>

          {/* Received Message Block 2 */}
          <div className="flex items-end gap-3 self-start mt-6">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 overflow-hidden shadow-sm">
              <img src={driverAvatar} onError={(e) => { e.target.src = driverAvatarFallback; }} alt="avatar" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-2 max-w-[70%]">
              <div className="rounded-[20px] rounded-bl-sm bg-[#f2f2f2] px-5 py-3 text-[15px] text-[#111]">
                just ideas for next time
              </div>
              <div className="rounded-[20px] rounded-bl-sm bg-[#f2f2f2] px-5 py-3 text-[15px] text-[#111] self-start">
                I'll be there in 2 mins ⏰
              </div>
            </div>
          </div>

          {/* Sent Message Block 2 */}
          <div className="flex items-end gap-3 self-end flex-row-reverse mt-6">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 overflow-hidden shadow-sm relative border border-gray-100">
              <svg className="absolute w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
            </div>
            <div className="flex flex-col gap-2 max-w-[80%] items-end">
              <div className="rounded-[20px] rounded-br-sm bg-[#6b5cd4] px-5 py-3 text-[15px] text-white">
                woohoooo
              </div>
              <div className="rounded-[20px] rounded-br-sm bg-[#6b5cd4] px-5 py-3 text-[15px] text-white">
                Haha oh man
              </div>
              <div className="rounded-[20px] rounded-br-sm bg-[#6b5cd4] px-5 py-3 text-[15px] text-white">
                Haha that's terrifying 😂
              </div>
            </div>
          </div>

        </div>

        {/* Input Area */}
        <div className="shrink-0 px-6 py-6 sm:px-8 bg-white">
          <div className="flex w-full h-[150px] overflow-hidden rounded-[25px] border border-gray-200 shadow-sm focus-within:border-[#1b2d5d] focus-within:ring-1 focus-within:ring-[#1b2d5d] transition-all">
            <div className="flex items-start pt-4 pl-4 text-gray-400">
              <FiPaperclip size={20} className="cursor-pointer text-gray-600 hover:text-gray-900 transition" />
            </div>
            <textarea
              type="text"
              placeholder="Send a message..."
              className="resize-none flex-1 px-4 py-4 text-[15px] text-[#111] outline-none placeholder:text-gray-400"
            />
            <div className="flex items-end pr-3 gap-3 text-gray-400 pb-2">
              <FiSmile size={20} className="cursor-pointer text-gray-600 hover:text-gray-600 transition mb-2" />
              <button className="flex h-[42px] items-center gap-2 rounded-full bg-[#1b2d5d] px-5 text-sm font-medium text-white transition-colors hover:bg-[#132042]">
                Send
                <FiSend size={15} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
