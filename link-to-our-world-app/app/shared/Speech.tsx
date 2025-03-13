import { Label } from "designer-m3";
import { useEffect, useRef, useState } from "react";

export type SpeechProps = {
  text: string;
  duration?: number;
  hasStarted?: boolean;
  onFinished?: () => any
};

export function Speech({ text, duration: durationProp, hasStarted = true, onFinished }: SpeechProps) {
  const letters = text.split("");
  const [lettersShown, setLettersShown] = useState(0);
  const started = useRef<Record<string, boolean>>({});
  const duration = durationProp === undefined ? text.length * 100 : durationProp;

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
    if (hasStarted && !started.current[text]) {
      started.current[text] = true;
      setLettersShown(0)
      showNextLetter();
    }
  }, [ hasStarted, text ]);

  return <Label.Small>{text.slice(0, lettersShown)}</Label.Small>;
}
