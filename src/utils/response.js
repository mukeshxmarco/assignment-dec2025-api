/**
 * Standard success response format
 */
const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message,
    ...(data && { data })
  };
  return res.status(statusCode).json(response);
};

/**
 * Standard error response format
 */
const errorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message,
    ...(errors && { errors })
  };
  return res.status(statusCode).json(response);
};

export { successResponse, errorResponse };
