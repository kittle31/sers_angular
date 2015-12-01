exports.init = function(app, model)
  {
   //Load & init app code
   var resident   = require('./residents');
   var staff   = require('./Staff');
   resident.m = model;
   staff.m = model;

   resident.init(app, model);
   staff.init(app, model);

   app.post('/api/login', staff.login);

   app.get('/api/newStaff', staff.new);
   app.get('/api/getStaffList', staff.getList);
   app.post('/api/saveStaff', staff.save);
   app.get('/api/getRoleList', staff.getRoleList);

   app.get('/api/newResident', resident.new);
   app.get('/api/getResidentList', resident.getList);
   app.post('/api/saveResident', resident.save);
  };
