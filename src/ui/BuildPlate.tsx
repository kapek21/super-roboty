import type { CSSProperties } from 'react';
import { brickOf } from '../bricks';
import { PLATE_COLS, PLATE_ROWS, type Place } from '../robots';
import { BrickView } from './BrickView';

interface Props {
  placed: Place[];
  ghost?: Place | null;
  guides?: Place[];
  celebrating?: boolean;
  mini?: boolean;
}

function spanOf(id: string): number {
  return brickOf(id).studs === 4 ? 2 : 1;
}

function cellStyle(p: Place): CSSProperties {
  return {
    gridColumn: `${p.x} / span ${spanOf(p.id)}`,
    gridRow: `${PLATE_ROWS - p.y}`,
  };
}

export function BuildPlate({
  placed,
  ghost = null,
  guides = [],
  celebrating = false,
  mini = false,
}: Props): JSX.Element {
  const placedKeys = new Set(placed.map((p) => `${p.id}-${p.x}-${p.y}`));
  return (
    <div
      className={`plate ${celebrating ? 'is-win' : ''} ${mini ? 'is-mini' : ''}`}
      style={{
        gridTemplateColumns: `repeat(${PLATE_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${PLATE_ROWS}, 1fr)`,
      }}
    >
      {guides.map((p, i) =>
        placedKeys.has(`${p.id}-${p.x}-${p.y}`) ? null : (
          <div key={`g-${p.id}-${p.x}-${p.y}-${i}`} className="plate-cell is-guide" style={cellStyle(p)}>
            <BrickView id={p.id} />
          </div>
        ),
      )}
      {placed.map((p, i) => (
        <div key={`${p.id}-${p.x}-${p.y}-${i}`} className="plate-cell is-on" style={cellStyle(p)}>
          <BrickView id={p.id} />
        </div>
      ))}
      {ghost ? <div className="plate-cell is-ghost" style={cellStyle(ghost)} /> : null}
    </div>
  );
}
