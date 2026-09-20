import type { CSSProperties } from 'react';
import { brickOf } from '../bricks';

interface Props {
  id: string;
  qty?: number;
  className?: string;
}

export function BrickView({ id, qty, className }: Props): JSX.Element {
  const b = brickOf(id);
  return (
    <span
      className={`lego lego-${b.kind} lego-w${b.studs} ${b.id.endsWith('-r') ? 'lego-slope-r' : ''} ${className ?? ''}`}
      style={{ ['--brick' as string]: b.color } as CSSProperties}
    >
      <span className="lego-studs" aria-hidden>
        {Array.from({ length: b.studs }, (_, i) => (
          <i key={i} className="lego-stud" />
        ))}
      </span>
      {qty && qty > 1 ? <span className="lego-qty">×{qty}</span> : null}
    </span>
  );
}
