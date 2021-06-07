INSERT INTO "groups" (
    "projectId",
    "leader",
    "maxMembers",
    "teammates",
    "requirements",
    "adRequirements"
)
VALUES (${projectId}, ${leader}, ${maxMembers}, ${teammates}, ${requirements}, ${adRequirements})
RETURNING *