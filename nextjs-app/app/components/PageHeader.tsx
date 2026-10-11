import type { ReactNode } from 'react';

type Props = {
  title: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
};

export function PageHeader({ title, primaryAction, secondaryAction }: Props) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      <div className="header-actions">
        {secondaryAction}
        {primaryAction}
      </div>
    </div>
  );
}
