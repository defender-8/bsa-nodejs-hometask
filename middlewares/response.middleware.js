const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
    const { data, err } = res;

    if (err) {
        res.status(err.statusCode || 500).json({ error: true, message: err.message });
    } else {
        res.status(200).json({ data });
    }

    next();
};

exports.responseMiddleware = responseMiddleware;
