import styled from "styled-components";
import { useFont } from "../context/FontContext";
import { useEffect, useRef, useState } from "react";
// @ts-ignore (2307)
import IconArrowDown from "../assets/images/icon-arrow-down.svg?react";

export const Dropdown = () => {
  const context = useFont();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const getFontName = () => {
    switch (context?.currentFont) {
      case "sans":
        return "Sans Serif";
      case "serif":
        return "Serif";
      case "mono":
        return "Mono";
    }
  };

  const onClick = (font: "sans" | "serif" | "mono") => {
    context?.changeFont(font);
    isOpen && setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownHeader onClick={() => setIsOpen((prev) => !prev)}>
        {getFontName()}
        <IconArrowDown aria-hidden="true" />
      </DropdownHeader>

      {isOpen && (
        <DropdownList>
          <DropdownItem
            $font="sans"
            onClick={() => onClick("sans")}
          >
            Sans Serif
          </DropdownItem>
          <DropdownItem
            $font="serif"
            onClick={() => onClick("serif")}
          >
            Serif
          </DropdownItem>
          <DropdownItem
            $font="mono"
            onClick={() => onClick("mono")}
          >
            Mono
          </DropdownItem>
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled.div`
  position: relative;
  z-index: 9999;
`;

const DropdownHeader = styled.button`
  border: none;
  background: none;
  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: var(--fs-200);
  font-weight: var(--fw-bold);
  color: ${(props) => props.theme.text};
`;

const DropdownList = styled.div`
  position: absolute;
  width: 11.4375rem;
  display: grid;
  right: 0;
  top: 2.625rem;

  padding: 1.5rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.theme.name === "light"
      ? props.theme.background
      : props.theme.inputBackground};
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const DropdownItem = styled.button<{ $font: "serif" | "sans" | "mono" }>`
  border: none;
  background: none;
  margin: 0;
  padding: 0;

  text-align: start;
  line-height: 1.5;
  font-weight: var(--fw-bold);
  color: ${(props) => props.theme.text};

  font-family: ${(props) => {
    switch (props.$font) {
      case "sans":
        return "Inter Variable";
      case "serif":
        return "Lora Variable";
      case "mono":
        return "Inconsolata Variable";
    }
  }};

  & + & {
    margin-top: 0.5rem;
  }
`;
