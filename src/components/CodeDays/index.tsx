import {calThePastToTodayOptString} from "@site/src/utils/date-util";
import React from "react";

/**
 * 从事开发工作至今天数
 */
export const CodeDays = () => {

    return (<span style={{color: '#827397', fontWeight: 'bolder'}}>
      {calThePastToTodayOptString("2020-08-17")}
    </span>)
}