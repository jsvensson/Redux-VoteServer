import {Map, fromJS} from 'immutable'
import {expect} from 'chai'

import reducer from '../src/reducer'

describe('reducer', () => {

  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Alien'] }
    const nextState = reducer(undefined, action)

    expect(nextState).to.equal(fromJS({
      entries: ['Alien']
    }))
  })

  it('can be used with reduce', () => {
    const actions = [
      { type: 'SET_ENTRIES', entries: ['Alien', 'Predator'] },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'Alien' },
      { type: 'VOTE', entry: 'Predator' },
      { type: 'VOTE', entry: 'Alien' },
      { type: 'NEXT' }
    ]
    const finalState = actions.reduce(reducer, Map())

    expect(finalState).to.equal(fromJS({
      winner: 'Alien'
    }))
  })

  it('handles SET_ENTRIES', () => {
    const initialState = Map()
    const action = { type: 'SET_ENTRIES', entries: ['Alien'] }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      entries: ['Alien']
    }))
  })

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Alien', 'Predator']
    })
    const action = { type: 'NEXT' }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Alien', 'Predator']
      },
      entries: []
    }))
  })

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Alien', 'Predator']
      },
      entries: []
    })
    const action = { type: 'VOTE', entry: 'Alien' }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Alien', 'Predator'],
        tally: { Alien: 1 }
      },
      entries: []
    }))
  })

}) // end describe reducer
