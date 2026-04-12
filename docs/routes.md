# Routes

## Frontend Pages (Next.js App Router)

### `/login`

Admin login page. Single input form (password only, username is always "admin").
On success — stores JWT in memory (or httpOnly cookie) and redirects to `/admin`.
Not linked from the main site navigation — accessed directly by URL.

### `/dramas`

Public page. Displays a grid/list of all watched dramas with poster, title, rating, and status badge.
Supports filtering by status (watching, completed, dropped, plan to watch) and sorting (by rating, date added).
Each card links to `/dramas/[id]`.

### `/dramas/[id]`

Public page. Full drama detail view: large poster, title, original title, year, country, episodes count, genres, description, personal review, and rating.

### `/media`

Universal media listing page. Acts as a hub for different media types.
Initially only dramas are available, but the page is designed to support future categories (movies, anime, books, music, etc.) via tabs or a sidebar filter.
Fetches from a generic endpoint structure — `/api/media?type=drama`.

### `/admin`

Protected page (requires JWT). Dashboard for managing content:

- Add new drama (form with title, description, review, rating, poster upload, etc.)
- Edit existing drama
- Delete drama
- View list of all dramas with quick actions

Redirects to `/login` if no valid token.

---

## Backend API Endpoints (FastAPI)

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | — | Login with username + password. Returns `{ access_token, token_type }` |

**Request body:**
```json
{ "username": "admin", "password": "generated-password" }
```

**Response:**
```json
{ "access_token": "eyJ...", "token_type": "bearer" }
```

### Dramas

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/dramas` | — | List all dramas. Query params: `?status=completed&genre=romance&sort=rating` |
| `GET` | `/api/dramas/:id` | — | Get single drama by ID |
| `POST` | `/api/dramas` | JWT | Create new drama |
| `PUT` | `/api/dramas/:id` | JWT | Update drama |
| `DELETE` | `/api/dramas/:id` | JWT | Delete drama (also deletes poster file if exists) |

**Drama object:**
```json
{
  "id": "uuid",
  "title": "Goblin",
  "original_title": "쓸쓸하고 찬란하神-도깨비",
  "poster_url": "/uploads/posters/abc123.webp",
  "description": "A goblin searching for his bride...",
  "review": "One of the best K-dramas ever made...",
  "rating": 9.5,
  "status": "completed",
  "genres": ["romance", "fantasy", "drama"],
  "year": 2016,
  "episodes": 16,
  "country": "Korea",
  "created_at": "2026-04-11T12:00:00Z",
  "updated_at": "2026-04-11T12:00:00Z"
}
```

### File Uploads

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/upload/poster` | JWT | Upload poster image (multipart/form-data). Returns `{ path: "/uploads/posters/abc123.webp" }` |
| `DELETE` | `/api/upload/poster/:filename` | JWT | Delete a poster file from the server |

**Upload constraints:**

- Allowed types: JPEG, PNG, WebP
- Max file size: 5 MB
- Auto-resize: max width 800px, preserves aspect ratio
- Filename: UUID-based to avoid collisions

### Media (future-proof)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/media` | — | Generic media listing. Query param `?type=drama` filters by media type. Returns same structure as `/api/dramas` but extensible for future types (anime, movies, books) |

This endpoint is a thin wrapper — for now it proxies to the dramas query, but the route exists so the frontend `/media` page has a stable contract.
