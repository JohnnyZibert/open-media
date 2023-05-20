import React, { memo } from "react";
import Input from "../Input/Input";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import buttonGo from "../../assets/img/button.svg";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cls from "./Form.module.css";
import { Button } from "../Button/Button";

export interface FormProps {
  className?: string;
  setCurrentSong?: (data: string) => void;
  setToPlayerAndBack: (value: boolean) => void;
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
  const { setCurrentSong, setToPlayerAndBack } = props;
  const methods = useForm<FormData>({
    resolver: yupResolver(urlSchema),
    mode: "onChange",
  });
  const { errors } = methods.formState;

  const onSubmit = (data: FormData) => {
    if (isValidUrl(data.audioLink)) {
      setCurrentSong?.(data.audioLink);
      setToPlayerAndBack(true);
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
            errorIconStyle={cls.errorIcon}
          />
          <Button className={cls.toPlayerBtn} type="submit">
            <img src={buttonGo} alt="send-audio" />
          </Button>
        </form>
      </FormProvider>
      <span className={cls.errorMessage}>{errors.audioLink?.message}</span>
    </>
  );
});
