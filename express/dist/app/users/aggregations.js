"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersSorterByStepsAggregation = void 0;
exports.usersSorterByStepsAggregation = [
    {
        $sort: {
            maxStepsReached: -1,
        },
    },
];
