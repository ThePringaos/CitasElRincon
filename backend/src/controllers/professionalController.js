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

const Professional = require('../models/Professional');

const Department = require('../models/Department');
const Role = require('../models/Role');
const Image = require('../models/Image');
const Timetable = require('../models/Timetable');

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();

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
      } else {
        res.json({ status: 'The professional doesn\'t exist' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

professionalController.getWithEmail = (req, res) => {
  const { email } = req.body;
  Professional.findAll({ where: { email } })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));
        return res.json({ success: true, data: data });
      } else {
        res.json({ status: 'The email doesn\'t exist' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

async function checkImageExistance (image) {
  await Image.findAll({
    where: { id: image.id }
  })
    .then(async each => {
      if (each.length == 0) {
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
        res.json({ success: true, message: `Successfully added, id: ${each.id}` });
      } else {
        res.json({ status: 'Error' });
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
    checkImageExistance(image);
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
        res.json({ status: 'Error' });
      }
    })
    .catch(err => {
      console.log(err);
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
        res.json({ status: 'Error' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports = professionalController;
