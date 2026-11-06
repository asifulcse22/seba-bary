import React from 'react';
import { User as UserIcon } from 'lucide-react';
import { UserProfile } from '../types';

interface UserAvatarProps {
  user: UserProfile | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showRing?: boolean;
}

export const getInitials = (name?: string): string => {
  if (!name || !name.trim()) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[0].charAt(0);
    const second = parts[1].charAt(0);
    return `${first}${second}`.toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  className = '',
  showRing = true
}) => {
  const sizeClasses = {
    xs: 'w-7 h-7 text-[11px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 sm:w-16 sm:h-16 text-xl sm:text-2xl',
    xl: 'w-16 h-16 sm:w-20 sm:h-20 text-2xl sm:text-3xl'
  };

  const getGradientByTier = () => {
    if (!user) {
      return 'from-emerald-400 via-teal-500 to-cyan-500';
    }
    switch (user.activeTier) {
      case 'personal':
        return 'from-sky-500 via-blue-600 to-indigo-600';
      case 'sub_admin':
        return 'from-purple-600 via-indigo-600 to-amber-500';
      case 'business':
      default:
        return 'from-emerald-500 via-teal-500 to-cyan-600';
    }
  };

  // Check if avatarUrl is provided or fallback to handsome modern default user portrait
  const displayImageUrl = user?.avatarUrl && user.avatarUrl.trim().length > 5 
    ? user.avatarUrl 
    : user 
      ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'
      : '';

  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full font-black select-none ${sizeClasses[size]} ${
        showRing ? 'ring-2 ring-white/60 shadow-md' : ''
      } ${className}`}
    >
      {user && displayImageUrl && !imgError ? (
        <img
          src={displayImageUrl}
          alt={user.name || 'User'}
          onError={() => setImgError(true)}
          className="w-full h-full rounded-full object-cover"
        />
      ) : user ? (
        <div
          className={`w-full h-full rounded-full bg-gradient-to-tr ${getGradientByTier()} text-white flex items-center justify-center shadow-inner tracking-wider drop-shadow-sm font-extrabold`}
        >
          <span>{getInitials(user.name)}</span>
        </div>
      ) : (
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-600 text-white flex items-center justify-center shadow-inner">
          <UserIcon className="w-1/2 h-1/2 text-white/90" />
        </div>
      )}
    </div>
  );
};

