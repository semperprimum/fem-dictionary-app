import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/state";
// @ts-ignore (2307)
import IconNewWindow from "../../assets/images/icon-new-window.svg?react";

export const Source = () => {
  const sourceUrl = useSelector(
    (state: RootState) => state.dictionary.dictionary[0].sourceUrls
  );

  return (
    <SourceWrapper>
      <SourceText>Source</SourceText>
      <SourceLink
        href={sourceUrl[0]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {sourceUrl[0]}
        <IconNewWindow aria-hidden="true" />
      </SourceLink>
    </SourceWrapper>
  );
};

const SourceWrapper = styled.div`
  padding-block: 1.5rem;
  font-size: var(--fs-100);
`;

const SourceText = styled.p`
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 0.4375rem;
  text-decoration: underline;
`;

const SourceLink = styled.a`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-decoration: underline;
`;
