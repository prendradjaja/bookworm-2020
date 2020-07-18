# Bookworm

## Running locally

### Requirements

- NPM & Node (I'm using NPM v6.14.4 and Node v12.18.0)
- PostgreSQL (I'm using v12.3)

### Install

#### Server

```
cd bookworm-2020/server

# Set up database
psql -c "CREATE DATABASE bookworm"
./scripts/run-all-migrations.sh

# (Optional) Add example data
psql bookworm < scripts/add-example-data.sql

# Install dependencies
npm install
```

#### Client

```
cd bookworm-2020/client
npm install  # Install dependencies
```

### Run

#### Server

In two separate terminals:

```
cd bookworm-2020/server
npm run build-watch
```

```
cd bookworm-2020/server
npm run serve
```

#### Client

```
cd bookworm-2020/client
npx ng serve
```

Then visit: http://localhost:4200/
