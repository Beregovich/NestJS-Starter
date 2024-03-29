import * as path from 'path';

export type EnvironmentVariable = { [key: string]: string | undefined };
export type EnvironmentsTypes =
  | 'DEVELOPMENT'
  | 'STAGING'
  | 'PRODUCTION'
  | 'LOCAL'
  | 'TEST';
import * as dotenv from 'dotenv';
dotenv.config();

export class EnvironmentSettings {
  constructor(private env: EnvironmentsTypes) {}

  getEnv() {
    return this.env;
  }

  isProduction() {
    return this.env === 'PRODUCTION';
  }

  isStaging() {
    return this.env === 'STAGING';
  }

  isDevelopment() {
    return this.env === 'DEVELOPMENT';
  }
  isTesting() {
    return this.env === 'TEST';
  }
}

export class AppSettings {
  constructor(
    public env: EnvironmentSettings,
    public api: APISettings,
    //public auth: AuthSettings,
    public database: DatabaseSettings,
    public logger: LoggerSettings,
    public telegram: TelegramSettings, //public s3: S3Settings,
  ) {}
}

class APISettings {}

class DatabaseSettings {
  public readonly POSTGRES_HOST: string;
  public readonly POSTGRES_DATABASE: string;
  public readonly POSTGRES_PORT: number;
  public readonly POSTGRES_USER: string;
  public readonly POSTGRES_PASSWORD: string;
  constructor(private envVariables: EnvironmentVariable) {
    this.POSTGRES_HOST =
      envVariables.POSTGRES_HOST || 'hattie.db.elephantsql.com';
    this.POSTGRES_DATABASE = envVariables.POSTGRES_DATABASE || 'eyhiploi';
    this.POSTGRES_PORT = +envVariables.POSTGRES_PORT || 5432;
    this.POSTGRES_USER = envVariables.POSTGRES_USER || 'eyhiploi';
    this.POSTGRES_PASSWORD =
      envVariables.POSTGRES_PASSWORD || 'zzJXENF6Rd99G-9Nqt6do6h2UvAi-Z5z';
  }
}

class LoggerSettings {
  public readonly HOST: string;
  public readonly URL_PATH: string;
  constructor(private envVariables: EnvironmentVariable) {
    this.HOST = envVariables.LOGGER_HOST || 'default';
    this.URL_PATH = envVariables.LOGGER_URL_PATH || 'default';
  }
}

class TelegramSettings {
  public readonly botName: string;
  public readonly token: string;
  constructor(private envVariables: EnvironmentVariable) {
    this.botName = envVariables.TELEGRAM_BOT_NAME || 'fake';
    this.token = envVariables.TELEGRAM_BOT_TOKEN || null;
  }
}

const env = new EnvironmentSettings(
  (process.env.ENV || 'DEVELOPMENT') as EnvironmentsTypes,
);

const api = new APISettings();
const database = new DatabaseSettings(process.env);
const logger = new LoggerSettings(process.env);
const telegram = new TelegramSettings(process.env);

export const appSettings = new AppSettings(
  env,
  api,
  database,
  logger,
  telegram,
);
