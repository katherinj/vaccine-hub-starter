CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    password    TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    rsvp_stats  BOOLEAN NOT NULL,
    num_guests  INTEGER NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
)