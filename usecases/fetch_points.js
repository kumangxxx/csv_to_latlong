'use strict'

module.exports = ( mongodb, start_date = 0, end_date = 32532224042 /* tahun 3000, for simplicity */ ) => new Promise( ( resolve, reject ) => {

    let col = mongodb.collection( 'points' )
    col.aggregate( [
        {
            $match: { timestamp: { $gte: start_date, $lte: end_date } }
        },
        {
            $sort: {
                timestamp: 1
            }
        },
        {
            $group: {
                _id: '$driver',
                points: {
                    $push: {
                        time: '$timestamp',
                        latitude: '$lat',
                        longitude: '$lng'
                    }
                }
            }
        }
    ], (err, result) => {
        err ? reject( err ) : resolve( result )
    } )

} )