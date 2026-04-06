import { FiPaperclip, FiSend, FiSmile } from 'react-icons/fi';
import driverAvatar from '../../assets/driver1.png';
import driverAvatarFallback from '../../assets/driver1.png';

export default function DriverAdminChatView() {
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
              <h3 className="text-lg font-semibold text-[#111111]">Florencio Dorrance</h3>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#4d4d4d]">
                <span className="h-2 w-2 rounded-full bg-[#2b9f52]" />
                Online
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-6 sm:px-7">
          <div className="flex items-end gap-3 self-start">
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-200 shadow-sm">
              <img
                src={driverAvatar}
                onError={(event) => {
                  event.target.src = driverAvatarFallback;
                }}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex max-w-[82%] flex-col gap-2">
              <div className="rounded-2xl rounded-bl-sm bg-[#ececec] px-4 py-2.5 text-sm text-[#1a1a1a]">omg, this is amazing</div>
              <div className="w-fit rounded-2xl rounded-bl-sm bg-[#ececec] px-4 py-2.5 text-sm text-[#1a1a1a]">perfect! ✅</div>
              <div className="w-fit rounded-2xl rounded-bl-sm bg-[#ececec] px-4 py-2.5 text-sm text-[#1a1a1a]">Wow, this is really epic</div>
            </div>
          </div>

          <div className="mt-10 flex items-end gap-3 self-end flex-row-reverse">
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100 shadow-sm">
              <svg className="h-full w-full p-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="flex max-w-[82%] flex-col items-end gap-2">
              <div className="rounded-2xl rounded-br-sm bg-[#6159e6] px-4 py-2.5 text-sm text-white">How are you?</div>
            </div>
          </div>

          <div className="mt-2 flex items-end gap-3 self-start">
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-200 shadow-sm">
              <img
                src={driverAvatar}
                onError={(event) => {
                  event.target.src = driverAvatarFallback;
                }}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex max-w-[70%] flex-col gap-2">
              <div className="w-fit rounded-2xl rounded-bl-sm bg-[#ececec] px-4 py-2.5 text-sm text-[#1a1a1a]">just ideas for next time</div>
              <div className="w-fit rounded-2xl rounded-bl-sm bg-[#ececec] px-4 py-2.5 text-sm text-[#1a1a1a]">I&apos;ll be there in 2 mins ⏰</div>
            </div>
          </div>

          <div className="mt-10 flex items-end gap-3 self-end flex-row-reverse">
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100 shadow-sm">
              <svg className="h-full w-full p-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="flex max-w-[82%] flex-col items-end gap-2">
              <div className="rounded-2xl rounded-br-sm bg-[#6159e6] px-4 py-2.5 text-sm text-white">woohoooo</div>
              <div className="rounded-2xl rounded-br-sm bg-[#6159e6] px-4 py-2.5 text-sm text-white">Haha oh man</div>
              <div className="rounded-2xl rounded-br-sm bg-[#6159e6] px-4 py-2.5 text-sm text-white">Haha that&apos;s terrifying 😂</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-[#f8f8f8] px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex min-h-[98px] w-full overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-sm focus-within:border-[#1b2d5d] focus-within:ring-1 focus-within:ring-[#1b2d5d]">
            <div className="pt-3 pl-3 text-gray-500 sm:pt-4 sm:pl-4">
              <FiPaperclip className="h-5 w-5 cursor-pointer transition hover:text-gray-800" />
            </div>
            <textarea
              placeholder="Send a message..."
              className="h-[98px] flex-1 resize-none px-3 py-3 text-sm text-[#111111] outline-none placeholder:text-gray-400 sm:px-4 sm:py-4"
            />
            <div className="flex items-end gap-2 pb-3 pr-3 text-gray-500 sm:gap-3 sm:pb-4 sm:pr-4">
              <FiSmile className="mb-1 h-5 w-5 cursor-pointer transition hover:text-gray-800" />
              <button className="flex h-10 items-center gap-2 rounded-full bg-[#1b2d5d] px-5 text-sm font-medium text-white transition-colors hover:bg-[#132042]">
                Send
                <FiSend className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
