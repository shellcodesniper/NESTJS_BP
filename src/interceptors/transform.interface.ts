export interface GResponse<T> {
  cd?: number;
  msg?: string | string[] | null;
  dat?: T;
  err?: Error | undefined | null;
}
