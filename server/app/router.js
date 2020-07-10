'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/wx/login', controller.employee.login);
  router.post('/wx/bind', controller.employee.bind);
};
