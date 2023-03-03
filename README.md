## Repository
[Template](https://github.com/caramellateam/NESTJS_BP.git)

## DATABASE ( prisma branch )

[PRISMA INTEGRATION](https://www.prisma.io/docs/guides)
.env 파일
schema.prisma 파일

### DB Commands

- GENERATE
  - `yarn db:gen` : Generate `doc`/`dbml`/`sql?` !
  - `yarn db:watch` : `db:gen` when scheme changed!
- Migrate?
  - For Development / Staging
    - Create a migration from changes in Prisma schema
      `npx prisma migrate `**dev** `[OPTIONS]` | `yarn db:dev --name {NAME}`
      **OPTIONS:**
      - `--create-only`
        Create new migration but not apply
      - `--skip-generate`
        Skip triggering Generator
      - `--skip-seed`
        Skip Seed Data
    - Reset All Pending Migrations from Change
      `npx prism migrate reset`
  - For Production
    - Deploy to Production Database
      `npx prisma migrate `**deploy**



## 구현된 내용
- SWAGGER ( DOCUMENT Library / main.ts )
- Logger ( Winston-Logging / main.ts )
- Cloudwatch Logger ( Winston-Logging / main.ts / 비활성화 상태 )
- CORS ( Security / main.ts )
- JSON Body Parser ( Parser / main.ts )
- URL-Encoded Body Parser ( Parser / main.ts )
- File Parser ( Parser / '아래 FileParser 부분 참고' )
- Response Body 정규화 ( Normalization / transform.interceptor / '아래 ResponseBody정규화 참고' )
- Response Http Status ( HttpStatus 에 따른 사용 )
- Response Content-Type ( Rest-Api에 따른 'json' 통일화)
- Content-Location ( Rest-Api 요청 url 헤더 포함)
- throttlilng ( Rate Limitting / '아래 Throttling 참고')
- Login ( '/login' ) + Auth ( '/auth' ) [ Authentication + Authorization 구현]
- ConfigParser ( YAML Environment Config / '아래 ConfigParser 부분 참고' )



### ConfigParser


### FileParser


### ResponseBody정규화


### Throttling

[@nestjs/throttler](https://github.com/nestjs/throttler)
[NESTJS Docs](https://docs.nestjs.com/security/rate-limiting)

#### SKip Throttling
```typescript

@SkipThrottle()
@Controller('users')

```




---

## Commands

### Git v{major}.{minor}.{patch}
```bash
# package.json version {major} 증가
yarn major

# package.json version {minor} 증가
yarn minor

# package.json version {patch} 증가
yarn patch

```


### Running app
```bash
#development
$ yarn dev

#debug mode
$ yarn debug

#production
$ yarn prod

```


### Installation

```bash
$ yarn install
```

### Running the app
```bash
# development
$ yarn dev

# watch mode
$ yarn run start:dev

# production mode
$ yarn prod
```

