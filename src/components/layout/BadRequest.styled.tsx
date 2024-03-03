import styled from "styled-components";

export const BadRequest = () => {
  return (
    <BadRequestWrapper>
      <Emoji
        role="img"
        aria-label="bad request"
      >
        😕
      </Emoji>
      <Title>No Definitions Found</Title>
      <Message>
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead.
      </Message>
    </BadRequestWrapper>
  );
};

const BadRequestWrapper = styled.div`
  text-align: center;
  margin-top: 8.25rem;
`;

const Emoji = styled.span`
  display: block;
  font-size: 4rem;
  margin-bottom: 2.375rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.875rem;
`;

const Message = styled.p`
  font-size: var(--fs-200);
  color: ${(props) => props.theme.textSecondary};
`;
