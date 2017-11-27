'use strict'

const express = require('express')
const multer = require('multer')
const upload = multer( { dest: 'uploads/' } )

const import_csv = require('./usecases/import_csv')
const fetch_points = require('./usecases/fetch_points')
const calculate_speed = require('./usecases/calculate_speed_of_points')

let router = express.Router()

const standard_handle = ( promise = Promise.resolve( true ), response ) => {
    promise
    .then( result => response.status( 200 ).json( result ) )
    .catch( err => {
        console.log( err )
        response.status( 500 ).send( err )
    } )
}

router.post(
    '/import', 
    upload.single( 'csv' ), 
    ( req, res ) => standard_handle( import_csv( req.file.path, req.mongodb ), res ) 
)

router.get(
    '/health',
    ( req, res ) => standard_handle( Promise.resolve( { status: 'healthy' } ), res )
)

router.get(
    '/points',
    ( req, res ) => 
    standard_handle( fetch_points( req.mongodb )
    .then( drivers => drivers.map( d => Object.assign( d, { points: calculate_speed( d.points ) } ) )), res )
)

router.get(
    '/',
    ( req, res ) => standard_handle( Promise.resolve( { status: 'up' } ) , res )
)

module.exports = router