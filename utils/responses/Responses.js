function success(req, res, status, message, data){
    return res.status(status || 200).send({
        message: message || "",
        body: data || [],
    });
}

function error(req, res, status, error, data){
    return res.status(status || 500).send({
        message: error || "",
        body: data || [],
    });
}

module.exports = {
    success,
    error
}