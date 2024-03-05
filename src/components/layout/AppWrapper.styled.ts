import styled from "styled-components";

export const AppWrapper = styled.div`
  width: calc(100% - 3rem);
  margin-inline: auto;
  padding-top: 1.5rem;

  @media only screen and (min-width: 48em) {
    width: min(46rem, calc(100% - 5rem));
    padding-top: 3.5rem;
  }
`;
