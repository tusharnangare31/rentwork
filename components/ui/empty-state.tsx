import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './button.tsx';
import { cn } from '../../lib/utils.ts';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 rounded-xl border border-dashed border-slate-300 bg-white text-center max-w-md mx-auto my-8',
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
        {icon || <PackageOpen className="w-7 h-7" />}
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-1.5">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="default" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
