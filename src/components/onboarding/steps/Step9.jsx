import { useEffect, useState } from 'react';
import { FiCheck, FiExternalLink } from 'react-icons/fi';
import whitewallet from '../../../assets/whitewallet.png';
import { createDriverConnectLink, getDriverConnectStatus } from '../../../services/driverService';

export const Step9 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [status, setStatus] = useState({ onboarded: false });

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
    return {
      onboarded,
      raw: source,
    };
  };

  useEffect(() => {
    let isMounted = true;

    const loadStatus = async () => {
      setIsLoading(true);
      const result = await getDriverConnectStatus();
      console.log('Driver Connect Status Result:', result);
      if (!isMounted) return;

      if (result?.success) {
        setStatus(normalizeStatus(result));
      }
      setIsLoading(false);
    };

    loadStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateLink = async () => {
    setIsCreatingLink(true);
    const result = await createDriverConnectLink();
    setIsCreatingLink(false);
    if (result?.success) {
      const url = result?.url;
      if (url) window.location.href = url;
    }
  };

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
          {isLoading ? (
            <div className="text-[13px] text-gray-500">Checking status...</div>
          ) : (
            <div className={`rounded-full px-3 py-1 text-xs border ${status.onboarded ? 'border-green-300 text-green-600' : 'border-amber-300 text-amber-600'}`}>
              {status.onboarded ? 'Onboarding Complete' : 'Setup Required'}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between">
          
          {isLoading ? (
            <div className="text-[13px] text-gray-500">Checking status...</div>
          ) : (
            <div>
              <div className="text-[15px] font-medium text-[#111]">Payout setup</div>
              <div className="text-[13px] text-gray-500">
                {status.onboarded ? 'Your account is ready.' : 'Complete the Stripe onboarding flow.'}
              </div>
            </div>
          )}
          {!status.onboarded && !isLoading && (
          <button
            onClick={handleCreateLink}
            disabled={isCreatingLink}
            className="inline-flex items-center gap-2 rounded-full bg-[#1b2d5d] px-5 py-2 text-[13px] font-medium text-white hover:bg-[#132042] transition-colors disabled:opacity-60"
          >
            {isCreatingLink ? 'Opening...' : status.onboarded ? 'Manage' : 'Set up payouts'}
            <FiExternalLink size={14} />
          </button>)}
          
        </div>

        {/* {status.onboarded && (
          <div className="flex items-center gap-2 text-[13px] text-green-600">
            <FiCheck size={14} /> Stripe onboarding complete.
          </div>
        )} */}
      </div>
    </div>
  );
};
