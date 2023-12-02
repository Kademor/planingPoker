export type TAppContext = {
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
    room: {
        users: [],
        currentTicket: undefined,
        initialised: false,
    },
}
