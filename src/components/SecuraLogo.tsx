import React from 'react';

interface SecuraLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light'; // dark = for light backgrounds (navy text), light = for dark backgrounds (white text)
  className?: string;
  showTagline?: boolean;
}

export const SecuraLogo: React.FC<SecuraLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'dark',
  className = '',
  showTagline = true,
}) => {
  // Dimension scales
  const dimensions = {
    sm: { width: 34, height: 38, textScale: 'text-base', taglineScale: 'text-[9px]' },
    md: { width: 48, height: 54, textScale: 'text-xl', taglineScale: 'text-[11px]' },
    lg: { width: 70, height: 78, textScale: 'text-2xl', taglineScale: 'text-xs' },
    xl: { width: 110, height: 122, textScale: 'text-3xl', taglineScale: 'text-sm' },
  }[size];

  const textColor = theme === 'light' ? 'text-white' : 'text-[#0B3558]';
  const taglineColor = theme === 'light' ? 'text-[#14B8A6]' : 'text-[#0D9488]';

  // The official Secura emblem loaded from Cloudinary
  const LOGO_IMAGE_URL = 'https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:best,f_jpg/cloudinary-tools-uploads/vokuxbmvdldg2hpjuccm';

  const Emblem = ({ width, height }: { width: number; height: number }) => (
    <img
      src={LOGO_IMAGE_URL}
      alt="Secura Logo"
      width={width}
      height={height}
      className="shrink-0 object-contain transition-transform duration-200"
      style={{ width, height }}
      loading="eager"
    />
  );

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem width={dimensions.width} height={dimensions.height} />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <Emblem width={dimensions.width} height={dimensions.height} />
        <div className="mt-3">
          <div className="flex items-center justify-center gap-1.5">
            <span className={`font-extrabold tracking-tight uppercase ${dimensions.textScale} ${textColor}`}>
              SECURA
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#14B8A6]" />
          </div>
          {showTagline && (
            <p className={`font-semibold tracking-wide mt-0.5 ${dimensions.taglineScale} ${taglineColor}`}>
              Smarter Support for ASHA Workers
            </p>
          )}
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Emblem width={dimensions.width} height={dimensions.height} />
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight uppercase ${dimensions.textScale} ${textColor}`}>
            SECURA
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
        </div>
        {showTagline && (
          <span className={`font-semibold tracking-normal mt-1 ${dimensions.taglineScale} ${taglineColor} whitespace-nowrap`}>
            Smarter Support for ASHA Workers
          </span>
        )}
      </div>
    </div>
  );
};

export default SecuraLogo;
