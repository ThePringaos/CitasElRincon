/*
 *  Copyright (C) 2020  Unknown
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

const DateType = require('../models/DateType');

const controller = 'datetype';

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();
DateType.sync({ force: false })
  .then(() => {
    console.log(`SYNC MODEL ${controller.toUpperCase()}`);
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
        res.status(400).json({ status: `The ${controller} doesn't exist` });
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
        res.status(400).json({ status: `The ${controller} couldn't be added` });
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
        res.status(400).json({ status: `The ${controller} couldn't be updated` });
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
module.exports = dateTypeController;
