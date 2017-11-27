'use strict'

module.exports = ( drivers, mongodb ) => new Promise( ( resolve, reject ) => {

    let col = mongodb.collection( 'drivers' )
    let bulk = col.initializeOrderedBulkOp()

    drivers.forEach( d => {
        bulk.find( { _id: d._id } ).upsert().updateOne( { upserted: Date.now() } )
    })

    bulk.execute( (err, res) => {
        if ( err ) reject( err )
        else resolve( drivers )       
    } )

} )