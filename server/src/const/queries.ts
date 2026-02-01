export const REQUEST_ROOM_FROM_ID = `
    SELECT rooms.name, description, owner_user_id, site_string_id, cookie AS "user_cookie"
    FROM rooms
             JOIN users ON rooms.owner_user_id = users.id
    WHERE rooms.id = ?
    LIMIT 1
`

export const REQUEST_LATEST_USER_CREATED =
    'SELECT name,cookie FROM users WHERE id = ? LIMIT 1'

export const REQUEST_ROOM_FROM_SITE_STRING_ID = `
    SELECT rooms.name, description, owner_user_id, site_string_id
    FROM rooms
    WHERE rooms.site_string_id = ?
    LIMIT 1
`
