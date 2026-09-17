export default function TapPayLogo({ size = 'md', showText = true, className = '' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-11 h-11 rounded-2xl',
    lg: 'w-16 h-16 rounded-2xl',
    xl: 'w-20 h-20 rounded-3xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/tap-pay-logo.png"
        alt="Tap Pay Logo"
        className={`${sizeClasses[size] || sizeClasses.md} object-contain rounded-2xl shadow-sm bg-white p-0.5 border border-gray-100 flex-shrink-0`}
      />
      {showText && (
        <div className="flex flex-col text-left leading-none">
          <span className="font-black text-xl tracking-tight text-gray-900 flex items-center">
            TAP<span className="text-[#0066FF] ml-1">PAY</span>
          </span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
            Instant Pay & Trade
          </span>
        </div>
      )}
    </div>
  );
}
