import { useState } from "react";
import { Input } from "..";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/state";
import { fetchDictionary } from "../../store/dictionary/dictionarySlice";

export const InputForm = () => {
  const [value, setValue] = useState<string>("");
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
    <form onSubmit={onSubmit}>
      <Input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setValue(e.target.value)
        }
        error={error}
      />
    </form>
  );
};
