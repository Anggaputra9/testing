export interface Theme {
  primary: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  cardBackground: string;
  text: string;
  secondaryText: string;
  border: string;
  progressBackground: string;
}

export function getLightTheme(): Theme {
  return {
    primary: '#00897B',
    primaryLight: 'rgba(0, 137, 123, 0.1)',
    secondary: '#3B82F6',
    accent: '#FF8A65',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#FB7185',
    background: '#F8FAFC',
    cardBackground: '#FFFFFF',
    text: '#1E293B',
    secondaryText: '#64748B',
    border: '#E2E8F0',
    progressBackground: '#E2E8F0',
  };
}

export function getDarkTheme(): Theme {
  return {
    primary: '#4FD1C5',
    primaryLight: 'rgba(79, 209, 197, 0.1)',
    secondary: '#60A5FA',
    accent: '#FF8A65',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#FB7185',
    background: '#0F172A',
    cardBackground: '#1E293B',
    text: '#F1F5F9',
    secondaryText: '#94A3B8',
    border: '#2D3748',
    progressBackground: '#2D3748',
  };
}