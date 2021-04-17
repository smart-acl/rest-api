# Admin API

## Start

### Docker compose (priority)

```
$ docker-compose up -d # --build for rebuild
```

### Manual

```
$ npm install
$ npm run build && npm run start:watch
```

## ORM Configs

### Local
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "docker",
  "password": "docker",
  "database": "acl",
  "entities": ["src/**/**.entity{.ts,.js}"],
  "synchronize": true
}
```

### Docker compose
```json
{
  "type": "postgres",
  "host": "postgres",
  "port": 5432,
  "username": "docker",
  "password": "docker",
  "database": "acl",
  "entities": ["src/**/**.entity{.ts,.js}"],
  "synchronize": true
}
```
