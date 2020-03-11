'use strict'

const _isObject = require('lodash/isObject')

/**
 * Calls the provided cb with the current instance state by gid, and
 * saves the result as the new instance state.
 *
 * @param {object} aoHost - algo host
 * @param {string} gid - AO instance gid
 * @param {Function} cb - async method to call
 * @returns {object} nextInstanceState
 */
module.exports = async (aoHost, gid, cb) => {
  const { instances } = aoHost

  if (!instances[gid]) {
    return
  }

  const state = await cb(instances[gid])

  if (_isObject(state)) {
    instances[gid].state = state

    await aoHost.emit('ao:persist', gid)
  }

  return state
}
