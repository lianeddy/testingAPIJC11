const db = require('../database');

module.exports = {
    getUsers : (req,res) => {
        let sql = `SELECT * FROM users;`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    }
}