// UPI Payment Configuration with Android WebView Intent Compatibility
// Rotates between Kovak's 3 verified Paytm UPI IDs

export const UPI_ACCOUNTS = [
  { id: 'paytm.s3h7o9h@pty', name: 'Tap Pay Merchant' },
  { id: '8099386968@ptyes', name: 'Tap Pay Merchant' },
  { id: '8453011706@ptyes', name: 'Tap Pay Merchant' },
];

let currentIndex = 0;

export function getNextUpi() {
  const upi = UPI_ACCOUNTS[currentIndex % UPI_ACCOUNTS.length];
  currentIndex++;
  return upi;
}

/**
 * Generate a standard UPI deep link
 */
export function createStandardUpiUrl(upiId, amount, orderDescription = 'RP Purchase') {
  const params = new URLSearchParams({
    pa: upiId,
    pn: 'Tap Pay',
    am: Number(amount).toFixed(2),
    cu: 'INR',
    tn: orderDescription,
  });
  return `upi://pay?${params.toString()}`;
}

/**
 * Generate Android Intent URI for Paytm specifically
 * This prevents ERR_UNKNOWN_URL_SCHEME in Android WebViews
 */
export function createPaytmIntentUrl(upiId, amount, orderDescription = 'RP Purchase') {
  const encDesc = encodeURIComponent(orderDescription);
  const amt = Number(amount).toFixed(2);
  return `intent://pay?pa=${upiId}&pn=Tap+Pay&am=${amt}&cu=INR&tn=${encDesc}#Intent;scheme=upi;package=net.one97.paytm;end`;
}

/**
 * Generate Android Intent URI for any installed UPI app (GPay, PhonePe, Paytm, BHIM)
 */
export function createGenericUpiIntentUrl(upiId, amount, orderDescription = 'RP Purchase') {
  const encDesc = encodeURIComponent(orderDescription);
  const amt = Number(amount).toFixed(2);
  return `intent://pay?pa=${upiId}&pn=Tap+Pay&am=${amt}&cu=INR&tn=${encDesc}#Intent;scheme=upi;end`;
}

/**
 * Safe trigger that does NOT crash Android WebViews
 */
export function safelyOpenUpiLink(url) {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (link.parentNode) link.parentNode.removeChild(link);
    }, 500);
  } catch (err) {
    console.warn('Could not launch intent directly', err);
  }
}
