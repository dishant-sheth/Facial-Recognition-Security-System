const express = require('express');
const multer = require('multer');
const router = express.Router();

const userSvc = require('../services/userSvc');
const logSvc = require('../services/logSvc');
const image_upload = require('../lib/file_upload');

router.post('/', (req, res) => {
  userSvc.createUser(req.body)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(error.code).send(error);
    });
});

router.post('/:id', multer({ storage: image_upload.storage}).single('upload'), (req, res) => {
  res.status(200).send({ message: 'Image uploaded successfully.'});
});

router.get('/', (req, res) => {
  userSvc.getUsers()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(error.code).send(error);
    });
});

router.get('/:id', (req, res) => {
  userSvc.findUser(req.params.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(error.code).send(error);
    });
});

router.delete('/:id', (req, res) => {
  userSvc.deleteUser(req.params.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(error.code).send(error);
    });
});

router.get('/check-time-permission/:id', (req, res) => {
  let message;
  userSvc.checkTimePermission(req.params.id)
    .then((result) => {
      message = result;
      const logData = {
        user_id: req.params.id,
      };
      return logSvc.addLog(logData); 
    })
    .then((response) => {
      res.status(200).send(message);
    })
    .catch((error) => {
      res.status(error.code).send(error);
    });
});

module.exports = router;
