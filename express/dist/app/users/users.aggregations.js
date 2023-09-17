"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersSortedByMaxStepsAggregation = void 0;
exports.usersSortedByMaxStepsAggregation = [
    {
        $sort: {
            maxStepsReached: -1,
        },
    },
];
