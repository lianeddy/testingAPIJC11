const db = require('../database');

module.exports = {
    getUsers : (req,res) => {
        console.log(req.query)
        let sql = `SELECT * FROM users where username ='${req.query.username}';`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    getUserbyId : (req,res) => {
        const { id } = req.params;
        let sql =`select * from users where id =${id}`;
        db.query(sql, (err, results) => {
            if(err) res.status(500).send(err)

            res.status(200).send(results)

        })
    },
    deleteUser : (req,res) => {
        console.log(req.params.id)
        let sqldelete = `delete from users where id =${req.params.id};`;
        db.query(sqldelete, (err, results) => {
            if(err) {
                res.send(err).status(500)
            }
            let sqlget = `SELECT * FROM users;`
            db.query(sqlget, (err, results) => {
                if(err){
                    res.status(500).send(err)
                }
                res.status(200).send(results)
            });
        })
    },
    register : (req,res) => {
        console.log(req.body)
        let sqlinsert = `insert into users set ?`
        db.query(sqlinsert, req.body, (err,results) => {
            let sql = `SELECT * FROM users;`
            db.query(sql, (err, results) => {
                if(err){
                    res.status(500).send(err)
                }
                res.status(200).send(results)
            });
        })
    },
    editUser: (req,res) => {
        const { username } = req.body;
        const { id } = req.params;

        let sqlupdate = `update users set username ='${username}' where id = ${id}`
        db.query(sqlupdate, req.body, (err,results) => {
            let sql = `SELECT * FROM users where id = ${id};`
            db.query(sql, (err, results) => {
                if(err){
                    res.status(500).send(err)
                }
                res.status(200).send(results)
            });
        })
    }
}