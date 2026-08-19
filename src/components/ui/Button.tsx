import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

interface BaseButtonProps {
  variant?: 'primary' | 'outline' | 'pill' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-2.5 text-xs tracking-widest',
    md: 'px-8 py-3.5 sm:px-9 sm:py-4 text-xs sm:text-sm tracking-[0.18em]',
    lg: 'px-10 py-4 sm:px-12 sm:py-5 text-sm sm:text-base tracking-[0.2em]',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#C7A66A] text-[#0B0B0A] font-semibold hover:bg-[#D8B87A] active:scale-[0.98] shadow-md',
    outline:
      'bg-transparent text-[#F4F0E8] border border-[rgba(244,240,232,0.35)] hover:bg-[rgba(244,240,232,0.08)] active:scale-[0.98]',
    pill:
      'bg-transparent text-[#F4F0E8] border border-[rgba(244,240,232,0.25)] hover:border-[#C7A66A] hover:text-[#C7A66A] active:scale-[0.98]',
    secondary:
      'bg-[#1C1C1A] text-[#F4F0E8] border border-[rgba(244,240,232,0.15)] hover:bg-[#252522] active:scale-[0.98]',
  }[variant];

  const combinedClass = `inline-flex items-center justify-center uppercase font-medium rounded-full transition-all duration-200 cursor-pointer select-none text-center ${sizeClasses} ${variantClasses} ${className}`;

  if ('href' in props && props.href) {
    return (
      <a className={combinedClass} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClass} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
