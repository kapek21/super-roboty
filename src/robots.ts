import type { Crop } from './ui/KitImg';
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

export type FailKind = 'order' | 'wrong-kit' | 'missing';

export const FAIL_FACE: Record<FailKind, string> = {
  order: '💥',
  'wrong-kit': '❌',
  missing: '❓',
};

export interface ManualPage {
  slot: Slot;
  /** Od dołu do góry — jak w instrukcji: najpierw stopa, potem kolano, potem biodro. */
  bricks: string[];
  decoys: string[];
}

export interface RobotDef {
  id: string;
  file: string;
  emoji: string;
  pages: ManualPage[];
  crops: Partial<Record<Slot, Crop>>;
  walk: 'bounce' | 'pose' | 'slash' | 'stomp' | 'merge' | 'heavy';
}

const C = (x: string, y: string, zoom: number): Crop => ({ x, y, zoom });

export const ROBOTS: readonly RobotDef[] = [
  {
    id: 'small',
    file: '/assets/robots/robot_small.png',
    emoji: '🤖',
    walk: 'bounce',
    crops: {
      head: C('50%', '12%', 2.7),
      torso: C('50%', '48%', 2.5),
      leg_left: C('32%', '90%', 3),
      leg_right: C('70%', '90%', 3),
    },
    pages: [
      { slot: 'leg_left', bricks: ['blue-2x2', 'red-2x2', 'blue-2x4'], decoys: ['navy-2x2', 'yellow-slope'] },
      { slot: 'leg_right', bricks: ['blue-2x2', 'yellow-2x2', 'blue-2x4'], decoys: ['green-2x2', 'red-slope'] },
      { slot: 'torso', bricks: ['white-2x2', 'yellow-2x2', 'red-2x4'], decoys: ['navy-2x4', 'green-2x2'] },
      { slot: 'head', bricks: ['white-round', 'blue-2x2', 'yellow-2x2'], decoys: ['red-2x2', 'navy-2x2'] },
    ],
  },
  {
    id: 'ranger',
    file: '/assets/robots/robot_ranger_colorful.png',
    emoji: '🦸',
    walk: 'pose',
    crops: {
      head: C('50%', '6%', 3.1),
      torso: C('50%', '32%', 2.4),
      arm_left: C('12%', '28%', 2.8),
      arm_right: C('88%', '32%', 2.8),
      leg_left: C('28%', '88%', 2.8),
      leg_right: C('72%', '88%', 2.8),
    },
    pages: [
      { slot: 'leg_left', bricks: ['blue-2x4', 'white-2x2', 'yellow-2x2'], decoys: ['green-2x4', 'navy-2x2'] },
      { slot: 'leg_right', bricks: ['green-2x4', 'white-2x2', 'green-2x2'], decoys: ['blue-2x4', 'red-2x2'] },
      { slot: 'torso', bricks: ['blue-2x2', 'red-2x4', 'yellow-2x2'], decoys: ['navy-2x4', 'white-round'] },
      { slot: 'arm_left', bricks: ['blue-2x4', 'yellow-2x2', 'blue-2x2'], decoys: ['green-2x2', 'red-slope'] },
      { slot: 'head', bricks: ['yellow-slope', 'blue-2x2', 'red-2x2'], decoys: ['green-slope', 'white-2x2'] },
    ],
  },
  {
    id: 'ninja',
    file: '/assets/robots/robot_ninja.png',
    emoji: '🥷',
    walk: 'slash',
    crops: {
      head: C('48%', '8%', 3.1),
      torso: C('50%', '40%', 2.4),
      arm_left: C('12%', '40%', 2.8),
      arm_right: C('88%', '40%', 2.8),
      leg_left: C('30%', '90%', 2.8),
      leg_right: C('70%', '90%', 2.8),
    },
    pages: [
      { slot: 'leg_left', bricks: ['navy-2x2', 'navy-2x4', 'blue-2x2'], decoys: ['red-2x2', 'yellow-2x4'] },
      { slot: 'leg_right', bricks: ['navy-2x2', 'navy-2x4', 'navy-2x2'], decoys: ['green-2x2', 'white-2x2'] },
      { slot: 'torso', bricks: ['navy-2x4', 'blue-2x2', 'navy-2x4'], decoys: ['red-2x4', 'yellow-2x2'] },
      { slot: 'head', bricks: ['navy-2x4', 'yellow-2x2', 'navy-2x2'], decoys: ['white-round', 'red-slope'] },
      { slot: 'arm_left', bricks: ['navy-2x2', 'blue-2x4', 'navy-2x2'], decoys: ['green-2x4', 'yellow-slope'] },
    ],
  },
  {
    id: 'dino',
    file: '/assets/robots/robot_dino_mecha.png',
    emoji: '🦕',
    walk: 'stomp',
    crops: {
      head: C('18%', '28%', 2.8),
      torso: C('48%', '48%', 2.3),
      leg_left: C('30%', '88%', 3),
      leg_right: C('58%', '90%', 3),
      tail: C('88%', '32%', 2.6),
    },
    pages: [
      { slot: 'leg_left', bricks: ['navy-2x2', 'yellow-2x4', 'navy-2x2'], decoys: ['red-2x2', 'white-2x2'] },
      { slot: 'leg_right', bricks: ['navy-2x2', 'blue-2x4', 'navy-2x2'], decoys: ['green-2x2', 'yellow-slope'] },
      { slot: 'torso', bricks: ['red-2x4', 'yellow-2x2', 'blue-2x4'], decoys: ['white-round', 'green-2x4'] },
      { slot: 'tail', bricks: ['green-2x2', 'yellow-2x4', 'red-slope'], decoys: ['blue-slope', 'navy-2x4'] },
      { slot: 'head', bricks: ['white-2x2', 'red-2x2', 'yellow-2x2'], decoys: ['navy-2x2', 'green-slope'] },
    ],
  },
  {
    id: 'combiner',
    file: '/assets/robots/robot_combiner.png',
    emoji: '🧩',
    walk: 'merge',
    crops: {
      head: C('50%', '8%', 3.2),
      torso: C('50%', '28%', 2.4),
      arm_left: C('12%', '22%', 2.5),
      arm_right: C('88%', '22%', 2.5),
      leg_left: C('28%', '78%', 2.4),
      leg_right: C('72%', '78%', 2.4),
    },
    pages: [
      { slot: 'leg_left', bricks: ['yellow-2x4', 'blue-2x2', 'yellow-2x4'], decoys: ['red-2x4', 'navy-2x2'] },
      { slot: 'leg_right', bricks: ['red-2x4', 'navy-2x2', 'red-2x4'], decoys: ['green-2x4', 'white-2x2'] },
      { slot: 'torso', bricks: ['blue-2x2', 'red-2x4', 'white-2x2'], decoys: ['green-2x2', 'yellow-slope'] },
      { slot: 'arm_left', bricks: ['blue-2x4', 'white-2x2', 'blue-2x4'], decoys: ['navy-2x4', 'red-2x2'] },
      { slot: 'arm_right', bricks: ['green-2x4', 'white-2x2', 'green-2x4'], decoys: ['yellow-2x2', 'red-slope'] },
      { slot: 'head', bricks: ['red-2x2', 'blue-2x2', 'yellow-2x2'], decoys: ['navy-2x2', 'green-slope'] },
    ],
  },
  {
    id: 'large',
    file: '/assets/robots/robot_large.png',
    emoji: '🦾',
    walk: 'heavy',
    crops: {
      head: C('50%', '8%', 3.1),
      torso: C('50%', '35%', 2.3),
      arm_left: C('10%', '35%', 2.6),
      arm_right: C('88%', '35%', 2.6),
      leg_left: C('28%', '90%', 2.6),
      leg_right: C('75%', '90%', 2.6),
    },
    pages: [
      { slot: 'leg_left', bricks: ['navy-2x4', 'yellow-2x2', 'blue-2x4'], decoys: ['red-2x2', 'green-2x2'] },
      { slot: 'leg_right', bricks: ['navy-2x4', 'yellow-2x2', 'navy-2x4'], decoys: ['white-2x2', 'red-slope'] },
      { slot: 'torso', bricks: ['blue-2x4', 'white-2x2', 'yellow-2x2'], decoys: ['green-2x4', 'red-2x4'] },
      { slot: 'arm_left', bricks: ['navy-2x2', 'red-2x4', 'yellow-2x2'], decoys: ['green-slope', 'white-round'] },
      { slot: 'head', bricks: ['navy-2x4', 'blue-2x2', 'yellow-2x2'], decoys: ['red-2x2', 'green-2x2'] },
    ],
  },
];

export interface BuildResult {
  ok: boolean;
  failAt: number;
  fail: FailKind | null;
}

export function runPage(program: readonly string[], page: ManualPage): BuildResult {
  const need = page.bricks;
  const bag = new Set(need);
  for (let i = 0; i < program.length; i++) {
    const got = program[i]!;
    if (!bag.has(got)) return { ok: false, failAt: i, fail: 'wrong-kit' };
    if (got !== need[i]) return { ok: false, failAt: i, fail: 'order' };
  }
  if (program.length < need.length) return { ok: false, failAt: program.length, fail: 'missing' };
  if (program.length > need.length) return { ok: false, failAt: need.length, fail: 'wrong-kit' };
  return { ok: true, failAt: -1, fail: null };
}

export function hintBrick(program: readonly string[], page: ManualPage): string | null {
  const prefixOk = page.bricks.slice(0, program.length).every((id, i) => program[i] === id);
  if (prefixOk) return page.bricks[program.length] ?? null;
  return page.bricks[0] ?? null;
}

export function bankFor(page: ManualPage): string[] {
  const needed = [...new Set(page.bricks)];
  return scramble([...needed, ...page.decoys], page.slot);
}

export function bagFor(page: ManualPage): Array<{ id: string; qty: number }> {
  const map = new Map<string, number>();
  for (const id of page.bricks) map.set(id, (map.get(id) ?? 0) + 1);
  return scramble(
    [...map.entries()].map(([id, qty]) => ({ id, qty })),
    `bag-${page.slot}`,
  );
}
