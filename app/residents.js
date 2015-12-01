/**
 * Created by Jon on 11/3/2015.
 */
function getParam(req, key  )
{
    var val = req.body[key];
    return val;
}

exports.new = function(req, res)
    {
     // return a new resident
     res.send( {success: true, data: exports.m.Residents.new() } );
    };

exports.getList = function(req, res)
    {
     exports.m.Residents.find(function(err, data)
       {
        res.json({success: true, data: data});
       });

    };

exports.save = function(req,res)
    {
        console.log("save (post) domain "+JSON.stringify(req.body));
        var id = req.body._id;
        delete req.body["_id"]; //delete _id so mongoose doesnt try to change it
        if ( id == null )
        {
            exports.m.Residents.create( req.body, function(err, rel)
            {
                console.log("rel "+JSON.stringify(rel));
                console.log("err "+JSON.stringify(err));
                if (!err)
                {
                    res.json(rel);
                    res.send();
                    console.log("send back new resident");
                }
                else
                {
                    res.send({success: false});
                }
            });
        }
        else
        {
            delete req.body["_id"]; //delete _id so mongoose doesnt try to change it
            exports.m.Residents.update({"_id": id}, {$set : req.body}, {upsert: false}, function(err, rel)
            {
                console.log("rel "+JSON.stringify(rel));
                console.log("err "+JSON.stringify(err));
                if (!err)
                {
                    res.json(rel);
                    res.send();
                    console.log("send back modified data");
                }
                else
                {
                    res.send({success: false});
                }
            });
        }

    };

exports.init = function(app, model)
  {
   console.log("residents initialized");
   //do init stuff here
  };
