import { scramble } from './bricks';

export type Slot = 'leg_left' | 'leg_right' | 'torso' | 'head' | 'arm_left' | 'arm_right' | 'tail';

/** Jeden klocek na płytce. y=0 to ziemia. x od 1. */
export interface Place {
  id: string;
  x: number;
  y: number;
}

export interface ManualPage {
  title: string;
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

export const PLATE_COLS = 14;
export const PLATE_ROWS = 12;

/** Oryginalne przepisy. Kolejność jak w książeczkach 6+: podwozie, biodra, klatka, ramiona, hełm ze skosów. */
export const ROBOTS: readonly RobotDef[] = [
  {
    id: 'combiner',
    title: 'Zespół',
    file: '/assets/robots/robot_combiner.png',
    emoji: '🧩',
    walk: 'merge',
    pages: [
      {
        title: 'koła żółte',
        slot: 'leg_left',
        bricks: [P('black-round', 2, 0), P('black-round', 3, 0)],
        decoys: ['red-2x2', 'green-slope'],
      },
      {
        title: 'żółty wóz',
        slot: 'leg_left',
        bricks: [P('yellow-2x4', 2, 1), P('white-2x2', 2, 2), P('blue-2x2', 3, 2)],
        decoys: ['navy-2x4', 'white-round'],
      },
      {
        title: 'koła czerwone',
        slot: 'leg_right',
        bricks: [P('black-round', 5, 0), P('black-round', 6, 0)],
        decoys: ['yellow-2x2', 'blue-slope'],
      },
      {
        title: 'czerwony wóz',
        slot: 'leg_right',
        bricks: [P('red-2x4', 5, 1), P('white-2x2', 5, 2), P('red-2x2', 6, 2)],
        decoys: ['green-2x4', 'orange-2x2'],
      },
      {
        title: 'biodra',
        slot: 'torso',
        bricks: [P('navy-2x4', 3, 3), P('navy-2x2', 5, 3)],
        decoys: ['yellow-slope', 'green-2x2'],
      },
      {
        title: 'tułów',
        slot: 'torso',
        bricks: [
          P('white-2x4', 3, 4),
          P('white-2x2', 5, 4),
          P('blue-2x4', 3, 5),
          P('red-2x2', 5, 5),
        ],
        decoys: ['orange-2x2', 'green-2x4'],
      },
      {
        title: 'ramiona',
        slot: 'arm_left',
        bricks: [
          P('blue-2x2', 2, 4),
          P('black-round', 2, 5),
          P('green-2x2', 6, 4),
          P('black-round', 6, 5),
        ],
        decoys: ['yellow-2x4', 'red-slope'],
      },
      {
        title: 'hełm',
        slot: 'head',
        bricks: [
          P('yellow-slope', 2, 6),
          P('white-2x4', 3, 6),
          P('navy-2x2', 5, 6),
          P('yellow-slope-r', 6, 6),
          P('yellow-2x4', 3, 7),
          P('yellow-2x2', 5, 7),
          P('yellow-slope', 4, 8),
        ],
        decoys: ['green-slope', 'white-2x4'],
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
        title: 'niebieska noga',
        slot: 'leg_left',
        bricks: [
          P('blue-2x4', 2, 0),
          P('blue-2x2', 2, 1),
          P('white-2x2', 3, 1),
          P('blue-2x4', 2, 2),
        ],
        decoys: ['green-2x2', 'red-slope'],
      },
      {
        title: 'zielona noga',
        slot: 'leg_right',
        bricks: [
          P('green-2x4', 5, 0),
          P('green-2x2', 5, 1),
          P('white-2x2', 6, 1),
          P('green-2x4', 5, 2),
        ],
        decoys: ['blue-2x4', 'orange-2x2'],
      },
      {
        title: 'biodra',
        slot: 'torso',
        bricks: [P('navy-2x4', 3, 3), P('navy-2x2', 5, 3)],
        decoys: ['yellow-2x4', 'black-round'],
      },
      {
        title: 'klatka',
        slot: 'torso',
        bricks: [
          P('red-2x4', 3, 4),
          P('red-2x2', 5, 4),
          P('blue-2x2', 3, 5),
          P('white-2x2', 4, 5),
          P('yellow-2x2', 5, 5),
        ],
        decoys: ['green-2x4', 'navy-round'],
      },
      {
        title: 'lewe ramię',
        slot: 'arm_left',
        bricks: [P('navy-2x2', 2, 4), P('yellow-2x2', 2, 5), P('blue-2x2', 2, 6)],
        decoys: ['green-slope', 'white-2x4'],
      },
      {
        title: 'prawe ramię',
        slot: 'arm_right',
        bricks: [P('navy-2x2', 6, 4), P('red-2x2', 6, 5), P('green-2x2', 6, 6)],
        decoys: ['blue-slope', 'orange-slope'],
      },
      {
        title: 'hełm',
        slot: 'head',
        bricks: [
          P('blue-2x4', 3, 6),
          P('red-2x2', 5, 6),
          P('yellow-2x4', 3, 7),
          P('yellow-2x2', 5, 7),
          P('yellow-slope', 4, 8),
        ],
        decoys: ['black-2x2', 'green-2x2'],
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
        title: 'przednia stopa',
        slot: 'leg_left',
        bricks: [
          P('blue-2x2', 4, 0),
          P('white-2x2', 5, 0),
          P('navy-2x2', 4, 1),
          P('yellow-2x2', 5, 1),
          P('navy-2x4', 4, 2),
        ],
        decoys: ['green-2x4', 'red-2x4'],
      },
      {
        title: 'tylna noga',
        slot: 'leg_right',
        bricks: [
          P('blue-2x2', 7, 0),
          P('white-2x2', 8, 0),
          P('blue-2x2', 7, 1),
          P('yellow-2x2', 8, 1),
          P('yellow-2x2', 7, 2),
          P('red-2x2', 8, 2),
          P('green-2x2', 9, 2),
        ],
        decoys: ['white-round', 'navy-round'],
      },
      {
        title: 'brzuch',
        slot: 'torso',
        bricks: [
          P('red-2x4', 4, 3),
          P('yellow-2x4', 6, 3),
          P('green-2x2', 8, 3),
          P('red-2x2', 4, 4),
          P('yellow-2x4', 5, 4),
          P('red-2x2', 7, 4),
          P('green-2x2', 8, 4),
          P('blue-round', 4, 5),
          P('yellow-2x2', 5, 5),
          P('green-2x2', 6, 5),
        ],
        decoys: ['black-round', 'white-2x4'],
      },
      {
        title: 'ogon',
        slot: 'tail',
        bricks: [
          P('blue-2x4', 9, 3),
          P('green-2x2', 11, 3),
          P('blue-2x2', 9, 4),
          P('yellow-2x2', 10, 4),
          P('green-2x2', 11, 4),
          P('yellow-2x2', 12, 4),
          P('red-slope', 13, 4),
        ],
        decoys: ['navy-2x4', 'orange-2x2'],
      },
      {
        title: 'pazur',
        slot: 'arm_left',
        bricks: [P('white-2x2', 2, 3), P('navy-2x2', 3, 3), P('navy-2x2', 3, 4), P('white-2x2', 2, 4)],
        decoys: ['green-slope', 'yellow-2x4'],
      },
      {
        title: 'szczęka',
        slot: 'head',
        bricks: [
          P('white-2x4', 2, 6),
          P('blue-2x2', 4, 6),
          P('white-2x2', 2, 7),
          P('yellow-2x2', 3, 7),
          P('blue-2x2', 4, 7),
        ],
        decoys: ['red-2x4', 'black-2x2'],
      },
      {
        title: 'pysk',
        slot: 'head',
        bricks: [
          P('orange-2x2', 2, 8),
          P('yellow-2x2', 3, 8),
          P('red-2x2', 4, 8),
          P('orange-2x4', 2, 9),
          P('orange-slope', 4, 9),
        ],
        decoys: ['green-2x2', 'navy-2x2'],
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
        title: 'lewa noga',
        slot: 'leg_left',
        bricks: [
          P('navy-2x4', 3, 0),
          P('blue-2x2', 3, 1),
          P('navy-2x2', 4, 1),
          P('navy-2x4', 3, 2),
          P('navy-2x2', 4, 3),
        ],
        decoys: ['red-2x2', 'yellow-2x4'],
      },
      {
        title: 'prawa noga',
        slot: 'leg_right',
        bricks: [
          P('navy-2x4', 7, 0),
          P('blue-2x2', 7, 1),
          P('navy-2x2', 8, 1),
          P('navy-2x4', 7, 2),
          P('navy-2x2', 7, 3),
        ],
        decoys: ['green-2x2', 'white-2x2'],
      },
      {
        title: 'zbroja',
        slot: 'torso',
        bricks: [
          P('navy-2x4', 5, 3),
          P('blue-2x4', 5, 4),
          P('navy-2x2', 7, 4),
          P('navy-2x4', 5, 5),
          P('navy-2x2', 7, 5),
        ],
        decoys: ['orange-2x2', 'red-2x4'],
      },
      {
        title: 'lewe ramię',
        slot: 'arm_left',
        bricks: [
          P('navy-2x2', 3, 4),
          P('navy-2x2', 4, 4),
          P('navy-2x2', 3, 5),
          P('navy-2x2', 4, 5),
          P('navy-2x2', 3, 6),
          P('navy-2x2', 4, 6),
        ],
        decoys: ['green-2x4', 'yellow-slope'],
      },
      {
        title: 'prawe ramię',
        slot: 'arm_right',
        bricks: [
          P('navy-2x2', 8, 4),
          P('navy-2x2', 9, 4),
          P('navy-2x2', 8, 5),
          P('navy-2x2', 9, 5),
          P('navy-2x2', 8, 6),
        ],
        decoys: ['white-round', 'red-slope'],
      },
      {
        title: 'maska',
        slot: 'head',
        bricks: [
          P('navy-2x2', 5, 6),
          P('yellow-2x2', 6, 6),
          P('navy-2x2', 7, 6),
          P('navy-2x4', 5, 7),
          P('navy-2x2', 7, 7),
        ],
        decoys: ['white-2x4', 'blue-slope'],
      },
    ],
  },
  {
    id: 'small',
    title: 'Mały',
    file: '/assets/robots/robot_small.png',
    emoji: '🤖',
    walk: 'bounce',
    pages: [
      {
        title: 'lewa stopa',
        slot: 'leg_left',
        bricks: [P('blue-2x4', 4, 0), P('white-2x2', 4, 1), P('red-2x2', 5, 1), P('blue-2x2', 5, 2)],
        decoys: ['navy-2x2', 'green-slope'],
      },
      {
        title: 'prawa stopa',
        slot: 'leg_right',
        bricks: [P('blue-2x4', 7, 0), P('yellow-2x2', 7, 1), P('red-2x2', 8, 1), P('blue-2x2', 7, 2)],
        decoys: ['green-2x2', 'navy-2x4'],
      },
      {
        title: 'brzuch',
        slot: 'torso',
        bricks: [
          P('white-2x4', 5, 3),
          P('white-2x2', 7, 3),
          P('blue-2x2', 5, 4),
          P('yellow-2x2', 6, 4),
          P('blue-2x2', 7, 4),
          P('white-2x2', 6, 5),
        ],
        decoys: ['red-2x4', 'green-2x4'],
      },
      {
        title: 'rączki',
        slot: 'arm_left',
        bricks: [P('white-2x2', 4, 3), P('red-2x2', 4, 4), P('white-2x2', 8, 3), P('red-2x2', 8, 4)],
        decoys: ['navy-round', 'yellow-slope'],
      },
      {
        title: 'kask',
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
    id: 'large',
    title: 'Olbrzym',
    file: '/assets/robots/robot_large.png',
    emoji: '🦾',
    walk: 'heavy',
    pages: [
      {
        title: 'lewa stopa',
        slot: 'leg_left',
        bricks: [
          P('navy-2x4', 3, 0),
          P('yellow-2x4', 3, 1),
          P('blue-2x4', 3, 2),
          P('red-2x2', 3, 3),
          P('blue-2x2', 4, 3),
        ],
        decoys: ['green-2x2', 'white-round'],
      },
      {
        title: 'prawa stopa',
        slot: 'leg_right',
        bricks: [
          P('navy-2x4', 7, 0),
          P('yellow-2x4', 7, 1),
          P('navy-2x4', 7, 2),
          P('blue-2x2', 7, 3),
          P('yellow-2x2', 8, 3),
        ],
        decoys: ['red-slope', 'white-2x2'],
      },
      {
        title: 'klatka',
        slot: 'torso',
        bricks: [
          P('blue-2x4', 5, 3),
          P('white-2x4', 5, 4),
          P('white-2x2', 7, 4),
          P('red-2x2', 5, 5),
          P('yellow-2x2', 6, 5),
          P('blue-2x2', 7, 5),
        ],
        decoys: ['green-2x4', 'orange-2x4'],
      },
      {
        title: 'lewe ramię',
        slot: 'arm_left',
        bricks: [P('navy-2x4', 3, 4), P('red-2x2', 3, 5), P('navy-2x2', 4, 5), P('yellow-2x2', 3, 6)],
        decoys: ['green-slope', 'white-2x4'],
      },
      {
        title: 'prawe ramię',
        slot: 'arm_right',
        bricks: [P('navy-2x4', 8, 4), P('navy-2x2', 8, 5), P('red-2x2', 9, 5), P('yellow-2x2', 8, 6)],
        decoys: ['blue-slope', 'green-2x2'],
      },
      {
        title: 'głowa',
        slot: 'head',
        bricks: [
          P('navy-2x4', 4, 6),
          P('navy-2x4', 6, 6),
          P('yellow-2x2', 4, 7),
          P('blue-2x2', 5, 7),
          P('yellow-2x2', 6, 7),
          P('navy-2x2', 7, 7),
          P('navy-2x2', 5, 8),
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
  return scramble([...new Set([...idsOf(page), ...page.decoys])], page.title);
}

export function bagFor(page: ManualPage): Array<{ id: string; qty: number }> {
  const map = new Map<string, number>();
  for (const b of page.bricks) map.set(b.id, (map.get(b.id) ?? 0) + 1);
  return scramble(
    [...map.entries()].map(([id, qty]) => ({ id, qty })),
    `bag-${page.title}`,
  );
}
