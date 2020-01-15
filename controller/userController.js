const db = require('../database');

module.exports = {
    getUsers : (req,res) => {
        console.log(req.query)
        let { username, password } = req.query;
        let sql = `SELECT * FROM users;`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    }
}