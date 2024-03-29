import styled from "styled-components";
import {
  Meaning as IMeaning,
  fetchDictionary,
} from "../store/dictionary/dictionarySlice";
import { AppDispatch } from "../store/state";
import { useDispatch } from "react-redux";

interface MeaningProps {
  meaning: IMeaning;
}

export const Meaning: React.FC<MeaningProps> = ({ meaning }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <MeaningWrapper>
      <PartOfSpeech>
        {meaning.partOfSpeech}
        <Divider aria-hidden="true" />
      </PartOfSpeech>
      <TextMeaning>Meaning</TextMeaning>

      <DefinitionsList>
        {meaning.definitions.map((definition, index) => (
          <Definition key={index}>
            {definition.definition}

            {definition.example && <Example>”{definition.example}”</Example>}

            {definition.synonyms.length > 0 && (
              <Relation>
                Synonyms
                {definition.synonyms.map((synonym, index) => (
                  <RelationLink
                    onClick={() => dispatch(fetchDictionary(synonym))}
                    role="button"
                    key={index}
                  >
                    {synonym}
                  </RelationLink>
                ))}
              </Relation>
            )}
          </Definition>
        ))}
      </DefinitionsList>
    </MeaningWrapper>
  );
};

const MeaningWrapper = styled.div`
  margin-top: 2rem;

  @media only screen and (min-width: 48em) {
    margin-top: 2.3rem;
  }
`;

const PartOfSpeech = styled.h3`
  font-weight: var(--fw-bold);
  font-size: var(--fs-400);
  font-style: italic;
  background-color: ${(props) => props.theme.background};

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.divider};
`;

const TextMeaning = styled.span`
  display: block;
  font-size: var(--fs-300);
  color: ${(props) => props.theme.textSecondary};
  margin-top: 2rem;

  @media only screen and (min-width: 48em) {
    margin-top: 2.375rem;
  }
`;

const DefinitionsList = styled.ul`
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  margin-top: 1rem;

  @media only screen and (min-width: 48em) {
    margin-top: 1.5rem;
    padding-left: 1.3rem;
    gap: 0.825rem;
  }
`;

const Definition = styled.li`
  position: relative;
  line-height: 1.5rem;
  padding-left: 1.5625rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.625rem;
    width: 0.3125rem;
    height: 0.3125rem;
    background-color: ${(props) => props.theme.accent};
    border-radius: 100vmax;
  }
`;

const Relation = styled.p`
  display: flex;
  column-gap: 1.5rem;
  flex-wrap: wrap;
  font-size: var(--fs-300);

  margin-top: 1.5rem;
  color: ${(props) => props.theme.textSecondary};

  @media only screen and (min-width: 48em) {
    margin-top: 2.5rem;
    margin-left: -2.8625rem;
  }

  @media only screen and (min-width: 90em) {
    margin-top: 4rem;
  }
`;

const RelationLink = styled.a`
  color: ${(props) => props.theme.accent};
  font-weight: var(--fw-bold);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media only screen and (min-width: 90em) {
  }
`;

const Example = styled.p`
  color: ${(props) => props.theme.textSecondary};
  margin-top: 0.8125rem;
`;
