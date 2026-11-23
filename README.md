# CS-554-Final-Project

## Prerequisites

- Node 20 or higher
- Docker (use Orbstack or Docker Desktop). Open it before running `docker` commands.

## Setup

```bash
git clone https://github.com/Alanzo1/CS-554-Final-Project.git
cd CS-554-Final-Project

# install client & server dependencies
cd client && npm ci && cd ..
cd server && npm ci && cd ..

# environment variables
cp server/.env.example server/.env

# start MongoDB and Redis
docker compose up -d
docker compose ps
```

## Running

Use two terminals:

```bash
# Terminal 1: server at http://localhost:4000/graphql
cd server && npm run dev
```

```bash
# Terminal 2: client at http://localhost:5173
cd client && npm run dev
```

Stop the containers with `docker compose down` (`-v` to wipe the database).

If `package.json` changes after a pull, rerun `npm ci` in that folder.

## Adding packages

Install packages from inside `client` or `server`. Commit `package.json` and `package-lock.json` together.