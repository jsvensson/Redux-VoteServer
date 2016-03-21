import Server from 'socket.io'

export default function startServer(store) {
  const io = new Server().attach(8090)

  // Subscribe to state requests
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  )

  io.on('connection', (socket) => {
    // Emit state on new connection
    socket.emit('state', store.getState().toJS())

    // Listen for incoming actions
    socket.on('action', store.dispatch.bind(store))
  })
}
