const db = require('../database');
const { createJWTToken } = require('../helper/jwt');

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
    login : (req,res) => {
        const { username, password } = req.body;
        let sql = `select * from users where username = '${username}' and password = '${password}';`;

        db.query(sql, (err, results) => {
            if(err) res.status(500).send(err);

            let { id, username, password, email, address } = results[0]
            // const token = createJWTToken({
            //     id,
            //     username    
            // })
            return res.status(200).send({
                id,
                username, 
                password, 
                // email,
                // token
            })
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
            console.log(results)
            let sql = `SELECT * FROM users where id = ${results.insertId};`
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
    },
    changePass : (req,res) => {
        const {username, password, newPass} = req.body;
        // const { id } = req.params;
        
        let sql = `select * from users where username = '${username}' and password = '${password}';`;
        db.query(sql, (err, resultsGet) => {
            if(err) res.send(err).status(500)
            console.log(resultsGet, 'get')

            if(resultsGet && resultsGet.length !== 0){
                let sqledit = `update users set password = '${newPass}' where id = ${resultsGet[0].id};`;

                db.query(sqledit, (err,resultsUpdate) => {
                    console.log(resultsUpdate, 'update')
                    if(err) res.send(err).status(500)

                    let sql =`select * from users where id =${resultsGet[0].id}`;
                    db.query(sql, (err, resultsNewData) => {
                        if(err) res.status(500).send(err)
                    
                        res.status(200).send(resultsNewData)
                        console.log(resultsGet, 'newDataGet')
                    
                    })

                })
            }else{
                res.send({
                    error: 'Invalid Password'
                }).status(200)
            }
        })
    }
}