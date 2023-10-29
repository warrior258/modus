const ValidateReqData  = require("./ValidateReqData");

describe('ValidateReqData', () => { 

    let req = {
        body: {}
      };
      
      const res = {
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
        send: jest.fn()
      };
      
      const next = jest.fn();
      
      it("should throw error when the body is an empty object", async () => {
        ValidateReqData(req, res, next);
        
        await expect(res.status).toHaveBeenCalledWith(400);
        await expect(res.status().send).toHaveBeenCalledWith("No body received");
        await expect(next).not.toHaveBeenCalled();
      });
      
      it("should throw error when body object has more the 4 keys", async () => {

        // Here I added an extra key
        req.body = {
            "firstName": "demo",
            "lastName": "demo",
            "email": "demo",
            "phoneNo": "demo",
            "extra": "demo",
        }

        ValidateReqData(req, res, next);
        
        await expect(res.status).toHaveBeenCalledWith(400);
        await expect(res.status().send).toHaveBeenCalledWith("Received unwanted data");
        await expect(next).not.toHaveBeenCalled();
      });

      it("should throw error when body object contains the keys that are not mapped in the csv file", async () => {

        // Here I have entered the wrong names for the key
        req.body = {
            "firsttNameee": "demo",
            "lastnamee": "demo",
            "emaill": "demo",
            "phone": "demo",
        }

        ValidateReqData(req, res, next);
        
        await expect(res.status).toHaveBeenCalledWith(400);
        await expect(res.status().send).toHaveBeenCalledWith("Invalid data");
        await expect(next).not.toHaveBeenCalled();
      });

      it("should throw error when any value of the body object is empty", async () => {

        req.body = {
            "firstName": "demo",
            "lastName": "",
            "email": "",
            "phoneNo": "",
        }

        ValidateReqData(req, res, next);
        
        await expect(res.status).toHaveBeenCalledWith(400);
        await expect(res.status().send).toHaveBeenCalledWith("All fields are required!");
        await expect(next).not.toHaveBeenCalled();
      });

      it("should throw error when email is invalid or length of phoneNo is greater then 10", async () => {

        req.body = {
            "firstName": "demo",
            "lastName": "demo",
            "email": "demo",
            "phoneNo": "123132132131",
        }

        ValidateReqData(req, res, next);
        
        await expect(res.status).toHaveBeenCalledWith(400);
        await expect(res.status().send).toHaveBeenCalledWith("Invalid email or phoneNo");
        await expect(next).not.toHaveBeenCalled();
      });

      it("should call the next function if everthing is fine", async () => {

        req.body = {
            "firstName": "john",
            "lastName": "weak",
            "email": "john@gmail.com",
            "phoneNo": "8564231465",
        }

        ValidateReqData(req, res, next);
        await expect(next).toHaveBeenCalled();
      });
 })