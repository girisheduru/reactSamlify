const path = require('path');

module.exports = function (app) {

    /*app.get('/home', function (req, res) {
        console.log(JSON.stringify(extract))
        if (true) {
          console.log(" Root Path ----   Authed ::: ")
      
          res.sendFile(path.resolve('build/index.html'));
        } else {
          console.log(" Root Path ----   not Authed ::: ")
          res.redirect('/login/fail');
        }
      });*/

  
    app.get('/login',async (req, res) => {
      const { id, context: redirectUrl } = await req.sp.createLoginRequest(
        req.idp,
        "redirect"
      );
      return res.redirect(redirectUrl);
      }
    );
  
    app.post('/login/callback',
    async (req, res) => {
      try {
        const { extract } = await req.sp.parseLoginResponse(req.idp, "post", req);
        const { givenname, surname } = extract.attributes;
  
        console.log("extract details--> " + JSON.stringify(extract));
        console.log(givenname);
        console.log(surname);
  
        if (givenname) {
          return res.sendFile(path.resolve('build/index.html'));
          
        }
  
        throw new Error("ERR_USER_NOT_FOUND");
      } catch (e) {
        console.error("[FATAL] when parsing login response", e);
        return res.redirect("/login/fail");
      }
    }); 

    app.get('/login/fail', 
    function(req, res) {
    console.log("ReQ--- Fail----");
    res.status(401).send('Login failed');
   }

  );

       
  };