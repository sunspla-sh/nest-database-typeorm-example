import { Transform, plainToInstance } from 'class-transformer';
import { validateSync, IsNumber, IsString, IsEnum } from 'class-validator';

enum Database {
  MySQL = 'mysql',
  PostgreSQL = 'postgres',
}

class EnvironmentVariables {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  PORT: number;

  @IsEnum(Database)
  DB_TYPE: Database;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;
}

export const validate = (config: Record<string, any>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config);
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
