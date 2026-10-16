const passwordModel = require("../models/password.model")

async function createPassword(req, res) {
    const { title, url, username, password } = req.body

    try {
        const savePassword = await passwordModel.create({
            title,
            url,
            username,
            password,
            userId: req.user.id
        })

        return res.status(201).json({
            message: "Password created",
            savePassword: {
                title: savePassword.title,
                url: savePassword.url,
                username: savePassword.username,
                password: savePassword.password,
                userId: savePassword.userId

            }

        })
    } catch (error) {
        return res.status(401).json({
            message: "error"
        })
    }
}

async function getPassword(req, res) {
    try {

        

        const passwords = await passwordModel.find({
            userId: req.user.id
        });

     

        return res.status(200).json({
            message: "password fetched successfully",
            passwords: passwords
        });

    } catch (error) {

       

        return res.status(500).json({
            message: error.message
        });
    }
}

async function updatePassword(req, res) {
    const { title, url, username, password } = req.body
    try {
      
        const pass = await passwordModel.findOne({
            _id: req.params.id,
            userId: req.user.id
        })
        
        if (pass == null) {
            return res.status(403).json({
                message: "error"
            })
        }
       
            pass.title = title,
            pass.url = url,
            pass.username = username;
            pass.password = password;
        await pass.save()
         return res.status(200).json({
            message: "Password updated",
            pass: {
                title: pass.title,
                url: pass.url,
                username:pass.username,
                password: pass.password,
                userId: pass.userId

            }

        })

    } catch (error) {
        return res.status(401).json({
            message: "error"
        })
    }
}

async function deletePassword(req, res) {
    try {
       
        const pass = await passwordModel.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

     

        if (pass == null) {
            return res.status(403).json({
                message: "Password not found for this user"
            });
        }

        await pass.deleteOne();

        return res.status(200).json({
            message: "Password deleted"
        });

    } catch (error) {
      

        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { createPassword, getPassword, updatePassword,deletePassword }