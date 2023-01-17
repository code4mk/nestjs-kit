import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export default function database() : any {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      username: configService.get('database.username'),
      password: configService.get('database.password'),
      database: configService.get('database.database'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      cli: {
        entitiesDir: 'src/**/*entity{.ts,.js}',
        migrationsDir: 'src/db/migrations',
      },
      synchronize: false,
    }),
    inject: [ConfigService],
  });
}
