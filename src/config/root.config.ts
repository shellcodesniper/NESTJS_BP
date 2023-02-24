const DEFAULT_ENV_PATHS: string = process.env.NODE_ENV === 'production'
? '.root.env' : '.root.dev.env';

export default () => ({
  envFilePath: DEFAULT_ENV_PATHS,
  isGlobal: true,
});

