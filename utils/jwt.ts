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
