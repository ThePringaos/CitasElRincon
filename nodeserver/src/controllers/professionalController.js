const Professional = require('../models/Professional');

const Department = require('../models/Department');
const Role = require('../models/Role');
const Image = require('../models/Image')

/**
 * SYNC ALL MODELS WITH DB
 */
//sequelize.sync();

Image.sync({ force: false })
.then(() => {
    console.log('SYNC MODEL IMAGE');
});

Professional.sync({ force: false })
    .then(() => {
        console.log('SYNC MODEL PROFESSIONAL');
    });

const professionalController = {};

professionalController.getAll = async (req, res) => {
    Professional.findAll({
        include: [Role,Department,Image]
    })
        .then(each => {
            const data = JSON.parse(JSON.stringify(each));
            return res.json({ success: true, data: data });
        }).catch(err => {
            console.log(err)
        })
};

professionalController.getId = (req, res) => {
    const { id } = req.params;
    Professional.findAll({
        include: [Role,Department,Image]
    },{ where: { id } })
        .then(each => {
            if (each.length > 0) {
                const data = JSON.parse(JSON.stringify(each));
                return res.json({ success: true, data: data });
            } else {
                res.json({ status: `The professional doesn't exist` });
            }
        })
        .catch(err => {
            console.log(err)
        })
};

professionalController.add = async (req, res) => {
    const { email,name,departmentId,roleId,comment,image,tutorId} = req.body;

    let imageId = null;
    if(image!=null){
        await Image.create(image).then(each => {
            imageId = each.id;
        });
    }
    
    Professional.create({ 
        email: email,
        name: name,
        departmentId: departmentId,
        roleId: roleId,
        comment: comment,
        imageId: imageId,
        tutorId: tutorId
    })
        .then(each => {
            if (each.id) {
                res.json({ success: true, message: `Successfully added, id: ${each.id}` });
            } else {
                res.json({ status: 'Error' });
            }
        })
        .catch(err => {
            console.log(err)
        })

}

professionalController.edit = (req, res) => {
    const { id,email,name,departmentId,roleId,comment,imageId, image,tutorId} = req.body;

    //saved image on DB
    if(image!=null && imageId!=null){
        Image.update(image,{
            where: {
                id: imageId
            }
        });
        //new image to save on DB
    }else if(imageId!= null && imageId==null){
        Image.create(image).then(each => {
            imageId = each.id;
        });
    }
    
    Professional.update({ 
        email: email,
        name: name,
        departmentId: departmentId,
        roleId: roleId,
        comment: comment,
        imageId: imageId,
        tutorId,tutorId
    },
        { 
            where: { id } 
        })
        .then(each => {
            const data = JSON.parse(JSON.stringify(each));
            console.log(data);
            if (data.length > 0) {
                res.json({ success: true, message: 'Successfully updated' });
            } else {
                res.json({ status: 'Error' });
            }

        })
        .catch(err => {
            console.log(err)
        })
}


professionalController.delete = (req, res) => {
    const { id } = req.params;
    Professional.destroy({ where: { id } })
        .then(each => {
            const data = JSON.parse(JSON.stringify(each));
            if (data == 1) {
                res.json({ success: true, message: 'Succesfully deleted' });
            } else {
                res.json({ status: 'Error' });
            }

        })
        .catch(err => {
            console.log(err)
        });

}
module.exports = professionalController;
