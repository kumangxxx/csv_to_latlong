'use strict'

const geolib = require('geolib')

module.exports = points => {

    let points_2 = []

    points.forEach( ( p, i ) => {
        let next_p = points[i+1] || p
        p.speed = geolib.getSpeed( 
            {
                time: p.time * 1000,
                latitude: p.latitude,
                longitude: p.longitude
            },
            {
                time: next_p.time * 1000,
                latitude: next_p.latitude,
                longitude: next_p.longitude
            }
        ) + ' kph'
        p.distance_to_next = geolib.getDistance(
            {
                latitude: p.latitude,
                longitude: p.longitude
            },
            {
                latitude: next_p.latitude,
                longitude: next_p.longitude
            }
        )
        p.time_spent = parseInt( next_p.time - p.time ) + ' s'
        points_2.push( p )
    } )

    return points_2

}