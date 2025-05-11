function verifyAdmin(req, res, next) {
        if (req.session && req.session.isAdmin) {
          next();
        } else {
          res.status(401).send("Unauthorized access. Admins only.");
        }
      }
      
      module.exports = verifyAdmin;