const User = require('../../schema/User');
const passwordHash = require('password-hash');
const account = {};

account.signup = async function(req, res) {
    const { password, email } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            text: "invalid request"
        });
    }
    //hash password in a user object
    const user = {
        email,
        password: passwordHash.generate(password)
    };
    //check if the user already exists
    try {
        const findUser = await User.findOne({
            email
        });
        if (findUser) {
            return res.status(400).json({
                text: "user already exists!"
            });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
    try {
        //save user in db
        const userData = new User(user);
        const userObject = await userData.save();
        return res.status(200).json({
            text: "success",
            token: userObject.getToken()
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

account.login = async function(req, res) {
    const { password, email } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            text: "invalid request"
        });
    }
    try {
        //check if user exists
        const findUser = await User.findOne({ email });
        if (!findUser)
            return res.status(401).json({
                text: "this user does not exist"
            });
        if (!findUser.authenticate(password))
            return res.status(401).json({
                text: "invalid password"
            });
        return res.status(200).json({
            token: findUser.getToken(),
            text: "authenticated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}

module.exports = account;