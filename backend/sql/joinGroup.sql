UPDATE groups
SET "teammates" = array_append("teammates", ${name})
WHERE 
  "id" = ${groupid}
RETURNING *