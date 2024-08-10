import pino from "pino";
import pinoPretty from "pino-pretty";

const Log = pino(
  pinoPretty({
    colorize: true,
    ignore: "pid,req,res",
  })
);

export default Log;
