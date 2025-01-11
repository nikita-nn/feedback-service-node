# Feedback service

## Содержание

- [Deploy Development instance](#deploy-dev-instance)
- [Deploy Production instance](#deploy-prod-instance)
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

3. Run script **service:dev**

```bash
bun run service:dev
```

### Deploy prod instance

1. Clone repo:

```bash
https://github.com/nikita-nn/feedback-service-node.git
```

2. Deploy app using docker

```bash
docker-compose up
```

### API Documentation

1. **Authentication & Registration**

| Method | Route                   | Description   | Need auth | Fields              |
| ------ | ----------------------- | ------------- | --------- | ------------------- |
| POST   | `/api/v1/auth/login`    | Login user    | No        | `email`, `password` |
| POST   | `/api/v1/auth/register` | Register user | No        | `email`, `password` |
| POST   | `/api/v1/auth/logout`   | Logout user   | Yes       |                     |

2. **User**

| Method | Route                     | Description     | Need auth | Fields       |
| ------ | ------------------------- | --------------- | --------- | ------------ |
| GET    | `/api/v1/user/me`         | Get user data   | Yes       |              |
| POST   | `/api/v1/user/set_avatar` | Set user avatar | Yes       | `avatarLink` |

3. **Categories**

| Method | Route                | Description        | Need auth | Fields |
| ------ | -------------------- | ------------------ | --------- | ------ |
| GET    | `/api/v1/categories` | Get all categories | Yes       |        |

4. **Statuses**

| Method | Route              | Description      | Need auth | Fields |
| ------ | ------------------ | ---------------- | --------- | ------ |
| GET    | `/api/v1/statuses` | Get all statuses | Yes       |        |

5. **Posts**

| Method | Route                     | Description                                | Need auth | Fields                                                  | Query params                                                                                                                                                                           |
| ------ | ------------------------- | ------------------------------------------ | --------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/posts`           | Get all posts using filters and pagination | Yes       |                                                         | **pageSize** - size of page<br/><br/> **page** - number of page <br/> <br/> **category** - category filter <br/><br/> **status** - status filter <br/><br/> **orderBy** - date / votes |
| POST   | `/api/v1/posts`           | Create a new post                          | Yes       | `title`, `description`, `category`, `status`            |
| PATCH  | `/api/v1/posts/:id`       | Update an existing post                    | Yes       | Partial of `title`, `description`, `category`, `status` |
| DELETE | `/api/v1/posts/:id`       | Delete a post                              | Yes       |                                                         |
| GET    | `/api/v1/posts/:id`       | Get a single post                          | Yes       |                                                         |
| POST   | `/api/v1/posts/:id/vote/` | Vote for a post                            | Yes       |                                                         |
