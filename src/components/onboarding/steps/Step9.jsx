import { useEffect, useRef, useState } from 'react';
import { FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import whitewallet from '../../../assets/whitewallet.png';
import { createDriverConnectLink, getDriverConnectStatus } from '../../../services/driverService';

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 8;
const STRIPE_PENDING_KEY = 'stripe_connect_pending';

export const Step9 = ({ onStatusChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [pollAttempt, setPollAttempt] = useState(0);
  const [status, setStatus] = useState({ onboarded: false });
  const onStatusChangeRef = useRef(onStatusChange);
  useEffect(() => { onStatusChangeRef.current = onStatusChange; }, [onStatusChange]);

  const normalizeStatus = (value) => {
    const source = value?.raw ?? value?.data ?? value ?? {};
    const statusText = String(source.status || '').toLowerCase();
    const onboarded = Boolean(
      source.onboarded ||
      source.stripeOnboarded ||
      source.isOnboarded ||
      source.completed ||
      statusText === 'complete' ||
      statusText === 'onboarded'
    );
    return { onboarded, raw: source };
  };

  const applyStatus = (normalized) => {
    setStatus(normalized);
    onStatusChangeRef.current?.(normalized.onboarded);
  };

  // Poll until onboarded or max attempts reached
  const pollStatus = async () => {
    setIsPolling(true);
    let attempt = 0;

    while (attempt < MAX_POLL_ATTEMPTS) {
      attempt++;
      setPollAttempt(attempt);

      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

      const result = await getDriverConnectStatus();
      if (result?.success) {
        const normalized = normalizeStatus(result);
        if (normalized.onboarded) {
          applyStatus(normalized);
          sessionStorage.removeItem(STRIPE_PENDING_KEY);
          setIsPolling(false);
          setIsLoading(false);
          return;
        }
      }
    }

    // Max retries reached — clear flag, show manual refresh
    sessionStorage.removeItem(STRIPE_PENDING_KEY);
    setIsPolling(false);
    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      setIsLoading(true);

      const returning = sessionStorage.getItem(STRIPE_PENDING_KEY) === '1';

      const result = await getDriverConnectStatus();
      if (!isMounted) return;

      if (result?.success) {
        const normalized = normalizeStatus(result);
        applyStatus(normalized);

        if (normalized.onboarded) {
          sessionStorage.removeItem(STRIPE_PENDING_KEY);
          setIsLoading(false);
          return;
        }
      } else {
        onStatusChangeRef.current?.(false);
      }

      // Not onboarded yet — if returning from Stripe, start polling
      if (returning && isMounted) {
        pollStatus();
      } else {
        setIsLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateLink = async () => {
    setIsCreatingLink(true);
    const result = await createDriverConnectLink();
    setIsCreatingLink(false);
    if (result?.success) {
      const url = result?.url;
      if (url) {
        // Mark that we're leaving for Stripe so on return we poll
        sessionStorage.setItem(STRIPE_PENDING_KEY, '1');
        window.location.href = url;
      }
    }
  };

  const handleManualRefresh = async () => {
    setIsLoading(true);
    const result = await getDriverConnectStatus();
    if (result?.success) {
      const normalized = normalizeStatus(result);
      applyStatus(normalized);
    }
    setIsLoading(false);
  };

  const pollingMessage = isPolling
    ? `Verifying your Stripe account… (${pollAttempt}/${MAX_POLL_ATTEMPTS})`
    : null;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-[18px] font-bold text-[#111]">Payment Details</h2>
        <p className="text-[14px] text-gray-500 mt-2">
          Set up Stripe Express payouts to receive payments.
        </p>
      </div>

      <div className="space-y-4 max-w-2xl">
        <div className="border border-[#1b2d5d] rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1b2d5d] flex items-center justify-center text-white">
              <img src={whitewallet} alt="card" className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[15px] font-medium text-[#111]">Stripe Express</div>
              <div className="text-[13px] text-gray-500">Payouts for completed rides</div>
            </div>
          </div>
          {isLoading || isPolling ? (
            <div className="text-[13px] text-gray-500 flex items-center gap-2">
              <FiRefreshCw size={13} className="animate-spin" />
              {isPolling ? 'Syncing...' : 'Checking status...'}
            </div>
          ) : (
            <div className={`rounded-full px-3 py-1 text-xs border ${status.onboarded ? 'border-green-300 text-green-600' : 'border-amber-300 text-amber-600'}`}>
              {status.onboarded ? 'Onboarding Complete' : 'Setup Required'}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between gap-4">
          {isPolling ? (
            <div className="text-[14px] text-gray-500 flex-1">{pollingMessage}</div>
          ) : isLoading ? (
            <div className="text-[13px] text-gray-500">Checking status...</div>
          ) : (
            <div>
              <div className="text-[15px] font-medium text-[#111]">Payout setup</div>
              <div className="text-[13px] text-gray-500">
                {status.onboarded ? 'Your account is ready.' : 'Complete the Stripe onboarding flow.'}
              </div>
            </div>
          )}

          {!isLoading && !isPolling && (
            status.onboarded ? null : (
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleManualRefresh}
                  title="Refresh status"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 hover:text-[#1b2d5d] hover:border-[#1b2d5d] transition-colors"
                >
                  <FiRefreshCw size={14} />
                </button>
                <button
                  onClick={handleCreateLink}
                  disabled={isCreatingLink}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1b2d5d] px-5 py-2 text-[13px] font-medium text-white hover:bg-[#132042] transition-colors disabled:opacity-60"
                >
                  {isCreatingLink ? 'Opening...' : 'Set up payouts'}
                  <FiExternalLink size={14} />
                </button>
              </div>
            )
          )}
        </div>

        {!isLoading && !isPolling && !status.onboarded && (
          <p className="text-[12px] text-gray-400 pl-1">
            Already completed Stripe setup? Click the refresh button to re-check your account status.
          </p>
        )}
      </div>
    </div>
  );
};
