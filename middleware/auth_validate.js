
const validate = (schema) => async (req, res, next) =>{
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody;
        next();
    } catch (error) {
        const messageInsider = error.errors[0].message;
        const message = "Plz., fill all the input fields"
        const status = 422;
        const err = {status, messageInsider, message}
        next(err)
        // res.status(400).json({msg: message})
    }
}
module.exports = validate