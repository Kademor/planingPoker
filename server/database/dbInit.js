const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

async function main() {
    const db = await open({
        filename: 'planningPoker.db',
        driver: sqlite3.Database,
    })

    await db.exec(`
        CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        cookie TEXT NOT NULL,
        room_id INTEGER,
        FOREIGN KEY(room_id) REFERENCES rooms(id)
    );

CREATE TABLE storys (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    link TEXT,
    description TEXT,
    room_id INTEGER,
    FOREIGN KEY(room_id) REFERENCES rooms(id)
);

CREATE TABLE rooms (
    id INTEGER PRIMARY KEY,
    site_string_id TEXT NOT NULL,
    name TEXT NOT NULL,
    owner_user_id INTEGER NOT NULL,
    active_story_id INTEGER,
    description TEXT,
    FOREIGN KEY(owner_user_id) REFERENCES rooms(id),
    FOREIGN KEY(active_story_id) REFERENCES storys(id)
);

CREATE TABLE rooms_users (
    room_id INTEGER,
    user_id INTEGER,
    PRIMARY KEY (room_id, user_id),
    FOREIGN KEY(room_id) REFERENCES rooms(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE rooms_storys (
    room_id INTEGER,
    story_id INTEGER,
    PRIMARY KEY (room_id, story_id),
    FOREIGN KEY(room_id) REFERENCES rooms(id),
    FOREIGN KEY(story_id) REFERENCES storys(id)
);`)
}
main()
