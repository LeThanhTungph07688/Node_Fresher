const express = require('express');
const router = express.Router();
const { createSkill,
  getSkill,
  editSkill,
  deleteSkill,
  getSkillId } = require('../controller/SkillController');

const AuthMiddleware = require('../middleware/AuthMiddleware');

router.route('/skills')
  .post(AuthMiddleware.isAuth, createSkill)
  .get(AuthMiddleware.isAuth, getSkill);
router.route('/skills/:id')
  .get(AuthMiddleware.isAuth, getSkillId)
  .put(AuthMiddleware.isAuth, editSkill)
  .delete(AuthMiddleware.isAuth, deleteSkill);

module.exports = router;
