import Response from "../../system/helpers/Response";
import ReviewCycleService from "../../services/reviewCycleServices";

export default class ReviewCycleControllors {
  static async create(req, res) {
    try {
      const { startAt, endingAt } = req.body;
      ReviewCycleService.create({
        startAt,
        endingAt,
      })
        .then((reviewCycle) => {
          return Response.success(res, 200, {
            message: "reviewCycle created successfully",
            data: reviewCycle,
          });
        })
        .catch((error) => {
          return Response.error(res, 403, {
            message: "reviewCycle failed to be created",
            error: error.message,
          });
        });
    } catch (error) {
      return Response.error(res, 500, {
        message: "server error",
        error: error.message,
      });
    }
  }

  static async getALl(req, res) {
    try {
      ReviewCycleService.findAll()
        .then((reviewCycle) => {
          return Response.success(res, 200, {
            message: "reviewCycles retreived successfully",
            data: reviewCycle,
          });
        })
        .catch((error) => {
          return Response.error(res, 403, {
            message: "reviewCycles failed to be retreived",
            error: error.message,
          });
        });
    } catch (error) {
      return Response.error(res, 500, {
        message: "server error",
        error: error.message,
      });
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      ReviewCycleService.findById(id)
        .then((reviewCycle) => {
          return Response.success(res, 200, {
            message: "reviewCycle retreived successfully",
            data: reviewCycle,
          });
        })
        .catch((error) => {
          return Response.error(res, 403, {
            message: "reviewCycle failed to be retreived",
            error: error.message,
          });
        });
    } catch (error) {
      return Response.error(res, 500, {
        message: "server error",
        error: error.message,
      });
    }
  }

  static async start(req, res) {
    try {
      const { id } = req.params;
      const reviewCycle = await ReviewCycleService.findONE({ id });
      if (!reviewCycle) {
        return Response.error(res, 404, {
          message: "Unable to find this review cycle",
        });
      }
      reviewCycle.set("started", true);
      await reviewCycle.save();
      return Response.success(res, 200, {
        message: "Review cycle is now started",
        data: reviewCycle,
      });
    } catch (error) {
      return Response.error(res, 500, {
        message: "server error",
        error: error.message,
      });
    }
  }

  static async end(req, res) {
    try {
      const { id } = req.params;
      const reviewCycle = await ReviewCycleService.findONE({ id });
      if (!reviewCycle) {
        return Response.error(res, 404, {
          message: "Unable to find this review cycle",
        });
      }
      reviewCycle.set("ended", true);
      await reviewCycle.save();
      return Response.success(res, 200, {
        message: "Review cycle is now ended",
        data: reviewCycle,
      });
    } catch (error) {
      return Response.error(res, 500, {
        message: "server error",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const reviewCycle = await ReviewCycleService.findONE({ id });
      if (!reviewCycle) {
        return Response.error(res, 404, {
          message: "Unable to find this review cycle",
        });
      }
      reviewCycle.set(req.body);
      await reviewCycle.save();
      return Response.success(res, 200, {
        message: "Review cycle is updated successfully",
        data: reviewCycle,
      });
    } catch (error) {
      return Response.error(res, 500, {
        message: "server error",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const reviewCycle = await ReviewCycleService.findONE({ id });
      if (!reviewCycle) {
        return Response.error(res, 404, {
          message: "Unable to find this review cycle",
        });
      }
      ReviewCycleService.delete(id)
        .then(() => {
          return Response.success(res, 200, {
            message: "Review cycle deleted successfuly",
          });
        })
        .catch((error) => {
          return Response.error(res, 400, {
            message: " Fail to delete this review cycle",
            error: error.message,
          });
        });
    } catch (error) {
      return Response.error(res, 500, {
        message: "server error",
        error: error.message,
      });
    }
  }
}
