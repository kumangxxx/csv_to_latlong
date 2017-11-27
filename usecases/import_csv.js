'use strict'

const csv_parser = require('../workers/csv_parser')
const insert_drivers = require('./insert_drivers')
const insert_points = require('./insert_points')

const points_to_drivers = points => new Promise( ( resolve, reject ) => {
    var driver_array = points.map( p => p.driver ) // map to ids
    driver_array = driver_array.filter( ( d, i ) => driver_array.indexOf( d ) == i ).map( d => Object.assign( {}, { _id: d } ) )
    resolve( driver_array )
} )

module.exports = ( csv_path, mongodb ) => {
    return csv_parser( csv_path )
    .then( points => insert_points( points, mongodb ))
    .then( points => points_to_drivers( points ))
    .then( drivers => insert_drivers( drivers, mongodb ))
}