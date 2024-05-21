import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://palak23thakur:palak23thakur@cluster0.rwzjejx.mongodb.net/'
    )
    console.log(`MongoDB connected : ${conn.connection.host}`)
  } catch (error) {
    console.log(`error occured: ${error.message}`)
    process.exit(1)
  }
}
export default connectDB
