const Portalapis = require('../lib/portalapis')



module.exports = app => {
    class AttendanceController extends app.Controller{
        * leave(){



            const {request, response}  = this.ctx;
            console.log('app.config:',app.config);


            const portalapis = new Portalapis(app.config);

            console.log('sign:', portalapis.sign());

            //console.log('request:',req);

            // console.log('request.path:',request.path);
            // console.log('request.queryString:',request.queryString);
            // console.log('request.search:',request.search);
            // console.log('request.host:',request.host);
            // console.log('request.hostname:',request.hostname);
            // console.log('request.hostname:',request.hostname);

        }
    }


    return  AttendanceController;
}