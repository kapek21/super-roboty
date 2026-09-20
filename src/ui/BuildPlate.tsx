import { brickOf } from '../bricks';
import { PLATE_COLS, PLATE_ROWS, type Place } from '../robots';
import { BrickView } from './BrickView';

interface Props {
  placed: Place[];
  ghost: Place | null;
  celebrating: boolean;
}

export function BuildPlate({ placed, ghost, celebrating }: Props): JSX.Element {
  return (
    <div
      className={`plate ${celebrating ? 'is-win' : ''}`}
      style={{
        gridTemplateColumns: `repeat(${PLATE_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${PLATE_ROWS}, 1fr)`,
      }}
    >
      {placed.map((p, i) => {
        const span = brickOf(p.id).studs === 4 ? 2 : 1;
        return (
          <div
            key={`${p.id}-${p.x}-${p.y}-${i}`}
            className="plate-cell is-on"
            style={{
              gridColumn: `${p.x} / span ${span}`,
              gridRow: `${PLATE_ROWS - p.y}`,
            }}
          >
            <BrickView id={p.id} />
          </div>
        );
      })}
      {ghost ? (
        <div
          className="plate-cell is-ghost"
          style={{
            gridColumn: `${ghost.x} / span ${brickOf(ghost.id).studs === 4 ? 2 : 1}`,
            gridRow: `${PLATE_ROWS - ghost.y}`,
          }}
        />
      ) : null}
    </div>
  );
}
