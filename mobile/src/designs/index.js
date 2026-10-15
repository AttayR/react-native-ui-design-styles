// Saare designs ki list — naya design add karna ho to file banao aur yahan aik line jor do
import Minimalist from './Minimalist';
import Material from './Material';
import Cupertino from './Cupertino';
import Glassmorphism from './Glassmorphism';
import Neumorphism from './Neumorphism';
import Brutalism from './Brutalism';
import Neobrutalism from './Neobrutalism';
import Skeuomorphism from './Skeuomorphism';

export const DESIGNS = [
  { id: 'minimalist', name: 'Minimalist', tagline: 'Simple, clean, kam elements', swatch: ['#FFFFFF', '#111111'], Component: Minimalist },
  { id: 'material', name: 'Material Design', tagline: 'Google-style components', swatch: ['#6750A4', '#EADDFF'], Component: Material },
  { id: 'cupertino', name: 'iOS / Cupertino', tagline: 'Apple-style controls aur navigation', swatch: ['#007AFF', '#F2F2F7'], Component: Cupertino },
  { id: 'glassmorphism', name: 'Glassmorphism', tagline: 'Transparent, frosted-glass effects', swatch: ['#8B5CF6', '#F472B6'], Component: Glassmorphism },
  { id: 'neumorphism', name: 'Neumorphism', tagline: 'Soft, raised ya inset elements', swatch: ['#E4E9F0', '#A3B1C6'], Component: Neumorphism },
  { id: 'brutalism', name: 'Brutalism', tagline: 'Bold typography, raw layouts', swatch: ['#000000', '#FFFFFF'], Component: Brutalism },
  { id: 'neobrutalism', name: 'Neobrutalism', tagline: 'Bold borders, bright colors, playful shadows', swatch: ['#FDE047', '#FF6B9D'], Component: Neobrutalism },
  { id: 'skeuomorphism', name: 'Skeuomorphism', tagline: 'Real-world objects jaisa appearance', swatch: ['#7A4B2A', '#FFF6C9'], Component: Skeuomorphism },
];
