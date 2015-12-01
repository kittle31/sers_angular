/**
 * Created by Jon on 10/31/2015.
 */
function phone()
{
    var d = {ac : 360, prefix: 0, suffix: 0 };
    return d;
}

module.exports = function(mongoose)
  {
    var loginRole = mongoose.Schema({
        name : String
    });
    var person = mongoose.Schema({
        firstName: String,
        lastName: String,
        login: String,
        password: String,
        startDate: Date,
        active: Boolean,
        roles: [String]
    });
    person.statics.new = function()
      {
       return {
         firstName : "",
         lastName : "",
         login : "",
         password : "",
         startDate : new Date(),
         active : true,
         roles: []
       };
      };
    var resident = mongoose.Schema({
        firstName: String,
        lastName: String,
        startDate: Date,
        active: Boolean,
        birthdate: Date,
        address: {addressLine1: String, apartmentNumber: String, city: String, st: String, zipCode: Number},
        ssn: String,
        homePhone: {ac: Number, prefix: Number, suffix: Number},
        cellPhone: {ac: Number, prefix: Number, suffix: Number},
        messagePhone: {ac: Number, prefix: Number, suffix: Number},
        exitDate: Date,
        allergy: String,
        emContactName: String,
        emContactPhone: {ac: Number, prefix: Number, suffix: Number},
        referredBy: String,
        referredPhone: {ac: Number, prefix: Number, suffix: Number},
        phaseStatus: String
    });
    resident.statics.new = function () {
        // Create a new resident to be used on the client
        var d = {
            firstName: "f",
            lastName: "l",
            startDate: new Date(),
            active: true,
            birthdate: null,
            address: {addressLine1: "", apartmentNumber: "", city: "", st: "WA", zipCode: 0},
            ssn: "000-00-0000",
            homePhone: phone(),
            cellPhone: phone(),
            messagePhone: phone(),
            exitDate: null,
            allergy: "",
            emContactPhone: phone(),
            referredBy: "",
            referredPhone: phone(),
            phaseStatus: "Phase 1"
        };
        return d;
    };

    console.log("SERS model loaded");
    return {
        LoginRole : mongoose.model('LoginRole', loginRole, 'loginRoles'),
        Staff: mongoose.model('Staff', person, 'staff'),
        Residents: mongoose.model('Residents', resident, 'residents')
    };

};

