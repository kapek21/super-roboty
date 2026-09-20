export type BrickKind = 'brick' | 'slope' | 'round';

export interface BrickDef {
  id: string;
  color: string;
  studs: 2 | 4;
  kind: BrickKind;
}

export const BRICKS: Record<string, BrickDef> = {
  'navy-2x2': { id: 'navy-2x2', color: '#102870', studs: 2, kind: 'brick' },
  'navy-2x4': { id: 'navy-2x4', color: '#102870', studs: 4, kind: 'brick' },
  'blue-2x2': { id: 'blue-2x2', color: '#5c94fc', studs: 2, kind: 'brick' },
  'blue-2x4': { id: 'blue-2x4', color: '#5c94fc', studs: 4, kind: 'brick' },
  'yellow-2x2': { id: 'yellow-2x2', color: '#fce874', studs: 2, kind: 'brick' },
  'yellow-2x4': { id: 'yellow-2x4', color: '#fce874', studs: 4, kind: 'brick' },
  'red-2x2': { id: 'red-2x2', color: '#e40058', studs: 2, kind: 'brick' },
  'red-2x4': { id: 'red-2x4', color: '#e40058', studs: 4, kind: 'brick' },
  'green-2x2': { id: 'green-2x2', color: '#40e878', studs: 2, kind: 'brick' },
  'green-2x4': { id: 'green-2x4', color: '#40e878', studs: 4, kind: 'brick' },
  'white-2x2': { id: 'white-2x2', color: '#fcfcfc', studs: 2, kind: 'brick' },
  'white-2x4': { id: 'white-2x4', color: '#fcfcfc', studs: 4, kind: 'brick' },
  'white-round': { id: 'white-round', color: '#fcfcfc', studs: 2, kind: 'round' },
  'orange-2x2': { id: 'orange-2x2', color: '#f5a03a', studs: 2, kind: 'brick' },
  'orange-2x4': { id: 'orange-2x4', color: '#f5a03a', studs: 4, kind: 'brick' },
  'yellow-slope': { id: 'yellow-slope', color: '#fce874', studs: 2, kind: 'slope' },
  'red-slope': { id: 'red-slope', color: '#e40058', studs: 2, kind: 'slope' },
  'green-slope': { id: 'green-slope', color: '#40e878', studs: 2, kind: 'slope' },
  'blue-slope': { id: 'blue-slope', color: '#5c94fc', studs: 2, kind: 'slope' },
};

export function brickOf(id: string): BrickDef {
  const b = BRICKS[id];
  if (!b) throw new Error(`Nieznany klocek ${id}`);
  return b;
}

export function countsOf(ids: readonly string[]): Array<{ id: string; qty: number }> {
  const map = new Map<string, number>();
  for (const id of ids) map.set(id, (map.get(id) ?? 0) + 1);
  return [...map.entries()].map(([id, qty]) => ({ id, qty }));
}

/** Tasowanie, żeby woreczek nie zdradzał kolejności budowania. */
export function scramble<T>(items: readonly T[], seed: string): T[] {
  const arr = [...items];
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h ^= seed.charCodeAt(i) * (i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    h = (Math.imul(h, 16777619) + 1013904223) | 0;
    const j = Math.abs(h) % (i + 1);
    const a = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = a;
  }
  return arr;
}
