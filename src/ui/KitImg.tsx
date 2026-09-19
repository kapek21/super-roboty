import type { CSSProperties } from 'react';
import { withBase } from './AssetImg';

export interface Crop {
  x: string;
  y: string;
  zoom: number;
}

interface Props {
  src: string;
  crop: Crop;
  fallback: string;
  className?: string;
}

export function KitImg({ src, crop, fallback, className }: Props): JSX.Element {
  return (
    <span
      className={`kit ${className ?? ''}`}
      style={
        {
          ['--kx']: crop.x,
          ['--ky']: crop.y,
          ['--kz']: String(crop.zoom),
        } as CSSProperties
      }
      title={fallback}
    >
      <img src={withBase(src)} alt="" draggable={false} />
    </span>
  );
}
