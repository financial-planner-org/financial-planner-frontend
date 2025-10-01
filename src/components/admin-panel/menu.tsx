'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { getMenuList } from '@/lib/menu-list';
import { Button } from '@/components/ui/button';

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <nav className='mt-8 h-full w-full'>
      <ul className='flex flex-col items-start space-y-2 px-2'>
        {menuList.map(({ groupLabel, menus }, index) => (
          <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
            {menus.map(({ href, label, icon: Icon, active }, menuIndex) => (
              <div className='w-full' key={menuIndex}>
                <Button
                  variant={
                    (active === undefined && pathname.startsWith(href)) || active
                      ? 'secondary'
                      : 'ghost'
                  }
                  className='w-full justify-start h-10 mb-1 text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  asChild
                >
                  <Link href={href}>
                    <span className='mr-4'>
                      <Icon size={18} />
                    </span>
                    <p className='max-w-[200px] truncate'>{label}</p>
                  </Link>
                </Button>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </nav>
  );
}
