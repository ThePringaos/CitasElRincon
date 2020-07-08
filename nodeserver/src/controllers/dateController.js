const Date = require('../models/Date');

const Professional = require('../models/Professional');
const DateType = require('../models/DateType');
const DateState = require('../models/DateState');

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();
Date.sync({ force: false })
  .then(() => {
    console.log('SYNC MODEL DATE');
  });

const dateController = {};

dateController.getAll = async (req, res) => {
  Date.findAll({
    include: [Professional, DateType, DateState]
  })
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));
      return res.json({ success: true, data: data });
    }).catch(err => {
      console.log(err);
    });
};

dateController.getId = (req, res) => {
  const { id } = req.params;
  Date.findAll({ where: { id } })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));
        return res.json({ success: true, data: data });
      } else {
        res.json({ status: 'The date doesn\'t exist' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

dateController.getDate = (req, res) => {
  const { id, day } = req.body;

  // TODO get dateStateId confirmado from dateStates table, not like this.
  Date.findAll({
    include: [{ model: DateType }],
    where: { professionalId: id, date: day, dateStateId: 1 }
  })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));
        return res.json({ success: true, data: data });
      } else {
        res.json({ status: 'The date doesn\'t exist' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

dateController.add = (req, res) => {
  const { email, date, time, professionalId, dateTypeId, dateStateId } = req.body;
  Date.create({ email, date, time, professionalId, dateTypeId, dateStateId })
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

dateController.edit = (req, res) => {
  const { id, email, name, departmentId, roleId, comment } = req.body;

  Date.update({ email, name, departmentId, roleId, comment },
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
      console.log(err);
    });
};

dateController.delete = (req, res) => {
  const { id } = req.params;
  Date.destroy({ where: { id } })
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));
      if (data === 1) {
        res.json({ success: true, message: 'Succesfully deleted' });
      } else {
        res.json({ status: 'Error' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports = dateController;
