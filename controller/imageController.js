const db = require('../database');
const { uploader } = require('../helper/uploader');
const fs = require('fs');


module.exports = {
    uploadImage : (req,res) => {
        console.log('uploader')
        console.log(req.files)
        try{
            const path = '/images'
            const upload = uploader(path, 'IMG').fields([{ name : 'image' }])

            upload(req,res, (err) => {
                if(err){
                    return res.status(500).send({message : 'error'})
                }
                const {image} = req.files;
                const imagePath = image ? path +'/' + image[0].filename : null

                console.log(req.body.data)
                const data = JSON.parse(req.body.data)
                data.imagepath = imagePath
                
                let sql = 'insert into images set ?';
                db.query(sql, data, (err,results) => {
                    if(err){
                        console.log(err)
                        fs.unlinkSync('./public' + imagePath) //kalo error delete file
                        return res.status(500).send({message : 'error'})
                    }
                    return res.status(200).send(results)
                })
            })
        }
        catch(err){
            return res.status(500).send({message: 'error'})
        }
    },
    getAllImages : (req,res) => {
        console.log(req.query)
        let sql = `SELECT * FROM images;`
        db.query(sql, (err, results) => {
            if(err){
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    deleteImage : (req,res) => {
        console.log(req.query)
        let sql =  `delete from images where id =${req.query.id} and imagepath='${req.query.imagepath}';`
        db.query(sql, (err, results) => {
            if(err) res.send(err)

            fs.unlinkSync('./public' + req.query.imagepath)
            
        })
    }, editImage: (req,res) => {
        let {id} = req.params;
        let sqlget = `select * from images where id = ${id}`

        db.query(sqlget, (err,results) => {
            let oldPath = results[0].imagepath;

            try{
                const path = '/images';
                const upload =uploader(path, 'IMG').fields([{ name : 'image' }])

                upload(req,res, (err) => {
                    if(err){
                        return res.status(500).send({message : 'error'})
                    }
                    const {image} = req.files;
                    const imagePath = image ? path +'/' + image[0].filename : null
    
                    console.log(req.body.data)
                    const data = JSON.parse(req.body.data)
                    data.imagepath = imagePath
                    
                    let sql = `update images set set imagepath =${imagePath} where id = ${id}`;
                    db.query(sql, data, (err,results) => {
                        if(err){
                            console.log(err)
                            fs.unlinkSync('./public' + imagePath) //kalo error delete file
                            return res.status(500).send({message : 'error'})
                        }
                        if(image){
                            fs.unlinkSync('./public' + oldPath)
                        }
                        return res.status(200).send(results)
                    })
                })
            }catch{

            }
        })

    }
}