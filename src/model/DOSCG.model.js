const db = require('../../db')

class DOSCGModel {
    readGoogleApiKey() {
        return db.get('googleApiKey').value()
    }
    setGoogleApiKey(source = 'Central+World,+Rama+I+Road,+Pathum+Wan,+Pathum+Wan+District,+Bangkok,+Thailand',destination = 'SCG+สำนักงานใหญ่+บางซื่อ+Siam+Cement+Alley,+Bang+Sue,+Bangkok,+Thailand',avoidList = ['tolls','highways']){
        db.set('googleApiKey.source',source)
            .write()
        db.set('googleApiKey.destination',destination)
            .write()
        db.set('googleApiKey.avoidList',avoidList)
            .write()
        db.set('googleApiKey.key','AIzaSyDKJi-zmJtmTmYqH9rveBlhsLbeNmFRZpE')
            .write()
    }
    writeLineLog(data){
        db.set('lineLog')
            .push(data)
            .write()
    }
    readLineLog(){
        db.get('lineLog')
    }
}

module.exports = DOSCGModel
