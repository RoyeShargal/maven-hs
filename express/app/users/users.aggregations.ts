import { PipelineStage } from "mongoose";

export const usersSorterByStepsAggregation: PipelineStage[] = [
    {
      $sort: {
        maxStepsReached: -1,
      },
    },
  ];