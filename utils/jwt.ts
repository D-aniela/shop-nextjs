import jwt from 'jsonwebtoken'

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('JWT_SECRET_SEED is not defined in environment variables')
  }

  return jwt.sign(
    // payload
    { _id, email },
    // Seed
    process.env.JWT_SECRET_SEED,
    // options
    { expiresIn: '30d' },
  )
}

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('JWT_SECRET_SEED is not defined in environment variables')
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return reject('JWT no es válido')
        const { _id } = payload as { _id: string }
        resolve(_id)
      })
    } catch (error) {
      reject('JWT no es válido')
    }
  })
}
