export default function ProfileToast({ message, type }) {
  if (!message) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] px-5 py-3 rounded-xl shadow-lg text-white text-[14px] font-medium transition-all
        ${type === 'error' ? 'bg-red-500' : 'bg-green-600'}`}
    >
      {message}
    </div>
  )
}
