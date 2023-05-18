import React, { memo } from "react";
import cls from "./Form.module.css";
import Input from "../Input/Input";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import buttonGo from "../../assets/img/button.svg";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface FormProps {
  className?: string;
  setCurrentSong?: (data: string) => void;
  toPlayerAndBack: number;
  setToPlayerAndBack: (value: number) => void;
}

export interface FormData {
  audioLink: string;
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

const urlSchema = object({
  audioLink: string().test("is-url-valid", "URL is not valid", (value = "") => {
    return isValidUrl(value);
  }),
});

export const Form = memo((props: FormProps) => {
  const { setCurrentSong, setToPlayerAndBack, toPlayerAndBack } = props;
  const methods = useForm<FormData>({
    resolver: yupResolver(urlSchema),
    mode: "onChange",
  });
  const { errors } = methods.formState;

  const onSubmit = (data: FormData) => {
    if (isValidUrl(data.audioLink)) {
      setCurrentSong?.(data.audioLink);
      setToPlayerAndBack(toPlayerAndBack + 1);
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={cls.form}>
          <Input
            name="audioLink"
            className={cls.inputForm}
            placeholder="https://"
            errorMessage={errors.audioLink?.message}
          />
          <button className={cls.toPlayerBtn} type="submit">
            <img src={buttonGo} alt="send-audio" />
          </button>
        </form>
      </FormProvider>
      <span className={cls.errorMessage}>{errors.audioLink?.message}</span>
    </>
  );
});
