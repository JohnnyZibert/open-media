import { memo } from "react";
import Input from "../../../shared/ui/Input/Input";
import { FormProvider, useForm } from "react-hook-form";
import nextBtn from "../../../shared/assets/img/nextBtn.svg";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ImgButton } from "../../../shared/ui/ImgButton/ImgButton";
import { FormData } from "../model/types";
import { isValidUrl } from "../../../shared/helpers/validateUrl";
import cls from "./Form.module.css";

export interface FormProps {
  className?: string;
  setCurrentSong?: (data: string) => void;
  setToPlayerAndBack: (value: boolean) => void;
}

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
      <p className={cls.linkTitle}>Insert the link</p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={cls.form}>
          <Input
            name="audioLink"
            className={cls.inputForm}
            placeholder="https://"
            errorMessage={errors.audioLink?.message}
            errorIconStyle={cls.errorIcon}
          />
          <ImgButton
            img={nextBtn}
            alt="send-audio"
            className={cls.toPlayerBtn}
            type="submit"
          />
        </form>
      </FormProvider>
      <span className={cls.errorMessage}>{errors.audioLink?.message}</span>
    </>
  );
});
