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

export const COMMANDS = {
  attach: { file: '/assets/commands/cmd_attach.png', emoji: '🔗' },
  rotate: { file: '/assets/commands/cmd_rotate.png', emoji: '🔄' },
  bolt: { file: '/assets/commands/cmd_bolt.png', emoji: '🔩' },
  walk: { file: '/assets/commands/cmd_test_walk.png', emoji: '🚶' },
} as const;

export interface RobotDef {
  id: string;
  file: string;
  emoji: string;
}

export const ROBOTS: readonly RobotDef[] = [
  { id: 'ranger', file: '/assets/robots/robot_ranger_colorful.png', emoji: '🦸' },
  { id: 'ninja', file: '/assets/robots/robot_ninja.png', emoji: '🥷' },
  { id: 'dino', file: '/assets/robots/robot_dino_mecha.png', emoji: '🦕' },
  { id: 'combiner', file: '/assets/robots/robot_combiner.png', emoji: '🧩' },
  { id: 'small', file: '/assets/robots/robot_small.png', emoji: '🤖' },
  { id: 'large', file: '/assets/robots/robot_large.png', emoji: '🦾' },
];

/** MVP: three parts in order — legs, torso, head. */
export const BUILD_ORDER: readonly PartId[] = ['leg_left', 'torso', 'head'];
export const BUILD_BANK: readonly PartId[] = [
  'leg_left',
  'leg_right',
  'torso',
  'head',
  'arm_left',
  'connector',
];
