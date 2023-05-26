import Response from "../../system/helpers/Response";
import ReviewCycleService from "../../services/reviewCycleServices";
import { Op } from "sequelize";

export default class ReviewCycleControllors {
  static async create(req, res) {
    try {
      const { startDate, endDate } = req.body;
      ReviewCycleService.create({
        startDate,
        endDate,
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
      const reviewCycle = await ReviewCycleService.findById(id);
      if (!reviewCycle) {
        return Response.error(res, 400, {
          message: "There is not this review cycle",
        });
      }
      return Response.success(res, 200, {
        message: "reviewCycle retreived successfully",
        data: reviewCycle,
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
      reviewCycle.set("active", true);
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
      reviewCycle.set("active", false);
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

  static async checkDeadLine(req, res) {
    try {
      const current_date = new Date();
      await ReviewCycleService.update(
        { active: false },
        { where: { endDate: { [Op.lt]: current_date }, active: true } }
      );
    } catch (error) {
      return Response.error(res, 500, {
        message: "server error",
        error: error.message,
      });
    }
  }
}
