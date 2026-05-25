export function successResponse(
  data = null,
  message = "Success",
  options = {},
) {
  return {
    success: true,
    message,
    data,
    meta: {
      cached: options.cached ?? false,
      timestamp: new Date().toISOString(),
    },
  };
}

export function errorResponse(
  message = "Something went wrong",
  code = "INTERNAL_SERVER_ERROR",
  details = null,
) {
  return {
    success: false,
    message,
    error: {
      code,
      details,
    },
    meta: {
      cached: false,
      timestamp: new Date().toISOString(),
    },
  };
}
