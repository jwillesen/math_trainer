import {createAction} from 'redux-actions'

export const START_CHALLENGE = 'START_CHALLENGE'
export const startChallenge = createAction(START_CHALLENGE)

export const QUIT_CHALLENGE = 'QUIT_CHALLENGE'
export const quitChallenge = createAction(QUIT_CHALLENGE)
