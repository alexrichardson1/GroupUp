INSERT INTO "projects" ("name", "requirements", "description", "hours", "date", "location")
VALUES (${name}, ${requirements}, ${description}, ${hours}, ${date}, ${location})
RETURNING *