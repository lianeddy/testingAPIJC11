const db = require('../database');
const { uploader } = require('../helper/uploader');
const fs = require('fs');


module.exports = {
    uploadImage : (req,res) => {
        console.log('uploader')
        try{
            const path = '/images'
            const upload = uploader(path, 'IMG').fields([{ name : 'image' }])

            upload(req,res, (err) => {
                if(err){
                    return res.status(500).send({message : 'error'})
                }
                const {image} = req.files;
                const imagePath = image ? path +'/' + image[0].filename : null
                let data = {
                    imagepath : imagePath
                }
                
                let sql = 'insert into images set ?';
                db.query(sql, data, (err,results) => {
                    if(err){
                        console.log(err)
                        fs.unlinkSync('./public' + imagePath)
                        return res.status(500).send({message : 'error'})
                    }
                    return res.status(200).send(results)
                })
            })
        }
        catch(err){
            return res.status(500).send({message: 'error'})
        }
    }
}