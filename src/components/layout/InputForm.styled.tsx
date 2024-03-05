import { useState } from "react";
import { Input } from "..";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/state";
import { fetchDictionary } from "../../store/dictionary/dictionarySlice";
import styled from "styled-components";

export const InputForm = () => {
  const [value, setValue] = useState<string>("keyboard");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!value) {
      setError("Whoops, can’t be empty…");
      return;
    }

    setError("");
    dispatch(fetchDictionary(value));
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setValue(e.target.value)
        }
        error={error}
      />
    </Form>
  );
};

const Form = styled.form`
  margin-top: 1.5rem;

  @media only screen and (min-width: 48em) {
    margin-top: 3.375rem;
  }
`;
