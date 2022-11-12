import React, { useState, FormEvent, useEffect, ReactElement } from "react";
import { capitalizeString } from "../../../utils";
import { assignType } from "../helpers";

export type FilterKeys =
  | "logId"
  | "applicationType"
  | "applicationId"
  | "actionType"
  | "fromData"
  | "toData";

export type InputTypes = "select" | "input" | "date-picker";

type FormData = {
  [key in FilterKeys]: {
    displayName: string;
    type: InputTypes;
    value: string | null;
  };
};

interface FiltersProps {
  filterKeys: FilterKeys[];
}

const Filters = ({ filterKeys }: FiltersProps) => {
  const [formData, setFormData] = useState<FormData>();

  useEffect(() => {
    setFormData(() => {
      let dataObject = {} as FormData;

      filterKeys?.forEach(
        (key) =>
          (dataObject[key] = {
            displayName: capitalizeString(key),
            type: assignType(key),
            value: null,
          })
      );

      return dataObject;
    });
  }, [filterKeys]);

  const handleChange = (e: any, key: FilterKeys) => {
    setFormData({
      ...formData,
      [key]: { ...formData[key], value: e.target.value },
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const dataToSubmit = filterKeys.map((key) => ({
      [key]: formData[key].value,
    }));
    console.log("dataToSubmit:", dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row">
      <div className="flex flex-row">
        {filterKeys?.map((key) => {
          let renderedInput: ReactElement;

          if (formData[key]?.type === "input") {
            renderedInput = (
              <input
                type="text"
                id={key}
                className="rounded-md border-transparent mt-0.5  flex-1 appearance-none border border-gray-300 w-full py-1 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                onChange={(e) => handleChange(e, key)}
                placeholder="659481832792580"
              />
            );
          }

          if (formData[key]?.type === "select") {
            renderedInput = (
              <select
                id={key}
                className="rounded-md border-transparent mt-0.5 flex-1 border border-gray-300 w-full py-1 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent focus:ring-primary-500 focus:border-primary-500"
                onChange={(e) => handleChange(e, key)}
              >
                <option value="">Select an option</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            );
          }

          if (formData[key]?.type === "date-picker") {
            renderedInput = (
              <input
                type="text"
                id="from-date"
                className="rounded-md border-transparent mt-0.5  flex-1 appearance-none border border-gray-300 w-full py-1 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                onChange={(e) => handleChange(e, key)}
                placeholder="Select date"
              />
            );
          }

          return (
            <div className="mr-3" key={key}>
              <label htmlFor={key} className="text-gray-700 font-medium">
                {formData[key]?.displayName}
              </label>
              {renderedInput}
            </div>
          );
        })}
      </div>
      <button
        type="submit"
        className="px-3 py-1 text-base font-semibold text-white bg-sky-600 rounded-md shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-sky-200"
      >
        Filter
      </button>
    </form>
  );
};

export default Filters;
