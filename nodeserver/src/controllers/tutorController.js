const Tutor = require('../models/Tutor');

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();
Tutor.sync({ force: false })
  .then(() => {
    console.log('SYNC MODEL TUTOR');
  });

const tutorController = {};

tutorController.getAll = async (req, res) => {
  Tutor.findAll()
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));

      return res.json({ success: true, data: data });
    }).catch(err => {
      console.log(err);
    });
};

tutorController.getId = (req, res) => {
  const { id } = req.params;
  Tutor.findAll({ where: { id } })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));

        return res.json({ success: true, data: data });
      } else {
        res.json({ status: 'The tutor doesn\'t exist' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

tutorController.add = (req, res) => {
  const { name } = req.body;
  Tutor.create({ name })
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

tutorController.edit = (req, res) => {
  // const {id}=req.params;
  const { id, name } = req.body;

  Tutor.update({ name },
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

tutorController.delete = (req, res) => {
  const { id } = req.params;
  Tutor.destroy({ where: { id } })
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
module.exports = tutorController;
