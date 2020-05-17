
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar(80) UNIQUE NOT NULL,
  "password" varchar(1000) NOT NULL,
  "first_name" varchar(80),
  "last_name" varchar(80),
  "date_of_birth" varchar(120) NOT NULL,
  "moderator" boolean NOT NULL
);

CREATE TABLE "image" (
  "id" SERIAL PRIMARY KEY,
  "img_url" varchar NOT NULL,
  "title" varchar(240),
  "notes" varchar(3000),
  "owner_id" int references "user" NOT NULL,
  "latitude" numeric NOT NULL,
  "longitude" numeric NOT NULL,
  "reviewed" boolean NOT NULL
);

CREATE TABLE "user_relationship" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int references "user",
  "friend_id" int references "user",
  "confirmed_request" boolean,
  "display_user_photos_on_friend_map" boolean
);
