const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
    const { data, err } = res;

    if (err) {
        if (!err.statusCode) console.log(err);

        res.status(err.statusCode || 500)
          .json({
              error: true,
              message: err.statusCode ? err.message : 'Internal Server Error!'
          });
    } else {
        res.status(200).json({ data });
    }

    next();
};

exports.responseMiddleware = responseMiddleware;
