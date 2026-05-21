import { useEffect, useMemo, useState } from 'react';
import { FiBell } from 'react-icons/fi';
import { getCustomerNotifications, getDriverNotifications } from '../../services/notificationService';

const getDateLabel = (date) => {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfThatDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((startOfToday - startOfThatDay) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const groupNotifications = (items) => {
  const groups = new Map();
  const orderedKeys = [];

  items.forEach((item) => {
    const createdAt = item?.createdAt ? new Date(item.createdAt) : new Date();
    const label = getDateLabel(createdAt);

    if (!groups.has(label)) {
      groups.set(label, []);
      orderedKeys.push(label);
    }

    groups.get(label).push(item);
  });

  return orderedKeys.map((key) => ({ title: key, items: groups.get(key) }));
};

function NotificationItem({ title, description, isUnread }) {
  const isHighlighted = Boolean(isUnread);
  const bgColor = isUnread ? 'bg-[#1b2d5d]' : 'bg-[#e4ebfc]';
  const iconColor = isUnread ? 'text-white' : 'text-[#1b2d5d]';

  return (
    <div
      className={`relative flex items-center justify-between rounded-[20px] p-5 mb-4 ${isHighlighted ? 'bg-[#d6def4]' : 'bg-transparent border-b border-gray-100 last:border-b-0'
        }`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full ${bgColor} ${iconColor}`}>
          <FiBell size={22} />
        </div>
        <div>
          <h4 className="text-[17px] font-semibold text-[#111]">{title}</h4>
          <p className="text-sm text-[#666] mt-0.5">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Unread indicator */}
        {isUnread && <div className="h-2 w-2 rounded-full bg-[#1b2d5d]"></div>}
      </div>
    </div>
  );
}

export default function RideAlertsView({ role = 'customer' }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      setError('');

      const result = role === 'driver'
        ? await getDriverNotifications()
        : await getCustomerNotifications();

      if (!result?.success) {
        setError(result?.message || 'Failed to load notifications.');
        setNotifications([]);
        setIsLoading(false);
        return;
      }

      const items = Array.isArray(result?.data) ? result.data : [];
      const sorted = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotifications(sorted);
      setIsLoading(false);
    };

    loadNotifications();
  }, [role]);

  const sections = useMemo(() => groupNotifications(notifications), [notifications]);

  return (
    <section className="rounded-xl bg-gray-50 flex-1">
      <div className="px-4 pb-8 sm:px-10 mt-6 max-w-[1000px]">
        {isLoading && (
          <div className="text-sm text-gray-500">Loading notifications...</div>
        )}

        {!isLoading && error && (
          <div className="text-sm text-red-500">{error}</div>
        )}

        {!isLoading && !error && sections.length === 0 && (
          <div className="text-sm text-gray-500">No notifications yet.</div>
        )}

        {!isLoading && !error && sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h3 className="mb-5 text-[17px] font-semibold text-[#111]">{section.title}</h3>

            {section.items.map((item) => (
              <NotificationItem
                key={item.id}
                title={item.title || 'Notification'}
                description={item.message || ''}
                isUnread={!item.isRead}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
