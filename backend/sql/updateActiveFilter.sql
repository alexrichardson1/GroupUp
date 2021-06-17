UPDATE users
SET "activefilter" = ${ filters }
WHERE "email" = ${ email }