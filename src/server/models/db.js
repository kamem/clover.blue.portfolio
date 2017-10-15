import settings from '../settings'
import mongo from 'mongoose'

mongo.connect('mongodb://localhost/' + settings.dbName)
const db = mongo.connection

db.on('error', console.error.bind(console, 'connection error:'))

console.log('connected to db')

export default db
