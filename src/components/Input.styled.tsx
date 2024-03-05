import styled, { css } from "styled-components";
// @ts-ignore (2307)
import IconSearch from "../assets/images/icon-search.svg?react";
import { useRef } from "react";

interface InputProps {
  value: string;
  onChange: (param: any) => void;
  error: string;
}

export const Input: React.FC<InputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleWrapperClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <InputWrapper
        $error={!!props.error}
        onClick={handleWrapperClick}
      >
        <InputField
          ref={inputRef}
          type="text"
          placeholder="Search for any word…"
          value={props.value}
          onChange={props.onChange}
        />
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.blur();
          }}
          aria-label="search"
        >
          <IconSearch aria-hidden="true" />
        </Button>
      </InputWrapper>
      {props.error && <Error>{props.error}</Error>}
    </>
  );
};

const InputWrapper = styled.div<{ $error: boolean }>`
  position: relative;
  background-color: ${(props) => props.theme.inputBackground};
  padding: 0.875rem 1.5rem 0.9375rem;
  border-radius: 1rem;

  &:focus-within {
    outline: 1px solid ${(props) => props.theme.accent};
    outline-offset: -1px;
  }

  ${(props) =>
    props.$error &&
    css`
      outline: 1px solid ${props.theme.error};
      outline-offset: -1px;
    `}

  @media only screen and (min-width: 48em) {
    padding: 1.1875rem 1.5rem;
  }
`;

const InputField = styled.input`
  border: none;
  background: none;
  margin: none;
  padding: none;

  font-size: var(--fs-300);
  font-weight: var(--fw-bold);
  color: ${(props) => props.theme.text};
  caret-color: ${(props) => props.theme.accent};
  outline: none;
`;

const Button = styled.button`
  position: absolute;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  right: 0.375rem;
  top: 50%;
  transform: translateY(-50%);
  width: 3.4375rem;
  aspect-ratio: 1;

  display: grid;
  place-items: center;

  & > svg {
    display: block;
  }
`;

const Error = styled.span`
  display: block;
  margin-top: 0.5rem;
  font-size: var(--fs-300);
  color: ${(props) => props.theme.error};
`;
