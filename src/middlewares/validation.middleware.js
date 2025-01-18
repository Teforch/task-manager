import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().min(1).max(255),
    surname: yup.string().min(1).max(255),
    email: yup.string().email().required().max(255),
    password: yup.string().min(3).max(255),
})

export default async (req, res, next, redirectPath = '/users/new') => {
    try {
        await schema.validate(req.body);
        next();
    } catch (err) {
        req.flash("error_msg", err.message);
        res.redirect(redirectPath);
    }
}