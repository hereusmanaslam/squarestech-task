import path from 'node:path';
import fs from 'node:fs';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { MemberEntity } from '../members/member.entity';
import { TaskEntity } from '../tasks/task.entity';

export function typeormConfig(): TypeOrmModuleOptions {
  // TypeORM "sqljs" keeps data in a single file without native binaries.
  // This is ideal for take-home tasks and CI environments.
  const dbLocation =
    process.env.DB_LOCATION ?? path.join(process.cwd(), 'data', 'team_directory.sqlite');
  fs.mkdirSync(path.dirname(dbLocation), { recursive: true });

  return {
    type: 'sqljs',
    location: dbLocation,
    autoSave: true,
    entities: [MemberEntity, TaskEntity],
    synchronize: true,
    logging: false,
  };
}
