// UPI Payment Configuration
// Rotates between multiple UPI IDs for load distribution

const UPI_IDS = [
  { id: 'paytm.s3h7o9h@pty', name: 'RP Store' },
  { id: '8099386968@ptyes', name: 'RP Store' },
  { id: '8453011706@ptyes', name: 'RP Store' },
];

let currentIndex = 0;

/**
 * Generate a UPI payment deep link URL
 * Opens Paytm (or any UPI app) with amount pre-filled
 */
export function createPaymentUrl(amount, orderDescription = 'RP Purchase') {
  const upi = UPI_IDS[currentIndex % UPI_IDS.length];
  currentIndex++;

  const params = new URLSearchParams({
    pa: upi.id,
    pn: upi.name,
    am: amount.toFixed(2),
    cu: 'INR',
    tn: orderDescription,
  });

  return `upi://pay?${params.toString()}`;
}

/**
 * Trigger UPI payment by opening the deep link
 */
export function initiatePayment(amount, orderId) {
  const description = `RP Purchase - Order #${orderId}`;
  const url = createPaymentUrl(amount, description);
  window.location.href = url;
}
