'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PAGE_CONFIG } from '@/lib/constants/pages';

interface SectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  headerActions?: ReactNode;
}

export function Section({ children, title, description, className, headerActions }: SectionProps) {
  return (
    <Card className={cn(PAGE_CONFIG.card, className)}>
      {/* Header */}
      {(title || description || headerActions) && (
        <div className={PAGE_CONFIG.cardHeader}>
          <div className='flex-1'>
            {title && <h2 className={PAGE_CONFIG.cardTitle}>{title}</h2>}
            {description && <p className={PAGE_CONFIG.sectionDescription}>{description}</p>}
          </div>
          {headerActions && <div className='ml-4'>{headerActions}</div>}
        </div>
      )}

      {/* Content */}
      <div className={PAGE_CONFIG.cardContent}>{children}</div>
    </Card>
  );
}
