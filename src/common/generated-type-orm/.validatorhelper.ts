// INFO : 오류 날경우, 이걸로 대체
/*
export function getEnumValues<T extends { [index: string]: string} | ArrayLike<unknown>>(enumType: T): Array<string> | undefined {
  return [
    ...new Set(
      Object.entries(enumType)
        .filter(([key]) => !~~key)
        .flatMap((item) => item),
    ),
  ]
}
*/
// INFO :
// Path: ./validator/helpers/index.ts
