import { initiatePayment } from '../data/upi';

export default function OrderCard({ order, onReceive, mode = 'buy' }) {
  const handleReceive = () => {
    if (mode === 'buy') {
      // Trigger UPI payment via Paytm deep link
      initiatePayment(order.amount, order.id);
    }
    if (onReceive) onReceive(order);
  };

  return (
    <div className="bg-white px-4 py-4 border-b border-gray-100 slide-in">
      <div className="flex items-start justify-between">
        {/* Left side — order info */}
        <div className="flex-1">
          <h3 className="text-gray-900 font-bold text-base">
            Order amount: {order.amount.toFixed(1)}
          </h3>
          <p className="text-gray-500 text-xs mt-1">
            Order quantity: {order.quantity}
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-gray-500 text-xs">Reward:</span>
            <span className="text-gray-900 font-bold text-sm">{order.reward}</span>
            {order.bonus > 0 && (
              <span className="text-green-500 text-xs font-semibold">+{order.bonus.toFixed(1)}</span>
            )}
          </div>
        </div>

        {/* Right side — receive button & final */}
        <div className="flex flex-col items-end gap-1">
          <button
            onClick={handleReceive}
            className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-6 py-2 rounded-lg transition-all active:scale-95 shadow-sm"
          >
            Receive
          </button>
          <p className="text-primary font-bold text-sm mt-1">
            Final: <span>{order.finalRP.toFixed(2)} RP</span>
          </p>
        </div>
      </div>
    </div>
  );
}
