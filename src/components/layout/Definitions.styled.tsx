import styled from "styled-components";
// @ts-ignore (2307)
import IconPlay from "../../assets/images/icon-play.svg?react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/state";

export const Definitions = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dictionary = useSelector(
    (state: RootState) => state.dictionary.dictionary
  );

  const playAudio = () => {
    audioRef.current?.pause();

    const audio = new Audio(
      dictionary[0].phonetics[dictionary[0].phonetics.length - 1].audio
    );

    audioRef.current = audio;
    audioRef.current.play();
  };

  return (
    <DefinitionsWrapper>
      <WordWrapper>
        <WordAndPhonetics>
          <Word>{dictionary[0].word}</Word>
          <Phonetics>{dictionary[0].phonetic}</Phonetics>
        </WordAndPhonetics>
        <ListenButton onClick={playAudio}>
          <IconPlay />
        </ListenButton>
      </WordWrapper>
    </DefinitionsWrapper>
  );
};

const DefinitionsWrapper = styled.div`
  margin-top: 1.5rem;
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
  font-size: var(--fs-400);
  color: ${(props) => props.theme.accent};
  margin-top: 0.5rem;
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
  }
`;
