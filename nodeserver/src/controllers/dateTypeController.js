const DateType = require('../models/DateType');

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();
DateType.sync({ force: false })
  .then(() => {
    console.log('SYNC MODEL DATE_TYPE');
  });

const dateTypeController = {};

dateTypeController.getAll = async (req, res) => {
  DateType.findAll()
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));

      return res.json({ success: true, data: data });
    }).catch(err => {
      console.log(err);
    });
};

dateTypeController.getId = (req, res) => {
  const { id } = req.params;
  DateType.findAll({ where: { id } })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));

        return res.json({ success: true, data: data });
      } else {
        res.json({ status: 'The date type doesn\'t exist' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

dateTypeController.add = (req, res) => {
  const { name } = req.body;
  DateType.create({ name })
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

dateTypeController.edit = (req, res) => {
  // const {id}=req.params;
  const { id, name } = req.body;

  DateType.update({ name },
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

dateTypeController.delete = (req, res) => {
  const { id } = req.params;
  DateType.destroy({ where: { id } })
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
module.exports = dateTypeController;
