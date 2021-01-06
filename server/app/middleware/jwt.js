'use strict';

module.exports = (options) => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    let decode;
    if (token) {
      try {
        decode = ctx.app.jwt.verify(token, options.secret);
        ctx.state.empId = decode.empId;
        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          msg: error.message,
        };
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: 'no authorization token',
      };
    }
  };
};
