import React, {
  useState,
  FormEvent,
  useEffect,
  ReactElement,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { capitalizeString } from "../../utils";
import { stringifySearchQuery } from "../../utils/resolveSearchQuery";
import { assignType } from "../helpers";
import { FilterKeys, InputTypes, PickedDataKeys } from "../../interfaces";

type FormData = {
  [key in FilterKeys]: {
    displayName: string;
    type: InputTypes;
    value: string;
  };
};

interface FiltersProps {
  filterKeys: FilterKeys[];
  actionTypeOptions: string[];
  applicationTypeOptions: string[];
  query: ParsedUrlQuery;
}

const Filters = ({
  filterKeys,
  actionTypeOptions,
  applicationTypeOptions,
  query,
}: FiltersProps) => {
  const { push, pathname } = useRouter();
  const [formData, setFormData] = useState<FormData>();

  const formatData = useCallback(
    (reset?: boolean) => {
      let store = {} as FormData;
      filterKeys?.forEach(
        (key) =>
          (store[key] = {
            displayName: capitalizeString(key),
            type: assignType(key),
            value: reset ? "" : query[key] ? (query[key] as string) : "",
          })
      );
      setFormData(store);
      if (reset) {
        push("/");
      }
    },
    [filterKeys]
  );

  useEffect(() => {
    formatData();
  }, [filterKeys]);

  const handleChange = (e: any, key: FilterKeys) => {
    setFormData({
      ...formData,
      [key]: { ...formData[key], value: e.target.value },
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let dataToSubmit = {} as Record<string, string>[];

    filterKeys.forEach((key) => {
      if (!formData[key]?.value) {
        return;
      }
      dataToSubmit[key] = formData[key].value;
    });

    formatData();
    push(`${pathname}?${stringifySearchQuery(dataToSubmit)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row">
      <div className="flex flex-row">
        {filterKeys?.map((key) => {
          let renderedInput: ReactElement;

          if (formData?.[key]?.type === "input") {
            renderedInput = (
              <input
                type="text"
                id={key}
                value={formData?.[key].value}
                className="rounded-md border-transparent mt-0.5  flex-1 appearance-none border border-gray-300 w-full py-1 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                onChange={(e) => handleChange(e, key)}
                placeholder="659481832792580"
              />
            );
          }

          if (formData?.[key]?.type === "select") {
            renderedInput = (
              <select
                id={key}
                value={formData?.[key].value}
                className="rounded-md border-transparent mt-0.5 flex-1 border border-gray-300 w-full py-1 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent focus:ring-primary-500 focus:border-primary-500"
                onChange={(e) => handleChange(e, key)}
              >
                <option value="">Select an option</option>
                {renderSelectOptions(
                  key === PickedDataKeys.actionType
                    ? actionTypeOptions
                    : applicationTypeOptions
                )}
              </select>
            );
          }

          if (formData?.[key]?.type === "date-picker") {
            renderedInput = (
              <input
                type="text"
                id="from-date"
                value={formData?.[key].value}
                className="rounded-md border-transparent mt-0.5  flex-1 appearance-none border border-gray-300 w-full py-1 px-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                onChange={(e) => handleChange(e, key)}
                placeholder="Select date"
              />
            );
          }

          return (
            <div className="mr-3" key={key}>
              <label htmlFor={key} className="text-gray-700 font-medium">
                {formData?.[key]?.displayName}
              </label>
              {renderedInput}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col">
        <button
          type="submit"
          className="mb-1 px-3 py-1 text-base font-semibold text-white bg-sky-600 rounded-md shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-sky-200"
        >
          Filter
        </button>
        <button
          type="button"
          className="px-3 py-1 bg-red-400 text-base font-semibold text-white rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-sky-200"
          onClick={() => formatData(true)}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Filters;

function renderSelectOptions(options: string[]) {
  return options?.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
}
