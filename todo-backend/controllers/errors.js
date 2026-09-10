exports.pageNotFound = (req, res, next) => {
  res.status(404).json({ message: "Page not found" });
};

// Last-resort handler so failures answer with JSON instead of an HTML error page.
exports.handleError = (error, req, res, next) => {
  if (res.headersSent) return next(error);
  // Log server-side: the client response is deliberately generic.
  console.error(`${req.method} ${req.originalUrl} failed:`, error);
  res.status(error.status || 500).json({ message: "Something went wrong" });
};
