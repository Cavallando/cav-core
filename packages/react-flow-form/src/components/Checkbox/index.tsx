import React, { useState } from "react";
import {
  ArrayPath,
  FieldValues,
  Path,
  PathValue,
  UnPackAsyncDefaultValues,
  useFieldArray,
  UseFieldArrayProps,
  UseFormReturn,
} from "react-hook-form";
import { SelectStep } from "../Step";
import { CheckboxWrapper, CheckboxOption } from "./styled";

type CheckboxProps<FormValues extends FieldValues> = {
  values: SelectStep["values"];
  formId: Path<FormValues>;
  setValue: UseFormReturn<FormValues>["setValue"];
  getValues: UseFormReturn<FormValues>["getValues"];
  control: UseFormReturn<FormValues>["control"];
};

export function Checkbox<FormValues extends FieldValues>({
  values,
  formId,
  setValue,
  getValues,
  control,
}: CheckboxProps<FormValues>) {
  // TODO: Fix these to be real types
  const getValuesId = [formId] as unknown as Path<
    UnPackAsyncDefaultValues<FormValues>
  >;
  const [itemsChecked, setItemsChecked] = useState(getValues(getValuesId));

  const { remove } = useFieldArray<FormValues>({
    control,
    name: formId as UseFieldArrayProps<
      FormValues,
      ArrayPath<UnPackAsyncDefaultValues<FormValues>>
    >["name"],
  });

  const handleChange = (option: { label: string; value: string }) => {
    let values = getValues(getValuesId);
    if (!values) {
      values = [] as PathValue<
        UnPackAsyncDefaultValues<FormValues>,
        Path<UnPackAsyncDefaultValues<FormValues>>
      >;
    }

    const indexFound = values.findIndex(
      (item: { value: string }) => item.value === option.value
    );

    if (indexFound > -1) {
      remove(indexFound);
      const valuesToSave = values.filter(
        (item: { value: string }) => item.value !== option.value
      );
      setItemsChecked(valuesToSave);
    } else {
      const valuesToSave = [
        ...values,
        option as PathValue<FormValues, Path<FormValues>>,
      ];
      setItemsChecked(valuesToSave as PathValue<FormValues, Path<FormValues>>);
      setValue(
        getValuesId,
        valuesToSave as PathValue<
          UnPackAsyncDefaultValues<FormValues>,
          Path<UnPackAsyncDefaultValues<FormValues>>
        >
      );
    }
  };

  return (
    <CheckboxWrapper>
      {values.map((val) => (
        <CheckboxOption key={val.value}>
          <span>{val.label}</span>
          <input
            defaultChecked={itemsChecked.some(
              (item: { value: string }) => item.value === val.value
            )}
            onClick={() => handleChange(val)}
            type="checkbox"
            name={formId}
            value={val.value}
          />
          <div></div>
        </CheckboxOption>
      ))}
    </CheckboxWrapper>
  );
}
