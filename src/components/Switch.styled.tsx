import styled from "styled-components";

interface SwitchProps {
  checked: boolean;
  onToggle: () => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onToggle }) => {
  return (
    <SwitchWrapper>
      <SwitchInput
        checked={checked}
        onChange={onToggle}
        type="checkbox"
      />
      <SwitchStyled />
    </SwitchWrapper>
  );
};

const SwitchWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1.25rem;
`;

const SwitchInput = styled.input`
  display: none;

  &:checked + span {
    background-color: ${(props) => props.theme.accent};
    &::before {
      transform: translateX(1.25rem);
    }
  }
`;

const SwitchStyled = styled.span`
  position: absolute;
  background-color: ${(props) => props.theme.textSecondary};
  inset: 0;
  border-radius: 100vmax;

  transition: background-color 300ms ease;

  &::before {
    content: "";
    position: absolute;
    left: 0.1875rem;
    top: 0.1875rem;
    width: 0.875rem;
    height: 0.875rem;
    background-color: #ffffff;
    border-radius: 100vmax;

    transition: transform 150ms ease;
  }
`;
