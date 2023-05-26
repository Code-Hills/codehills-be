import { CronJob } from "cron";
import ReviewCycleControllors from "../../restful/controllers/reviewCycleControllers";

const cronJob = () => {
  new CronJob(
    "0 00 * * *",
    function () {
      ReviewCycleControllors.checkDeadLine();
    },
    () => {
      console.log("Now server stoped");
    },
    true
  );
};
export default cronJob;
