import { scramble } from './bricks';

export type Slot = 'leg_left' | 'leg_right' | 'torso' | 'head' | 'arm_left' | 'arm_right' | 'tail';

export const SLOT_LABEL: Record<Slot, string> = {
  leg_left: 'noga',
  leg_right: 'noga',
  torso: 'tułów',
  head: 'głowa',
  arm_left: 'ręka',
  arm_right: 'ręka',
  tail: 'ogon',
};

/** Jeden klocek na płytce. y=0 to ziemia. x od 1. */
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
  title: string;
  file: string;
  emoji: string;
  pages: ManualPage[];
  walk: 'bounce' | 'pose' | 'slash' | 'stomp' | 'merge' | 'heavy';
}

const P = (id: string, x: number, y: number): Place => ({ id, x, y });

export const PLATE_COLS = 12;
export const PLATE_ROWS = 10;

export const ROBOTS: readonly RobotDef[] = [
  {
    id: 'small',
    title: 'Mały',
    file: '/assets/robots/robot_small.png',
    emoji: '🤖',
    walk: 'bounce',
    pages: [
      {
        slot: 'leg_left',
        bricks: [P('blue-2x4', 3, 0), P('white-2x2', 3, 1), P('red-2x2', 4, 1), P('blue-2x2', 4, 2)],
        decoys: ['navy-2x2', 'green-slope'],
      },
      {
        slot: 'leg_right',
        bricks: [P('blue-2x4', 7, 0), P('yellow-2x2', 8, 1), P('red-2x2', 9, 1), P('blue-2x2', 8, 2)],
        decoys: ['green-2x2', 'navy-2x4'],
      },
      {
        slot: 'torso',
        bricks: [
          P('white-2x4', 5, 3),
          P('blue-2x2', 5, 4),
          P('yellow-2x2', 6, 4),
          P('blue-2x2', 7, 4),
          P('white-2x2', 6, 5),
        ],
        decoys: ['red-2x4', 'green-2x4'],
      },
      {
        slot: 'arm_left',
        bricks: [P('white-2x2', 3, 3), P('red-2x2', 3, 4), P('white-2x2', 9, 3), P('red-2x2', 9, 4)],
        decoys: ['navy-2x2', 'yellow-slope'],
      },
      {
        slot: 'head',
        bricks: [
          P('white-2x4', 5, 6),
          P('white-2x2', 7, 6),
          P('red-2x2', 4, 7),
          P('white-2x2', 5, 7),
          P('navy-2x2', 6, 7),
          P('white-2x2', 7, 7),
          P('red-2x2', 8, 7),
          P('yellow-2x2', 6, 8),
        ],
        decoys: ['orange-2x2', 'green-2x2'],
      },
    ],
  },
  {
    id: 'ranger',
    title: 'Strażnik',
    file: '/assets/robots/robot_ranger_colorful.png',
    emoji: '🦸',
    walk: 'pose',
    pages: [
      {
        slot: 'leg_left',
        bricks: [
          P('blue-2x4', 2, 0),
          P('blue-2x2', 2, 1),
          P('white-2x2', 3, 1),
          P('blue-2x2', 2, 2),
          P('yellow-2x2', 3, 2),
          P('blue-2x4', 2, 3),
        ],
        decoys: ['green-2x4', 'navy-2x2'],
      },
      {
        slot: 'leg_right',
        bricks: [
          P('green-2x4', 8, 0),
          P('green-2x2', 8, 1),
          P('white-2x2', 9, 1),
          P('white-2x2', 8, 2),
          P('green-2x2', 9, 2),
          P('green-2x4', 8, 3),
        ],
        decoys: ['blue-2x4', 'red-2x2'],
      },
      {
        slot: 'torso',
        bricks: [
          P('navy-2x4', 5, 3),
          P('navy-2x2', 7, 3),
          P('red-2x4', 5, 4),
          P('blue-2x2', 5, 5),
          P('white-2x2', 6, 5),
          P('red-2x2', 7, 5),
        ],
        decoys: ['yellow-2x4', 'white-round'],
      },
      {
        slot: 'arm_left',
        bricks: [P('blue-2x4', 2, 4), P('yellow-2x2', 2, 5), P('navy-2x2', 3, 5), P('blue-2x2', 2, 6)],
        decoys: ['green-2x2', 'red-slope'],
      },
      {
        slot: 'arm_right',
        bricks: [P('green-2x4', 9, 4), P('red-2x2', 9, 5), P('yellow-2x2', 10, 5), P('navy-2x2', 10, 6)],
        decoys: ['blue-slope', 'white-2x2'],
      },
      {
        slot: 'head',
        bricks: [
          P('blue-2x2', 5, 6),
          P('white-2x2', 6, 6),
          P('red-2x2', 7, 6),
          P('blue-2x2', 5, 7),
          P('yellow-slope', 6, 7),
          P('red-2x2', 7, 7),
          P('yellow-2x2', 6, 8),
        ],
        decoys: ['green-slope', 'orange-2x2'],
      },
    ],
  },
  {
    id: 'ninja',
    title: 'Ninja',
    file: '/assets/robots/robot_ninja.png',
    emoji: '🥷',
    walk: 'slash',
    pages: [
      {
        slot: 'leg_left',
        bricks: [
          P('navy-2x4', 2, 0),
          P('blue-2x2', 2, 1),
          P('navy-2x2', 3, 1),
          P('navy-2x4', 2, 2),
          P('navy-2x2', 3, 3),
        ],
        decoys: ['red-2x2', 'yellow-2x4'],
      },
      {
        slot: 'leg_right',
        bricks: [
          P('navy-2x4', 8, 0),
          P('blue-2x2', 8, 1),
          P('navy-2x2', 9, 1),
          P('navy-2x4', 8, 2),
          P('navy-2x2', 8, 3),
        ],
        decoys: ['green-2x2', 'white-2x2'],
      },
      {
        slot: 'torso',
        bricks: [P('navy-2x4', 5, 3), P('blue-2x4', 5, 4), P('navy-2x4', 5, 5), P('blue-2x2', 7, 4)],
        decoys: ['red-2x4', 'orange-2x2'],
      },
      {
        slot: 'arm_left',
        bricks: [P('navy-2x2', 1, 3), P('navy-2x2', 2, 3), P('navy-2x4', 1, 4), P('navy-2x2', 2, 5)],
        decoys: ['green-2x4', 'yellow-slope'],
      },
      {
        slot: 'arm_right',
        bricks: [P('navy-2x2', 10, 3), P('navy-2x2', 11, 3), P('navy-2x4', 9, 4), P('navy-2x2', 10, 5)],
        decoys: ['white-round', 'red-slope'],
      },
      {
        slot: 'head',
        bricks: [
          P('navy-2x2', 5, 6),
          P('yellow-2x2', 6, 6),
          P('navy-2x2', 7, 6),
          P('navy-2x2', 8, 6),
          P('navy-2x4', 5, 7),
          P('navy-2x4', 8, 7),
        ],
        decoys: ['white-2x4', 'blue-slope'],
      },
    ],
  },
  {
    id: 'dino',
    title: 'Dinozaur',
    file: '/assets/robots/robot_dino_mecha.png',
    emoji: '🦕',
    walk: 'stomp',
    pages: [
      {
        slot: 'leg_left',
        bricks: [
          P('blue-2x2', 3, 0),
          P('white-2x2', 4, 0),
          P('navy-2x2', 3, 1),
          P('yellow-2x2', 4, 1),
          P('navy-2x4', 3, 2),
        ],
        decoys: ['green-2x2', 'red-2x4'],
      },
      {
        slot: 'leg_right',
        bricks: [
          P('blue-2x2', 6, 0),
          P('white-2x2', 7, 0),
          P('blue-2x2', 6, 1),
          P('yellow-2x2', 7, 1),
          P('yellow-2x2', 6, 2),
          P('red-2x2', 7, 2),
          P('green-2x2', 8, 2),
        ],
        decoys: ['navy-2x2', 'white-round'],
      },
      {
        slot: 'torso',
        bricks: [
          P('red-2x4', 3, 3),
          P('red-2x2', 3, 4),
          P('yellow-2x4', 4, 4),
          P('red-2x2', 6, 4),
          P('blue-2x2', 3, 5),
          P('yellow-2x2', 4, 5),
          P('green-2x2', 5, 5),
        ],
        decoys: ['white-2x4', 'navy-2x4'],
      },
      {
        slot: 'tail',
        bricks: [
          P('blue-2x4', 8, 3),
          P('green-2x2', 10, 3),
          P('blue-2x2', 8, 4),
          P('yellow-2x2', 9, 4),
          P('yellow-2x2', 10, 4),
          P('red-slope', 11, 4),
        ],
        decoys: ['blue-slope', 'white-2x2'],
      },
      {
        slot: 'arm_left',
        bricks: [P('white-2x2', 1, 3), P('navy-2x2', 2, 3), P('navy-2x2', 2, 4)],
        decoys: ['green-slope', 'yellow-2x4'],
      },
      {
        slot: 'head',
        bricks: [
          P('white-2x4', 1, 6),
          P('blue-2x2', 3, 6),
          P('white-2x2', 1, 7),
          P('yellow-2x2', 2, 7),
          P('blue-2x2', 3, 7),
          P('orange-2x2', 1, 8),
          P('yellow-2x2', 2, 8),
          P('red-2x2', 3, 8),
          P('orange-2x4', 1, 9),
        ],
        decoys: ['green-2x4', 'navy-2x2'],
      },
    ],
  },
  {
    id: 'combiner',
    title: 'Zespół',
    file: '/assets/robots/robot_combiner.png',
    emoji: '🧩',
    walk: 'merge',
    pages: [
      {
        slot: 'leg_left',
        bricks: [
          P('white-2x2', 2, 0),
          P('blue-2x2', 3, 0),
          P('navy-2x2', 4, 0),
          P('yellow-2x4', 2, 1),
          P('navy-2x2', 4, 1),
          P('yellow-2x4', 2, 2),
          P('navy-2x2', 4, 2),
          P('yellow-2x4', 2, 3),
        ],
        decoys: ['red-2x4', 'green-2x2'],
      },
      {
        slot: 'leg_right',
        bricks: [
          P('red-2x4', 8, 0),
          P('navy-2x2', 10, 0),
          P('red-2x4', 8, 1),
          P('navy-2x2', 10, 1),
          P('red-2x2', 8, 2),
          P('white-2x2', 9, 2),
          P('navy-2x2', 10, 2),
          P('red-2x4', 8, 3),
        ],
        decoys: ['yellow-2x4', 'blue-slope'],
      },
      {
        slot: 'torso',
        bricks: [
          P('navy-2x4', 5, 3),
          P('white-2x4', 5, 4),
          P('blue-2x2', 5, 5),
          P('red-2x2', 6, 5),
          P('blue-2x2', 7, 5),
        ],
        decoys: ['green-2x4', 'orange-2x2'],
      },
      {
        slot: 'arm_left',
        bricks: [P('white-2x2', 1, 4), P('blue-2x4', 2, 4), P('blue-2x4', 1, 5), P('navy-2x2', 2, 6)],
        decoys: ['red-2x2', 'yellow-slope'],
      },
      {
        slot: 'arm_right',
        bricks: [P('green-2x4', 9, 4), P('white-2x2', 11, 4), P('green-2x4', 9, 5), P('navy-2x2', 10, 6)],
        decoys: ['yellow-2x2', 'red-slope'],
      },
      {
        slot: 'head',
        bricks: [P('blue-2x2', 5, 6), P('red-2x2', 6, 6), P('blue-2x2', 7, 6), P('yellow-2x2', 6, 7)],
        decoys: ['navy-2x4', 'green-slope'],
      },
    ],
  },
  {
    id: 'large',
    title: 'Olbrzym',
    file: '/assets/robots/robot_large.png',
    emoji: '🦾',
    walk: 'heavy',
    pages: [
      {
        slot: 'leg_left',
        bricks: [
          P('navy-2x4', 2, 0),
          P('yellow-2x4', 2, 1),
          P('blue-2x4', 2, 2),
          P('red-2x2', 2, 3),
          P('blue-2x2', 3, 3),
        ],
        decoys: ['green-2x2', 'white-round'],
      },
      {
        slot: 'leg_right',
        bricks: [
          P('navy-2x4', 8, 0),
          P('yellow-2x4', 8, 1),
          P('navy-2x4', 8, 2),
          P('blue-2x2', 8, 3),
          P('yellow-2x2', 9, 3),
        ],
        decoys: ['red-slope', 'white-2x2'],
      },
      {
        slot: 'torso',
        bricks: [
          P('blue-2x4', 5, 3),
          P('white-2x4', 5, 4),
          P('red-2x2', 5, 5),
          P('yellow-2x2', 6, 5),
          P('blue-2x2', 7, 5),
        ],
        decoys: ['green-2x4', 'orange-2x4'],
      },
      {
        slot: 'arm_left',
        bricks: [P('navy-2x4', 1, 4), P('red-2x2', 1, 5), P('navy-2x2', 2, 5), P('yellow-2x2', 1, 6)],
        decoys: ['green-slope', 'white-2x4'],
      },
      {
        slot: 'arm_right',
        bricks: [P('navy-2x4', 9, 4), P('navy-2x2', 9, 5), P('red-2x2', 10, 5), P('yellow-2x2', 10, 6)],
        decoys: ['blue-slope', 'green-2x2'],
      },
      {
        slot: 'head',
        bricks: [
          P('navy-2x4', 5, 6),
          P('yellow-2x2', 5, 7),
          P('blue-2x2', 6, 7),
          P('yellow-2x2', 7, 7),
          P('navy-2x2', 6, 8),
        ],
        decoys: ['red-2x2', 'orange-2x2'],
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
