export type TAppContext = {
    user: string | undefined
    room: {
        users: string[]
        currentTicket:
            | {
                  name: string
                  description: string
              }
            | undefined
        initialised: boolean
    }
}

export const DEFAULT_APP_CONTEXT: TAppContext = {
    user: undefined,
    room: {
        users: [],
        currentTicket: undefined,
        initialised: false,
    },
}
