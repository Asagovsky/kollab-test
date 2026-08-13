import * as migration_20260813_091456 from './20260813_091456';
import * as migration_20260813_093436 from './20260813_093436';

export const migrations = [
  {
    up: migration_20260813_091456.up,
    down: migration_20260813_091456.down,
    name: '20260813_091456',
  },
  {
    up: migration_20260813_093436.up,
    down: migration_20260813_093436.down,
    name: '20260813_093436'
  },
];
