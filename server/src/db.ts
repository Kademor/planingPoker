import { open } from 'sqlite'
import { Database } from 'sqlite3'

export const dbPromise = open({
    filename: './database/planningPoker.db',
    driver: Database,
})
