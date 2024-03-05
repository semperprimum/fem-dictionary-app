import styled from "styled-components";
// @ts-ignore (2307)
import IconPlay from "../../assets/images/icon-play.svg?react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/state";
import { Meaning } from "..";

export const Definitions = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dictionary = useSelector(
    (state: RootState) => state.dictionary.dictionary
  );

  const audio = new Audio(
    dictionary[0].phonetics[dictionary[0].phonetics.length - 1]?.audio
  );

  const playAudio = () => {
    audioRef.current?.pause();

    audioRef.current = audio;
    audioRef.current.play();
  };

  const getPhonetics = () => {
    if (dictionary[0].phonetic) return dictionary[0].phonetic;

    let phonetics = "";
    for (const entry of dictionary[0].phonetics) {
      if (entry.text) {
        phonetics = entry.text;
        break;
      }
    }
    return phonetics;
  };

  return (
    <DefinitionsWrapper>
      <WordWrapper>
        <WordAndPhonetics>
          <Word>{dictionary[0].word}</Word>
          {getPhonetics() && <Phonetics>{getPhonetics()}</Phonetics>}
        </WordAndPhonetics>
        {dictionary[0].phonetics[dictionary[0].phonetics.length - 1]?.audio && (
          <ListenButton
            aria-label="play audio"
            onClick={playAudio}
          >
            <IconPlay aria-hidden="true" />
          </ListenButton>
        )}
      </WordWrapper>

      {dictionary[0].meanings.map((meaning, index) => (
        <Meaning
          key={index}
          meaning={meaning}
        />
      ))}
    </DefinitionsWrapper>
  );
};

const DefinitionsWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2rem;

  @media only screen and (min-width: 48em) {
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
  }
`;

const WordWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WordAndPhonetics = styled.div``;

const Word = styled.h2`
  font-size: var(--fs-500);
`;

const Phonetics = styled.span`
  display: block;
  font-family: "Inter Variable", sans-serif;
  font-size: var(--fs-400);
  color: ${(props) => props.theme.accent};
  margin-top: 0.375rem;
`;

const ListenButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;

  & > svg {
    display: block;
    width: 3rem;
    height: 3rem;

    fill: ${(props) => props.theme.accent};

    & > g > circle {
      fill-opacity: 0.25;
    }
  }

  @media only screen and (min-width: 90em) {
    cursor: pointer;

    & > svg {
      width: 4.6875rem;
      height: 4.6875rem;
    }

    & > svg > g {
      & > circle {
        transition: fill-opacity 0.2s ease;
      }
      & > path {
        transition: fill 0.2s ease;
      }
    }

    &:hover {
      & > svg > g > circle {
        fill-opacity: 1;
      }

      & > svg > g > path {
        fill: #fff;
      }
    }
  }
`;
