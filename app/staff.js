/**
 * Created by Jon on 11/8/2015.
 */
function getParam(req, key  )
{
    var val = req.body[key];
    return val;
}
function send(data, res)
  {
   //send a success response back
   res.json( {success: true, data: data});
  }
function fail(res)
  {
   res.json({success: false})
  }

exports.login = function(req, res)
  {
    var user=getParam(req, "user");
    var pass=getParam(req, "pass");

    console.log("Login user "+user);
    exports.m.Staff.find( {"user":user}, function(err, rel)
      {
       console.log(err);
       console.log(rel);
       res.setHeader("x-sers-auth-token","token")
       send(rel[0], res);
       //res.send({success: true, result : "token"});
       return;
      });
  };

exports.new = function(req, res)
  {
   send(exports.m.Staff.new(), res);
  };

exports.getList = function(req, res)
  {
   exports.m.Staff.find(function(err, data)
      {
       send(data, res);
      }
   )
  };

exports.save = function(req,res)
  {
    console.log("save (post) domain "+JSON.stringify(req.body));
    var id = req.body._id;
    delete req.body["_id"]; //delete _id so mongoose doesnt try to change it
    if ( id == null )
    {
        exports.m.Staff.create( req.body, function(err, rel)
        {
            console.log("rel "+JSON.stringify(rel));
            console.log("err "+JSON.stringify(err));
            if (!err)
              {
               console.log("send back new Staff");
               send(rel, res);
              }
            else
              {
               fail(res);
              }
        });
    }
    else
    {
        delete req.body["_id"]; //delete _id so mongoose doesnt try to change it
        exports.m.Staff.update({"_id": id}, {$set : req.body}, {upsert: false}, function(err, rel)
          {
           console.log("rel "+JSON.stringify(rel));
           console.log("err "+JSON.stringify(err));
           if (!err)
             {
              console.log("send back modified Staff");
              send(data, res);
             }
            else
             {
              fail(res);
             }
        });
    }
  };

exports.getRoleList = function(req, res)
  {
   exports.m.LoginRole.find(function(err, data)
      {
       send(data, res);
      });
  };

exports.init = function(app, model)
  {
   //do init stuff here
   console.log("Staff initialized");
  };

