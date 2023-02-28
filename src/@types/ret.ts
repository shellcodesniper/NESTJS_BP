export type SHARED_RET_TYPE = any;

export interface RetType<T extends SHARED_RET_TYPE> {
  err?: any | null,
  msg?: string | null,
  dat?: T | null,
  ext?: any | null,
};

export interface KVType<T extends SHARED_RET_TYPE> {
  kvType: 'KVType';
  key: string
  value: T
}
