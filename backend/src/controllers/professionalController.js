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

const Professional = require('../models/Professional');

const Department = require('../models/Department');
const Role = require('../models/Role');
const Image = require('../models/Image');
const Timetable = require('../models/Timetable');

const controller = 'professional';
const controllerDep1 = 'image';

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();
Image.sync({ force: false })
  .then(() => {
    console.log(`SYNC MODEL ${controllerDep1.toUpperCase()}`);
  });

Professional.sync({ force: false })
  .then(() => {
    console.log(`SYNC MODEL ${controller.toUpperCase()}`);
  });

const professionalController = {};

professionalController.getAll = (req, res) => {
  Professional.findAll({
    include: [Role, Department, Image]
  })
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));
      return res.json({ success: true, data: data });
    }).catch(err => {
      console.log(err);
    });
};

professionalController.getId = (req, res) => {
  const { id } = req.params;
  Professional.findAll({
    include: [{ model: Timetable }],
    where: { id }
  })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));
        return res.json({ success: true, data: data });
      } else if (each.length === 0) {
        return res.json({ success: false, data: null });
      } else {
        res.status(400).json({ status: 'Unexpected error' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

professionalController.getWithEmail = (req, res) => {
  const { email } = req.body;
  Professional.findAll({ where: { email: email } })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));
        return res.json({ success: true, data: data });
      } else if (each.length === 0) {
        return res.json({ success: false, data: null });
      } else {
        res.status(400).json({ status: 'Unexpected error' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

professionalController.getWithDepartmentId = (req, res) => {
  const { id } = req.params;
  Professional.findAll({ where: { departmentId: id } })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));
        return res.json({ success: true, data: data });
      } else if (each.length === 0) {
        return res.json({ success: false, data: null });
      } else {
        res.status(400).json({ status: 'Unexpected error' });
      }
    })
    .catch(err => {
      console.log('ERROR TOKEN -> ', err);
    });
};

async function checkImageExistance (image) {
  await Image.findAll({
    where: { id: image.id }
  })
    .then(async each => {
      if (each.length === 0) {
        await Image.create(image).catch(err => {
          console.log(err);
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

professionalController.add = async (req, res) => {
  const { email, name, departmentId, roleId, comment, image, tutorId } = req.body;

  let imageId = null;
  if (image != null) {
    await checkImageExistance(image);
    imageId = image.id;
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
        res.json({ success: true, message: 'Successfully added', id: each.id });
      } else {
        res.status(400).json({ status: `The ${controller} couldn't be added` });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

professionalController.edit = async (req, res) => {
  const { id, email, name, departmentId, timetableId, roleId, comment, image, tutorId } = req.body;
  let finalId = null;

  if (image != null) {
    finalId = image.id;
    await checkImageExistance(image);
  }

  Professional.update({
    email: email,
    name: name,
    departmentId: departmentId,
    timetableId: timetableId,
    roleId: roleId,
    comment: comment,
    imageId: finalId,
    tutorId: tutorId
  },
  {
    where: { id }
  })
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));
      if (data.length > 0) {
        res.json({ success: true, message: 'Successfully updated' });
      } else {
        res.status(400).json({ status: `The ${controller} couldn't be updated` });
      }
    })
    .catch(err => {
      console.log('ERROR UPDATING PROFESSIONAL' + err);
    });
};

professionalController.delete = (req, res) => {
  const { id } = req.params;
  Professional.destroy({ where: { id } })
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
module.exports = professionalController;
