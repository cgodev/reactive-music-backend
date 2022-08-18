function success(req, res, status, message, data){
    return res.status(status || 200).send({
        message: message || "",
        data: data || [],
    });
}

function error(req, res, status, error, data){
    return res.status(status || 500).send({
        error: error || "",
        data: data || [],
    });
}

module.exports = {
    success,
    error
}