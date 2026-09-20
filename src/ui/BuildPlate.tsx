import type { CSSProperties } from 'react';
import { brickOf } from '../bricks';
import { PLATE_COLS, PLATE_ROWS, type Place } from '../robots';
import { BrickView } from './BrickView';

interface Props {
  placed: Place[];
  ghost?: Place | null;
  guides?: Place[];
  focus?: Place[];
  frame?: Place[];
  celebrating?: boolean;
  mini?: boolean;
}

function spanOf(id: string): number {
  return brickOf(id).studs === 4 ? 2 : 1;
}

function keyOf(p: Place): string {
  return `${p.id}-${p.x}-${p.y}`;
}

function bounds(items: Place[]): { minX: number; maxX: number; minY: number; maxY: number } {
  let minX = PLATE_COLS;
  let maxX = 1;
  let minY = PLATE_ROWS;
  let maxY = 0;
  for (const p of items) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x + spanOf(p.id) - 1);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  if (items.length === 0) return { minX: 1, maxX: PLATE_COLS, minY: 0, maxY: PLATE_ROWS - 1 };
  return { minX, maxX, minY, maxY };
}

export function BuildPlate({
  placed,
  ghost = null,
  guides = [],
  focus = [],
  frame,
  celebrating = false,
  mini = false,
}: Props): JSX.Element {
  const cropSource = mini ? (guides.length ? guides : placed) : (frame && frame.length ? frame : placed);
  const crop = bounds(cropSource);
  const cols = crop.maxX - crop.minX + 1;
  const rows = Math.max(1, crop.maxY - crop.minY + 1);
  const placedKeys = new Set(placed.map(keyOf));
  const focusKeys = new Set(focus.map(keyOf));
  const last = placed[placed.length - 1];

  const cellStyle = (p: Place): CSSProperties => ({
    gridColumn: `${p.x - crop.minX + 1} / span ${spanOf(p.id)}`,
    gridRow: `${crop.maxY - p.y + 1}`,
    zIndex: p.y + 1,
  });

  return (
    <div
      className={`plate ${celebrating ? 'is-win' : ''} ${mini ? 'is-mini' : ''}`}
      style={
        {
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 0.62fr))`,
          ['--stud-x' as string]: `calc(100% / ${cols})`,
          ['--stud-y' as string]: `calc(100% / ${rows})`,
        } as CSSProperties
      }
    >
      {guides.map((p, i) =>
        placedKeys.has(keyOf(p)) ? null : (
          <div
            key={`g-${keyOf(p)}-${i}`}
            className={`plate-cell is-guide ${focusKeys.has(keyOf(p)) ? 'is-step' : ''}`}
            style={cellStyle(p)}
          >
            <BrickView id={p.id} />
          </div>
        ),
      )}
      {placed.map((p, i) => (
        <div
          key={`${keyOf(p)}-${i}`}
          className={`plate-cell is-on ${last === p ? 'is-pop' : ''}`}
          style={cellStyle(p)}
        >
          <BrickView id={p.id} />
        </div>
      ))}
      {ghost ? <div className="plate-cell is-ghost" style={cellStyle(ghost)} /> : null}
    </div>
  );
}
