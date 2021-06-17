UPDATE users
SET lastlogin = $ { time }
WHERE email = $ { email };