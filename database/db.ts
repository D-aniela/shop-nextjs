import mongoose, { mongo } from 'mongoose'

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0,
}

export const connect = async () => {
  const host = process.env.MONGO_DB_HOST
  const db = process.env.MONGO_DB_NAME
  const user = process.env.MONGO_DB_USER
  const password = process.env.MONGO_DB_PASSWORD

  let mongodbUrl = `mongodb://${host}/${db}`

  if (user && password) {
    console.log('---- mongodb auth ----')
    const authOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: user,
      pass: password,
      authSource: 'admin'
    }
    return mongoose.connect(mongodbUrl, authOptions)
  }

  return mongoose.connect(mongodbUrl)
}

export const disconnect = async () => {
  if(process.env.NODE_ENV === 'development') return
  if (mongoConnection.isConnected) {
    await mongoose.disconnect()
    mongoConnection.isConnected = 0
  }
}
