UPDATE active
SET "email" = ${email}
WHERE "id" = 1
RETURNING *