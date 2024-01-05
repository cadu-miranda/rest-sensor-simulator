import * as yup from "yup";

const getDHTDataSchema = yup.object().shape({
  pin: yup.number().required("O pino é obrigatório."),

  type: yup
    .string()
    .oneOf(["DHT11", "DHT22"], "O tipo do sensor deve ser DHT11 ou DHT22.")
    .required("O tipo do sensor é obrigatório."),
});

export { getDHTDataSchema };
