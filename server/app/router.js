'use strict';

const PREFIX = '/api';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  router.post(`${PREFIX}/wx/login`, controller.employee.login);
  router.post(`${PREFIX}/wx/bind`, controller.employee.bind);

  router.get(`${PREFIX}/canteen/getCanteenList`, jwt, controller.canteen.get);
};
