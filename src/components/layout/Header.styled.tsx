import styled from "styled-components";
// @ts-ignore (2307)
import Logo from "../../assets/images/logo.svg?react";
// @ts-ignore (2307)
import IconMoon from "../../assets/images/icon-moon.svg?react";
import { Dropdown, Switch } from "..";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export const Header = () => {
  const context = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return context?.currentTheme === "dark";
  });

  const toggleTheme = () => {
    context?.toggleTheme();
    setIsDarkMode((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <Logo />
      <Controls>
        <Dropdown />
        <Divider />
        <SwitchWrapper>
          <Switch
            checked={isDarkMode}
            onToggle={toggleTheme}
          />
          <IconMoon />
        </SwitchWrapper>
      </Controls>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > svg {
    display: block;
    height: 2rem;
    width: 1.75rem;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media only screen and (min-width: 48em) {
    gap: 1.625rem;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 2rem;
  background-color: ${(props) => props.theme.dividerSecondary};
`;

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  & > svg {
    transition: stroke 150ms ease;

    max-width: 1.25rem;
    max-height: 1.25rem;

    stroke: ${(props) =>
      props.theme.name === "light"
        ? props.theme.textSecondary
        : props.theme.accent};
  }

  @media only screen and (min-width: 48em) {
    gap: 1.25rem;
  }
`;
