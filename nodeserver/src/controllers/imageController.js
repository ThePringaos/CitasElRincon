const Image = require('../models/Image');

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();
Image.sync({ force: false })
  .then(() => {
    console.log('SYNC MODEL IMAGE');
  });

const imageController = {};

imageController.getAll = async (req, res) => {
  Image.findAll()
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));

      return res.json({ success: true, data: data });
    }).catch(err => {
      console.log(err);
    });
};

imageController.getId = (req, res) => {
  const { id } = req.params;
  Image.findAll({ where: { id } })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));

        return res.json({ success: true, data: data });
      } else {
        res.json({ status: 'The image doesn\'t exist' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

imageController.add = (req, res) => {
  const { name, type, data } = req.body;
  Image.create({ name, type, data })
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

imageController.delete = (req, res) => {
  const { id } = req.params;
  Image.destroy({ where: { id } })
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
module.exports = imageController;
