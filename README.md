# Feedback service

## User manual

- [Deploy Development instance](#deploy-dev-instance)
- [Deploy Production instance](#deploy-prod-instance)
- [Environment variables](#environment-variables)
- [API Documentation](#api-documentation)

### Deploy dev instance

1. Clone repo:

```bash
https://github.com/nikita-nn/feedback-service-node.git
```

2. Install all dependencies using **bun**

```bash
bun install
```

3. Apply all migrations

```bash
bun run db:migrate
```

4. Run script **service:dev**

```bash
bun run service:dev
```

### Deploy prod instance

1. Clone repo:

```bash
https://github.com/nikita-nn/feedback-service-node.git
```

2. Apply all migrations

```bash
bun run db:migrate
```

3. Deploy app using docker

```bash
docker-compose up
```

### Environment variables

#### Required

`POSTGRES_USER` - user of database

`POSTGRES_DB` - name of database

`POSTGRES_PASSWORD` - password for database

`PORT` - port for Express server

`FRONTEND_URL` - your frontend url ( for correctly handling CORS connections )

`JWT_SECRET` - secret key for generating auth tokens

`REDIS_PASSWORD` - password for Redis instance

#### Optional

Please use in production:
<br/>
db host: db
<br/>
redis host: redis

`POSTGRES_HOST` - host for a database
<br/>
**Default**: localhost

`REDIS_HOST` - host for a Redis instance
<br/>
**Default**: localhost

`REDIS_PORT` - port for a Redis instance
<br/>
**Default**: 6379

`JWT_LIFETIME` - lifetime of auth token
<br/>
**Default**: 96h

### API Documentation

1. **Authorization & Registration**

| Method | Route                   | Description   | Need auth | Fields              |
|--------|-------------------------|---------------|-----------|---------------------|
| POST   | `/api/v1/auth/login`    | Login user    | No        | `email`, `password` |
| POST   | `/api/v1/auth/register` | Register user | No        | `email`, `password` |
| POST   | `/api/v1/auth/logout`   | Logout user   | Yes       |                     |

2. **User**

| Method | Route                     | Description     | Need auth | Fields       |
|--------|---------------------------|-----------------|-----------|--------------|
| GET    | `/api/v1/user/me`         | Get user data   | Yes       |              |
| POST   | `/api/v1/user/set_avatar` | Set user avatar | Yes       | `avatarLink` |

3. **Categories**

| Method | Route                | Description        | Need auth | Fields |
|--------|----------------------|--------------------|-----------|--------|
| GET    | `/api/v1/categories` | Get all categories | Yes       |        |

4. **Statuses**

| Method | Route              | Description      | Need auth | Fields |
|--------|--------------------|------------------|-----------|--------|
| GET    | `/api/v1/statuses` | Get all statuses | Yes       |        |

5. **Posts**

| Method | Route                     | Description                            | Need auth | Fields                                                  | Query params                                                                                                                                                                           |
|--------|---------------------------|----------------------------------------|-----------|---------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | `/api/v1/posts`           | Get posts using filters and pagination | Yes       |                                                         | **pageSize** - size of page<br/><br/> **page** - number of page <br/> <br/> **category** - category filter <br/><br/> **status** - status filter <br/><br/> **orderBy** - date / votes |
| POST   | `/api/v1/posts`           | Create a new post                      | Yes       | `title`, `description`, `category`, `status`            |
| PATCH  | `/api/v1/posts/:id`       | Update an existing post                | Yes       | Partial of `title`, `description`, `category`, `status` |
| DELETE | `/api/v1/posts/:id`       | Delete a post                          | Yes       |                                                         |
| GET    | `/api/v1/posts/:id`       | Get a single post                      | Yes       |                                                         |
| POST   | `/api/v1/posts/:id/vote/` | Vote for a post                        | Yes       |                                                         |
