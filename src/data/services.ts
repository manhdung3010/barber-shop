import { Service } from '../types/index.ts';

export const servicesData: Service[] = [
  {
    id: 'haircut',
    name: 'Haircut',
    description: 'Classic haircut tailored to your face shape, hair texture, and preferred style.',
    price: '[PRICE]',
    duration: '45 MIN',
  },
  {
    id: 'fade',
    name: 'Fade',
    description: 'Clean low, mid, or high fade with detailed blending and crisp razor finishing.',
    price: '[PRICE]',
    duration: '45 MIN',
  },
  {
    id: 'haircut-beard',
    name: 'Haircut + Beard',
    description: 'Complete tailored haircut, hot towel beard trim, shaping, and conditioning styling.',
    price: '[PRICE]',
    duration: '60 MIN',
  },
  {
    id: 'perm',
    name: 'Perm',
    description: 'Textured, Korean-inspired, or customized wavy perm designed around your hair structure.',
    price: '[PRICE]',
    duration: '90 MIN',
  },
  {
    id: 'styling',
    name: 'Wash & Styling',
    description: 'Invigorating hair wash, scalp massage, blow-dry, and signature pomade styling.',
    price: '[PRICE]',
    duration: '30 MIN',
  },
];
