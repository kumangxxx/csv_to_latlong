'use strict'

const fs = require('fs')
const csvtojson = require('csvtojson')

module.exports = ( path = '' ) => new Promise( ( resolve, reject ) => {

    let result = []

    let coordinate_handler = item => {
        item = item.replace(',', '.')
        return Number( item )
    }

    csvtojson({
        delimiter: ';',
        checkType: true,
        colParser: {
            'timestamp/$date': ( item ) => new Date( item ),
            lat: coordinate_handler,
            lng: coordinate_handler
        }
    })
    .fromFile( path )
    .on( 'json', json => {
        result.push( {
            driver: json['driver_id/$oid'],
            lat: json.lat,
            lng: json.lng,
            timestamp: json['timestamp/$date'].getTime() / 1000,
            date: json['timestamp/$date']
        } )
    } )
    .on( 'done', err => {
        if (err) reject( err )
        else resolve( result )
    } )

} )