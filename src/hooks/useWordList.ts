/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridRowSelectionModel } from "@mui/x-data-grid/models/gridRowSelectionModel";
import { useEffect, useState } from "react";
import { parseJSON } from "../helpers/parseJSON";

const getWordData = (wordData) => {
  return wordData.map((item, index) => ({
    ...item,
    id: index,
    resource: item.word,
    flagged: item.flagged || false,
    word: item.word.toString(),
  }));
};

export const useWordList = (wordData) => {
  const [data, setData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("wordData", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    const localData =
      parseJSON(localStorage.getItem("wordData") || "") ||
      getWordData(wordData);
    setData(getWordData(localData));
  }, []);

  const randomize = () => {
    const localData = [...data];
    localData.sort(() => Math.random() - 0.5);
    setData(getWordData(localData));
  };

  const findWord = (e) => {
    const value = e.target.value;
    if (value === "") {
      setFilterData([]);
      return;
    }
    const localData = [...data];
    const filteredData = localData.filter((item) =>
      item.word.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(filteredData);
  };

  const markAsLearned = (words: GridRowSelectionModel, isLearned = true) => {
    const localData = [...data];
    words.forEach((wordIndex) => {
      localData[wordIndex].learned = isLearned;
    });

    setData(localData);
  };

  const markAsFlagged = (words: GridRowSelectionModel) => {
    const localData = [...data];
    words.forEach((wordIndex) => {
      localData[wordIndex].flagged = !localData[wordIndex].flagged;
    });
    setData(localData);
  };

  return {
    data,
    filterData,
    randomize,
    findWord,
    markAsLearned,
    markAsFlagged,
  };
};
