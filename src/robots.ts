import { scramble } from './bricks';

export type Slot = 'leg_left' | 'leg_right' | 'torso' | 'head' | 'arm_left' | 'arm_right' | 'tail';

export const SLOT_EMOJI: Record<Slot, string> = {
  leg_left: '🦵',
  leg_right: '🦵',
  torso: '📦',
  head: '🙂',
  arm_left: '💪',
  arm_right: '💪',
  tail: '🦕',
};

/** Jeden klocek na płytce. y=0 to ziemia. */
export interface Place {
  id: string;
  x: number;
  y: number;
}

export interface ManualPage {
  slot: Slot;
  bricks: Place[];
  decoys: string[];
}

export interface RobotDef {
  id: string;
  file: string;
  emoji: string;
  pages: ManualPage[];
  walk: 'bounce' | 'pose' | 'slash' | 'stomp' | 'merge' | 'heavy';
}

const P = (id: string, x: number, y: number): Place => ({ id, x, y });

export const PLATE_COLS = 8;
export const PLATE_ROWS = 7;

export const ROBOTS: readonly RobotDef[] = [
  {
    id: 'small',
    file: '/assets/robots/robot_small.png',
    emoji: '🤖',
    walk: 'bounce',
    pages: [
      {
        slot: 'leg_left',
        bricks: [P('blue-2x2', 2, 0), P('red-2x2', 2, 1), P('blue-2x4', 2, 2)],
        decoys: ['navy-2x2', 'yellow-slope'],
      },
      {
        slot: 'leg_right',
        bricks: [P('blue-2x2', 6, 0), P('yellow-2x2', 6, 1), P('blue-2x4', 5, 2)],
        decoys: ['green-2x2', 'red-slope'],
      },
      {
        slot: 'torso',
        bricks: [P('red-2x4', 3, 3), P('white-2x2', 4, 4), P('yellow-2x2', 4, 5)],
        decoys: ['navy-2x4', 'green-2x2'],
      },
      {
        slot: 'head',
        bricks: [P('white-round', 4, 6), P('blue-2x2', 3, 6), P('yellow-2x2', 5, 6)],
        decoys: ['red-2x2', 'navy-2x2'],
      },
    ],
  },
  {
    id: 'ranger',
    file: '/assets/robots/robot_ranger_colorful.png',
    emoji: '🦸',
    walk: 'pose',
    pages: [
      {
        slot: 'leg_left',
        bricks: [P('blue-2x4', 1, 0), P('white-2x2', 2, 1), P('yellow-2x2', 2, 2)],
        decoys: ['green-2x4', 'navy-2x2'],
      },
      {
        slot: 'leg_right',
        bricks: [P('green-2x4', 5, 0), P('white-2x2', 6, 1), P('green-2x2', 6, 2)],
        decoys: ['blue-2x4', 'red-2x2'],
      },
      {
        slot: 'torso',
        bricks: [P('blue-2x2', 4, 3), P('red-2x4', 3, 4), P('yellow-2x2', 4, 5)],
        decoys: ['navy-2x4', 'white-round'],
      },
      {
        slot: 'arm_left',
        bricks: [P('blue-2x4', 1, 4), P('yellow-2x2', 1, 5), P('blue-2x2', 1, 3)],
        decoys: ['green-2x2', 'red-slope'],
      },
      {
        slot: 'head',
        bricks: [P('yellow-slope', 4, 6), P('blue-2x2', 3, 6), P('red-2x2', 5, 6)],
        decoys: ['green-slope', 'white-2x2'],
      },
    ],
  },
  {
    id: 'ninja',
    file: '/assets/robots/robot_ninja.png',
    emoji: '🥷',
    walk: 'slash',
    pages: [
      {
        slot: 'leg_left',
        bricks: [P('navy-2x2', 2, 0), P('navy-2x4', 1, 1), P('blue-2x2', 2, 2)],
        decoys: ['red-2x2', 'yellow-2x4'],
      },
      {
        slot: 'leg_right',
        bricks: [P('navy-2x2', 6, 0), P('navy-2x4', 5, 1), P('navy-2x2', 6, 2)],
        decoys: ['green-2x2', 'white-2x2'],
      },
      {
        slot: 'torso',
        bricks: [P('navy-2x4', 3, 3), P('blue-2x2', 4, 4), P('navy-2x4', 3, 5)],
        decoys: ['red-2x4', 'yellow-2x2'],
      },
      {
        slot: 'head',
        bricks: [P('navy-2x4', 3, 6), P('yellow-2x2', 5, 6), P('navy-2x2', 5, 5)],
        decoys: ['white-round', 'red-slope'],
      },
      {
        slot: 'arm_left',
        bricks: [P('navy-2x2', 1, 3), P('blue-2x4', 1, 4), P('navy-2x2', 1, 5)],
        decoys: ['green-2x4', 'yellow-slope'],
      },
    ],
  },
  {
    id: 'dino',
    file: '/assets/robots/robot_dino_mecha.png',
    emoji: '🦕',
    walk: 'stomp',
    pages: [
      {
        slot: 'leg_left',
        bricks: [P('navy-2x2', 2, 0), P('yellow-2x4', 1, 1), P('navy-2x2', 2, 2)],
        decoys: ['red-2x2', 'white-2x2'],
      },
      {
        slot: 'leg_right',
        bricks: [P('navy-2x2', 4, 0), P('blue-2x4', 3, 1), P('navy-2x2', 4, 2)],
        decoys: ['green-2x2', 'yellow-slope'],
      },
      {
        slot: 'torso',
        bricks: [P('red-2x4', 2, 3), P('yellow-2x2', 3, 4), P('blue-2x4', 2, 5)],
        decoys: ['white-round', 'green-2x4'],
      },
      {
        slot: 'tail',
        bricks: [P('green-2x2', 5, 3), P('yellow-2x4', 5, 4), P('red-slope', 7, 4)],
        decoys: ['blue-slope', 'navy-2x4'],
      },
      {
        slot: 'head',
        bricks: [P('white-2x2', 1, 4), P('red-2x2', 1, 5), P('yellow-2x2', 1, 6)],
        decoys: ['navy-2x2', 'green-slope'],
      },
    ],
  },
  {
    id: 'combiner',
    file: '/assets/robots/robot_combiner.png',
    emoji: '🧩',
    walk: 'merge',
    pages: [
      {
        slot: 'leg_left',
        bricks: [P('yellow-2x4', 1, 0), P('blue-2x2', 2, 1), P('yellow-2x4', 1, 2)],
        decoys: ['red-2x4', 'navy-2x2'],
      },
      {
        slot: 'leg_right',
        bricks: [P('red-2x4', 5, 0), P('navy-2x2', 6, 1), P('red-2x4', 5, 2)],
        decoys: ['green-2x4', 'white-2x2'],
      },
      {
        slot: 'torso',
        bricks: [P('blue-2x2', 4, 3), P('red-2x4', 3, 4), P('white-2x2', 4, 5)],
        decoys: ['green-2x2', 'yellow-slope'],
      },
      {
        slot: 'arm_left',
        bricks: [P('blue-2x4', 1, 4), P('white-2x2', 1, 5), P('blue-2x4', 1, 3)],
        decoys: ['navy-2x4', 'red-2x2'],
      },
      {
        slot: 'arm_right',
        bricks: [P('green-2x4', 6, 4), P('white-2x2', 7, 5), P('green-2x4', 6, 3)],
        decoys: ['yellow-2x2', 'red-slope'],
      },
      {
        slot: 'head',
        bricks: [P('red-2x2', 4, 6), P('blue-2x2', 3, 6), P('yellow-2x2', 5, 6)],
        decoys: ['navy-2x2', 'green-slope'],
      },
    ],
  },
  {
    id: 'large',
    file: '/assets/robots/robot_large.png',
    emoji: '🦾',
    walk: 'heavy',
    pages: [
      {
        slot: 'leg_left',
        bricks: [P('navy-2x4', 1, 0), P('yellow-2x2', 2, 1), P('blue-2x4', 1, 2)],
        decoys: ['red-2x2', 'green-2x2'],
      },
      {
        slot: 'leg_right',
        bricks: [P('navy-2x4', 5, 0), P('yellow-2x2', 6, 1), P('navy-2x4', 5, 2)],
        decoys: ['white-2x2', 'red-slope'],
      },
      {
        slot: 'torso',
        bricks: [P('blue-2x4', 3, 3), P('white-2x2', 4, 4), P('yellow-2x2', 4, 5)],
        decoys: ['green-2x4', 'red-2x4'],
      },
      {
        slot: 'arm_left',
        bricks: [P('navy-2x2', 1, 3), P('red-2x4', 1, 4), P('yellow-2x2', 1, 5)],
        decoys: ['green-slope', 'white-round'],
      },
      {
        slot: 'head',
        bricks: [P('navy-2x4', 3, 6), P('blue-2x2', 5, 6), P('yellow-2x2', 5, 5)],
        decoys: ['red-2x2', 'green-2x2'],
      },
    ],
  },
];

export function idsOf(page: ManualPage): string[] {
  return page.bricks.map((b) => b.id);
}

export function bankFor(page: ManualPage): string[] {
  return scramble([...new Set([...idsOf(page), ...page.decoys])], page.slot);
}

export function bagFor(page: ManualPage): Array<{ id: string; qty: number }> {
  const map = new Map<string, number>();
  for (const b of page.bricks) map.set(b.id, (map.get(b.id) ?? 0) + 1);
  return scramble(
    [...map.entries()].map(([id, qty]) => ({ id, qty })),
    `bag-${page.slot}`,
  );
}
