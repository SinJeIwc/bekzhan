# Routes

## Frontend Pages (Next.js App Router)

### `/login`

Owner login page. Single input form (password only, username is always "admin").
On success — stores JWT in memory and redirects to `/admin`.
Not linked from the main site navigation — accessed directly by URL.

### `/dramas`

Public page. Displays a grid/list of all watched dramas with poster, title, rating, and status badge.
Client-side filtering by status and sorting by rating/date. Each card links to `/dramas/[id]`.

### `/dramas/[id]`

Public page. Full drama detail view: large poster, title, original title, year, country, episodes count, genres, description, personal review, and rating.

### `/admin`

Protected page (requires JWT). Dashboard for managing content:

- Add new drama (form with title, description, review, rating, poster upload, etc.)
- Edit existing drama
- Delete drama
- View list of all dramas with quick actions

Redirects to `/login` if no valid token.

---

## Backend API Endpoints (FastAPI)

### Owner Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/owner/login` | — | Login with username + password (OAuth2 form). Returns `{ access_token, token_type }` |

**Request:** `application/x-www-form-urlencoded` with `username` and `password` fields.

**Response:**
```json
{ "access_token": "eyJ...", "token_type": "bearer" }
```

### Dramas

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/dramas` | — | List all dramas |
| `GET` | `/api/dramas/:id` | — | Get single drama by UUID |
| `POST` | `/api/dramas` | Bearer | Create new drama |
| `PUT` | `/api/dramas/:id` | Bearer | Update drama |
| `DELETE` | `/api/dramas/:id` | Bearer | Delete drama |

**Drama object (DramaPublic):**
```json
{
  "id": "a3f1b2c4-5678-...",
  "title": "Goblin",
  "original_title": "쓸쓸하고 찬란하神-도깨비",
  "poster_path": "/uploads/posters/abc123.webp",
  "description": "A goblin searching for his bride...",
  "review": "One of the best K-dramas ever made...",
  "rating": 9.5,
  "status": "completed",
  "genres": ["Romance", "Fantasy"],
  "year": 2016,
  "episodes_aired": 16,
  "episodes_total": 16,
  "country": "Korea",
  "created_at": "2026-04-11T12:00:00Z",
  "updated_at": "2026-04-11T12:00:00Z"
}
```

No server-side filtering or pagination — max ~200 dramas, frontend handles filtering client-side.

### File Uploads

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/upload/poster` | Bearer | Upload poster image (multipart/form-data). Returns `{ poster_path }` |

**Upload behavior:**

- Allowed types: JPEG, PNG, WebP
- Image integrity verified via Pillow
- Auto-resize: max width 800px, preserves aspect ratio
- Filename: UUID-based to avoid collisions
- Static files served at `/uploads/posters/...`
