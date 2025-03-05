import { Label } from "designer-m3";
import { useEffect, useState } from "react";

export type SpeechProps = {
  text: string;
  duration: number;
  hasStarted?: boolean;
  onFinished?: () => any
};

export function Speech({ text, duration, hasStarted = true, onFinished }: SpeechProps) {
  const letters = text.split("");
  const [lettersShown, setLettersShown] = useState(0);

  function showNextLetter() {
    setLettersShown((lettersShown) => {
      if (lettersShown === letters.length) {
        setTimeout(() => onFinished?.(), 0);
        return lettersShown;
      }
      setTimeout(showNextLetter, duration / letters.length);
      return lettersShown + 1
    });
  }

  useEffect(() => {
      if (hasStarted) showNextLetter();
  }, [ hasStarted ]);

  return <Label.Small>{text.slice(0, lettersShown)}</Label.Small>;
}
