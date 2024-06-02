const env = import.meta.env;
export const isZustandEnabled = env.VITE_ZUSTAND_ENABLED === 'true';

export const DEFAULT_NO_AVATAR_MEDIUM = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';

export const DEFAULT_NO_AVATAR_TINY = '//ssl.gstatic.com/accounts/ui/avatar_1x.png';