'use strict'

module.exports = ( points, db ) => new Promise( ( resolve, reject ) => {
    console.log( 'inserting points..' )
    let col = db.collection( 'points' )
    let bulk = col.initializeOrderedBulkOp()

    points.forEach( p => {
        bulk.find( { driver: p.driver, timestamp: p.timestamp } ).upsert().updateOne( { driver: p.driver, timestamp: p.timestamp, lat: p.lat, lng: p.lng } )
    } )

    bulk.execute( ( err, res ) => err ? reject( err ) : resolve( points ) )
} )