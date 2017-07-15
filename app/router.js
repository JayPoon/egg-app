'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/api/leave', 'attendance.leave');
};
