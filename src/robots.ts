export type PartId =
  | 'leg_left'
  | 'leg_right'
  | 'torso'
  | 'head'
  | 'arm_left'
  | 'arm_right'
  | 'connector';

export interface PartDef {
  id: PartId;
  file: string;
  emoji: string;
}

export const PARTS: Record<PartId, PartDef> = {
  leg_left: { id: 'leg_left', file: '/assets/parts/part_leg_left.png', emoji: '🦵' },
  leg_right: { id: 'leg_right', file: '/assets/parts/part_leg_right.png', emoji: '🦵' },
  torso: { id: 'torso', file: '/assets/parts/part_torso.png', emoji: '📦' },
  head: { id: 'head', file: '/assets/parts/part_head.png', emoji: '🤖' },
  arm_left: { id: 'arm_left', file: '/assets/parts/part_arm_left.png', emoji: '💪' },
  arm_right: { id: 'arm_right', file: '/assets/parts/part_arm_right.png', emoji: '💪' },
  connector: { id: 'connector', file: '/assets/parts/part_connector.png', emoji: '🔌' },
};

export const ALL_PARTS: readonly PartId[] = [
  'leg_left',
  'leg_right',
  'torso',
  'head',
  'arm_left',
  'arm_right',
  'connector',
];

export type FailKind = 'topple' | 'head-drop' | 'arm-drop' | 'tail-drop' | 'extra' | 'missing';

export const FAIL_FACE: Record<FailKind, string> = {
  topple: '💥',
  'head-drop': '😵',
  'arm-drop': '💨',
  'tail-drop': '😵',
  extra: '❌',
  missing: '❓',
};

export interface RobotDef {
  id: string;
  file: string;
  emoji: string;
  /** Części tego bota — inna lista = inna zagadka. */
  recipe: PartId[];
  walk: 'bounce' | 'pose' | 'slash' | 'stomp' | 'merge' | 'heavy';
}

export const ROBOTS: readonly RobotDef[] = [
  {
    id: 'small',
    file: '/assets/robots/robot_small.png',
    emoji: '🤖',
    recipe: ['leg_left', 'torso', 'head'],
    walk: 'bounce',
  },
  {
    id: 'ranger',
    file: '/assets/robots/robot_ranger_colorful.png',
    emoji: '🦸',
    recipe: ['leg_left', 'torso', 'arm_left', 'head'],
    walk: 'pose',
  },
  {
    id: 'ninja',
    file: '/assets/robots/robot_ninja.png',
    emoji: '🥷',
    recipe: ['leg_left', 'torso', 'head', 'arm_right'],
    walk: 'slash',
  },
  {
    id: 'dino',
    file: '/assets/robots/robot_dino_mecha.png',
    emoji: '🦕',
    recipe: ['leg_left', 'leg_right', 'torso', 'connector', 'head'],
    walk: 'stomp',
  },
  {
    id: 'combiner',
    file: '/assets/robots/robot_combiner.png',
    emoji: '🧩',
    recipe: ['leg_left', 'leg_right', 'torso', 'arm_left', 'arm_right', 'head'],
    walk: 'merge',
  },
  {
    id: 'large',
    file: '/assets/robots/robot_large.png',
    emoji: '🦾',
    recipe: ['leg_left', 'leg_right', 'torso', 'arm_left', 'connector', 'head'],
    walk: 'heavy',
  },
];

export interface BuildResult {
  ok: boolean;
  attached: PartId[];
  failAt: number;
  fail: FailKind | null;
}

function legs(has: ReadonlySet<PartId>): number {
  return (has.has('leg_left') ? 1 : 0) + (has.has('leg_right') ? 1 : 0);
}

/** Odpal program: kolejność ma fizykę. Zła sekwencja wywraca bota. */
export function runBuild(program: readonly PartId[], robot: RobotDef): BuildResult {
  const has = new Set<PartId>();
  const attached: PartId[] = [];
  const allowed = new Set(robot.recipe);

  for (let i = 0; i < program.length; i++) {
    const part = program[i]!;
    if (!allowed.has(part) || has.has(part)) {
      return { ok: false, attached, failAt: i, fail: 'extra' };
    }
    if (part === 'torso' && legs(has) === 0) {
      return { ok: false, attached, failAt: i, fail: 'topple' };
    }
    if (part === 'head' && !has.has('torso')) {
      return { ok: false, attached, failAt: i, fail: 'head-drop' };
    }
    if ((part === 'arm_left' || part === 'arm_right') && !has.has('torso')) {
      return { ok: false, attached, failAt: i, fail: 'arm-drop' };
    }
    if (part === 'connector' && !has.has('torso')) {
      return { ok: false, attached, failAt: i, fail: 'tail-drop' };
    }
    has.add(part);
    attached.push(part);
  }

  if (robot.recipe.some((id) => !has.has(id))) {
    return { ok: false, attached, failAt: program.length, fail: 'missing' };
  }
  return { ok: true, attached, failAt: -1, fail: null };
}

/** Po porażce: pierwsza legalna część, której jeszcze nie ma. Nie zdradzamy planu przed Start. */
export function hintPart(program: readonly PartId[], robot: RobotDef): PartId | null {
  for (const part of robot.recipe) {
    if (program.includes(part)) continue;
    const trial = runBuild([...program, part], robot);
    if (trial.failAt !== program.length) return part;
    if (trial.ok || trial.fail === 'missing') return part;
  }
  return null;
}
