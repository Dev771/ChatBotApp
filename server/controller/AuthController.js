import User from '../Model/UserSchema.js'

//User Registration Controller
export const userRegister = async (req, res) => {
    let user;
    try {
        user = await User.findOne({ email: req.body.email });
    } catch(err) {
        return res.status(400).json({ status: "error", msg: "An UnExpected Error Occured Please Try Agian" })
    }

    if(user) {
        res.status(400).json({ status: "error", msg: "User Already Exists!!!" });
    } else {
        const newUser = req.body;
        try {
            if(await User.findOne({ username: req.body.username })) {
                res.status(400).json({ status: "error", msg: "Username Already Exists!!!" });
            } else {
                const createdUser = await User.create(newUser);
    
                if(createdUser) {
    
                    const newCreatedUser = await User.findOne({email: req.body.email}, {password: 0});
    
                    res.status(200).json({ status: "success", data: newCreatedUser, msg: "User Created Successfully!!!" });
                } else {
                    res.status(400).json({ status: "error", msg: "Error While Creating User Please Try Again!!" })
                }
            }
        } catch(err) {
            return res.status(400).json({ status: "error", msg: "An UnExpected Error Occured Please Try Agian" })
        }

    }

}

//Login Controller
export const userLogin = async (req, res) => {
    let user;
    try {
        user = await User.findOne({ email: req.body.email, password: req.body.password }, { password: 0 });
    } catch(err) {
        return res.status(400).json({ status: "error", msg: "An UnExpected Error Occured Please Try Agian" })
    }
    if(user) {
        res.status(200).json({ status: "success", data: user, msg: "User Logged In SuccessFully!!!!" })
    } else {
        res.status(400).json({ status: "error", msg: "No Such User Found!!!" });
    }

}