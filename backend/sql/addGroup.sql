INSERT INTO "groups" (
    "projectid",
    "leader",
    "maxmembers",
    "teammates",
    "requirements",
    "adrequirements"
)
VALUES (${projectid}, ${leader}, ${maxmembers}, ${teammates}, ${requirements}, ${adrequirements})
RETURNING *