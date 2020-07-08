const Timetable = require('../models/Timetable');

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();
Timetable.sync({ force: false })
  .then(() => {
    console.log('SYNC MODEL TIMETABLE');
  });

const timetableController = {};

timetableController.getAll = async (req, res) => {
  Timetable.findAll().then(each => {
    const data = JSON.parse(JSON.stringify(each));
    return res.json({ success: true, data: data });
  }).catch(err => {
    console.log(err);
  });
};

timetableController.getId = (req, res) => {
  const { id } = req.params;
  Timetable.findAll({ where: { id } })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));
        return res.json({ success: true, data: data });
      } else {
        res.json({ status: 'The timetable doesn\'t exist' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

timetableController.add = (req, res) => {
  const { monday, tuesday, wednesday, thursday, friday } = req.body;
  Timetable.create({ monday, tuesday, wednesday, thursday, friday })
    .then(each => {
      if (each.id) {
        res.json({ success: true, message: `Successfully added, id: ${each.id}`, id: each.id });
      } else {
        res.json({ status: 'Error' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

timetableController.edit = (req, res) => {
  const { id, monday, tuesday, wednesday, thursday, friday } = req.body;

  Timetable.update({ monday, tuesday, wednesday, thursday, friday },
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

timetableController.delete = (req, res) => {
  const { id } = req.params;
  Timetable.destroy({ where: { id } })
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
module.exports = timetableController;
