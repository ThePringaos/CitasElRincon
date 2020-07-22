/*
 *  Copyright (C) 2020 ThePringaos
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const Timetable = require('../models/Timetable');

const controller = 'timetable';

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();
Timetable.sync({ force: false })
  .then(() => {
    console.log(`SYNC MODEL ${controller.toUpperCase()}`);
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
        res.status(400).json({ status: `The ${controller} doesn't exist` });
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
        res.json({ success: true, message: 'Successfully added', id: each.id });
      } else {
        res.status(400).json({ status: `The ${controller} couldn't be added` });
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
        res.status(400).json({ status: `The ${controller} couldn't be updated` });
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
        res.status(400).json({ status: `The ${controller} couldn't be deleted` });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports = timetableController;
