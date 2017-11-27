'use strict'

require('dotenv').config()

const express = require('express')
const body_parser = require('body-parser')
const router = require('./router')

const mongod = require('mongodb').MongoClient
Promise = require('promise')

const server = express()
var mongodb

server.use( body_parser.json() )
server.use( (req, res, next) => {
    req.mongodb = mongodb
    next()
} )
server.use( router )

let setupMongo = mongo_url => new Promise( ( resolve, reject ) => {
    let db = mongod.connect( mongo_url )
    resolve( db )
} )

let setupCollections = db => new Promise( ( resolve, reject ) => {
    db.collection( 'points' ).createIndex( { driver: 1, timestamp: 1 }, { unique: true }, ( err, res ) => {
        err ? reject( err ) : resolve( db )
    } )
} )

let setupServer = port => new Promise( ( resolve, reject ) => {
    server.listen( port, err => err ? reject( err ) : resolve(  )  )
} )

let port = parseInt( process.env.PORT ) || 4000
let mongourl = process.env.MONGO_URL || 'mongodb://kamen:rider@localhost:27017/nomad-1'

setupMongo( mongourl )
.then( setupCollections )
.then( db => { 
    mongodb = db
    return setupServer( port )
} )
.then( () => {
    console.log( 'running on port:', port )
} )
.catch( console.log )