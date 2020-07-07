const Role = require('../models/Role');

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();
Role.sync({ force: false })
  .then(() => {
    console.log('SYNC MODEL ROLE');
  });

const roleController = {};

roleController.getAll = async (req, res) => {
  Role.findAll()
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));

      return res.json({ success: true, data: data });
    }).catch(err => {
      console.log(err);
    });
};

roleController.getId = (req, res) => {
  const { id } = req.params;
  Role.findAll({ where: { id } })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));

        return res.json({ success: true, data: data });
      } else {
        res.json({ status: 'The role doesn\'t exist' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

roleController.add = (req, res) => {
  const { name } = req.body;
  Role.create({ name })
    .then(each => {
      if (each.id) {
        res.json({ success: true, message: `Successfully added, id: ${each.id}` });
      } else {
        res.json({ status: 'Error' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

roleController.edit = (req, res) => {
  // const {id}=req.params;
  const { id, name } = req.body;

  Role.update({ name },
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
      console.log(err);
    });
};

roleController.delete = (req, res) => {
  const { id } = req.params;
  Role.destroy({ where: { id } })
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));
      if (data == 1) {
        res.json({ success: true, message: 'Succesfully deleted' });
      } else {
        res.json({ status: 'Error' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports = roleController;
