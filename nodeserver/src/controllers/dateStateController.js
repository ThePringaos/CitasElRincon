const DateState = require('../models/DateState');

/**
 * SYNC ALL MODELS WITH DB
 */
//sequelize.sync();
DateState.sync({ force: false })
    .then(() => {
        console.log('SYNC MODEL DATE_STATE');
    });

const dateStateController = {};

dateStateController.getAll = async (req, res) => {
    DateState.findAll()
        .then(each => {
            const data = JSON.parse(JSON.stringify(each));
            
            return res.json({ success: true, data: data });
        }).catch(err => {
            console.log(err)
        })
};

dateStateController.getId = (req, res) => {
    const { id } = req.params;
    DateState.findAll({ where: { id } })
        .then(each => {
            if (each.length > 0) {
                const data = JSON.parse(JSON.stringify(each));
                
                return res.json({ success: true, data: data });
            } else {
                res.json({ status: `The state doesn't exist` });
            }
        })
        .catch(err => {
            console.log(err)
        })
};

dateStateController.add = (req, res) => {
    const { name } = req.body;
    DateState.create({name})
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

dateStateController.edit = (req, res) => {
    //const {id}=req.params;
    const { id, name } = req.body;
    
    DateState.update({ name },
        { where: { id } })
        .then(each => {
            const data = JSON.parse(JSON.stringify(each));
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


dateStateController.delete = (req, res) => {
    const { id } = req.params;
    DateState.destroy({ where: { id } })
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
module.exports = dateStateController;
