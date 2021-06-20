UPDATE active
SET "fullname" = ${fullname}, "email" = ${email} --, "name" = ${name}
WHERE "id" = 1
RETURNING *