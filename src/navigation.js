import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['tr', 'en'];

 
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales});