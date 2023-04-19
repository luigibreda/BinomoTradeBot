import { useRef } from "react";
import { entryServices } from "../../../services/http/entry";
import { sendMessageToCurrentTab } from "../../../functions";

type History = {
  timeStart: string;
  timeEnd?: string;
  initialBalance: number;
  finalBalance: number;
  count: number;
  profit?: number;
  isProfit?: boolean;
};

export const useRegHistory = () => {
  const history = useRef<History>({} as History);

  const registerHistory = async () => {
    try {
      const res = await entryServices.registerHistory(history.current);
    } catch (error: any) {
      console.log(error);
    }
  };

  const initReg = async () => {
    const response = await sendMessageToCurrentTab({
      type: "GET_CURRENT_BALANCE",
    });

    history.current = {
      timeStart: new Date().toISOString(),
      timeEnd: "",
      count: 0,
      profit: 0,
      finalBalance: 0,
      isProfit: false,
      initialBalance: response.balance,
    };
  };

  const finishReg = async () => {
    const response = await sendMessageToCurrentTab({
      type: "GET_CURRENT_BALANCE",
    });

    history.current = {
      ...history.current,
      profit: response.balance - history.current.initialBalance,
      isProfit: response.balance - history.current.initialBalance > 0,
      finalBalance: response.balance,
      timeEnd: new Date().toISOString(),
    };
    registerHistory();
  };

  const incrementReg = () => {
    history.current = {
      ...history.current,
      count: history.current.count + 1,
    };
  };

  return {
    initReg,
    finishReg,
    incrementReg,
  };
};
