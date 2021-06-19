INSERT INTO "groups" ("projectid", "leader", "maxmembers", "teammates", "requirements", "adrequirements", "posted", "leaderemail")
VALUES (${projectid}, ${leader}, ${maxmembers}, ${teammates},${requirements}, ${adrequirements}, ${posted}, ${leaderemail})
RETURNING *