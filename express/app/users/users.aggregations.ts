import { PipelineStage } from "mongoose";

export const usersSortedByMaxStepsAggregation: PipelineStage[] = [
    {
      $sort: {
        maxStepsReached: -1,
      },
    },
  ];