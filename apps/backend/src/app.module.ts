import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersModule } from './members/members.module';
import { typeormConfig } from './database/typeorm_config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: typeormConfig,
    }),
    MembersModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
