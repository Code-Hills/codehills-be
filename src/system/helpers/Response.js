export default class Response {
  static error(res, status, error) {
    return res.status(status).json({ status, ...error });
  }

  static success(res, status, data) {
    return res.status(status).json({ status, ...data });
  }
}
