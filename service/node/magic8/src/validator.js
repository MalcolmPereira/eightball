import Joi from "joi";

const predictschema = Joi.object().keys({
    statement: Joi.string().min(10).max(256).required(),
});

const validate = (request, schema) => {
    let result = schema.validate(request, { abortEarly: false });
    if (result.error && result.error.details) {
        let errorMessage = [];
        result.error.details.forEach(function (e) {
            errorMessage.push(e.message);
        });
        result = { "error": errorMessage };
        return result;
    } else {
        return result.value;
    }
};


export {
    predictschema,
    validate
};