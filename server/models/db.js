import settings from '../settings'
import mongo from 'mongoose'

mongo.connect( process.env.NODE_ENV === 'production' ? 'mongodb://heroku_h13ngxp2:4cr1mbcvh2btaip4uvtqbc542m@ds123532.mlab.com:23532/heroku_h13ngxp2' : `mongodb://localhost/${settings.dbName}` )
const db = mongo.connection

db.on('error', console.error.bind(console, 'connection error:'))

console.log('connected to db')

export default db
