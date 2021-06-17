INSERT INTO "projects" ("id", "name", "requirements")
VALUES ($ { id }, $ { name }, $ { requirements })
RETURNING *