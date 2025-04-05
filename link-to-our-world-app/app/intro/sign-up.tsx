import { isAnyFailure, isFailure, makeFailure } from "@triframe/ambassador";
import { isEmailInUse, signUp } from "api";
import { Button, Column, Page, Row, TextField, timing, useDesignerTheme } from "designer-m3";
import { ArrowRightIcon } from "designer-m3/icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard } from "react-native";
import { Assets, Speech, SpeechGroup, SpeechStepper, SubjectImage, useSequence } from "../shared";

type UserForm = {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const transition = timing(1000);
  const { spacing } = useDesignerTheme();

  const sequence = useSequence({ hasStarted: true, onFinished: handleSequenceFinished }, [
    'courageAwakes',
    'courageAwakesOut',
    'name',
    'nameOut',
    'email',
    'emailOut',
    'password',
    'passwordOut',
    'goToTheSacredGrove'
  ])

  const [user, setUser] = useState<UserForm>({
    name: '',
    email: '',
    password: ''
  })

  async function handleSequenceFinished() {
    await signUp(user)
    router.push('/')
  }

  return (
    <Page navTransitionOutDuration={transition.duration}>
      <Column
        flex={1}
        opacity={1}
        _navTransitionOut={{
          opacity: 0,
        }}
        transitions={{
          opacity: transition,
        }}
        px={spacing.md}
      >
        <Column
          flex={1}
          alignItems="center"
          justifyContent="center"
          opacity={0}
          _displayed={{ opacity: 1 }}
          transitions={{
            opacity: timing(6000)
          }}
        >
          <SubjectImage
            source={Assets['lumina']}
          />
        </Column>
        {sequence.has({ reached: 'courageAwakes', notPassed: 'courageAwakesOut' }) &&
          <Column
            flex={1}
            opacity={sequence.hasReached('courageAwakesOut') ? 0 : 1}
            transitions={{
              opacity: timing(200).then(sequence.next)
            }}
          >
            <SpeechStepper
              hasStarted={sequence.hasReached('courageAwakes')}
              groups={[[
                "Courage awakens in the device of a hero.",
                "Do not be afraid, I am a messenger left by the goddess from a time long past... ",
                "Allow me to introduce myself: I am Lumina.",
              ]]}
              onFinished={sequence.next}
            />
          </Column>
        }
        <NameStep
          hasStarted={sequence.hasReached('name')}
          display={sequence.has({ reached: 'name', notPassed: 'nameOut' }) ? 'flex' : 'none'}
          opacity={sequence.isAt('name') ? 1 : 0}
          transitions={{
            opacity: timing(250)
              .then(() => {
                if (sequence.isAt('nameOut')) sequence.next()
              })
          }}
          onNext={name => {
            setUser({ ...user, name })
            sequence.next();
          }}
        />
        <EmailStep
          name={user.name}
          hasStarted={sequence.hasReached('email')}
          display={sequence.has({ reached: 'email', notPassed: 'emailOut' }) ? 'flex' : 'none'}
          opacity={sequence.isAt('email') ? 1 : 0}
          transitions={{
            opacity: timing(250)
              .then(() => {
                if (sequence.isAt('emailOut')) sequence.next()
              })
          }}
          onNext={email => {
            setUser({ ...user, email })
            sequence.next();
          }}
        />
        <PasswordStep
          name={user.name}
          hasStarted={sequence.hasReached('password')}
          display={sequence.has({ reached: 'password', notPassed: 'passwordOut' }) ? 'flex' : 'none'}
          opacity={sequence.isAt('password') ? 1 : 0}
          transitions={{
            opacity: timing(250)
              .then(() => {
                if (sequence.isAt('passwordOut')) sequence.next()
              })
          }}
          onNext={async password => {
            setUser({ ...user, password })
            sequence.next();
          }}
        />
        {sequence.hasReached('goToTheSacredGrove') && 
          <Column flex={1}>
            <SpeechStepper
              hasStarted={sequence.hasReached('goToTheSacredGrove')}
              groups={[[
                "Thank you.",
                "I must admit, I am surprised that the goddess would choose someone who is not even from Hyrule to restore it.",
                "I will infuse your device so that you may interact with the Hyrule of decline.",
                "Head for the sacred grove, there you will learn more of the mission that awaits you."
              ]]}
              onFinished={sequence.next}
            />
          </Column>
        }
      </Column>
    </Page>
  );
}


type NameStepProps = Parameters<typeof Column>[0] & {
  hasStarted: boolean;
  onNext: (name: string) => any
}

const NameIsRequired = makeFailure('nameIsRequired', {});

function NameStep({ hasStarted, onNext, ...props }: NameStepProps) {
  const { spacing } = useDesignerTheme();

  const [name, setName] = useState('');

  const [failure, setFailure] = useState<typeof NameIsRequired | null>();

  const sequence = useSequence({ hasStarted }, [
    'whatMayICallYou',
    'nameInputIn',
    'nameInputFocused',
  ])

  return (
    <Column
      {...props}
      gap={spacing.md}
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
    >
      <Speech
        hasStarted={sequence.hasReached('whatMayICallYou')}
        duration={2000}
        text="What is your name?"
        onFinished={sequence.next}
      />
      <Row>
        <Column
          flex={1}
          gap={spacing.sm}
          opacity={sequence.hasReached('nameInputIn') ? 1 : 0}
          transitions={{ opacity: timing(250).then(sequence.next) }}
        >
          <TextField.Filled
            key={sequence.hasReached('nameInputFocused') ? 'focusedInput' : 'fadeIn'}
            autoFocus={sequence.hasReached('nameInputFocused')}
            label="Name"
            value={name}
            onChangeText={name => {
              setName(name)
              setFailure(null)
            }}
            hasError={isFailure(failure, 'nameIsRequired')}
            supporting={isFailure(failure, 'nameIsRequired') ? 'Please enter a name' : undefined}
          />
          <Button.Filled
            opacity={sequence.hasReached('nameInputFocused') ? 1 : 0}
            transitions={{ opacity: timing(1000) }}
            onPress={() => {
              if (!name) setFailure(NameIsRequired);
              else {
                Keyboard.dismiss();
                onNext(name)
              }
            }}
          >
            Next <ArrowRightIcon />
          </Button.Filled>
        </Column>
      </Row>
    </Column>
  )
}






type EmailStepProps = Parameters<typeof Column>[0] & {
  name: string
  hasStarted: boolean
  onNext: (name: string) => any
}

const EmailIsRequired = makeFailure('emailIsRequired', {});

const EmailIsInUse = makeFailure('emailIsInUse', {});


function EmailStep({ name, hasStarted, onNext, ...props }: EmailStepProps) {
  const { spacing } = useDesignerTheme();

  const [email, setEmail] = useState('');

  const [failure, setFailure] = useState<typeof EmailIsRequired | typeof EmailIsInUse | null>();

  const sequence = useSequence({ hasStarted }, [
    'hmmmm',
    'doYouHaveAMoreUniqueIdentifier',
    'emailInputIn',
    'emailInputFocused'
  ])

  const { current: numberOfDuplicates } = useRef(Math.round(Math.random() * 100000));

  return (
    <Column
      {...props}
      gap={spacing.md}
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
    >
      <Speech
        hasStarted={sequence.hasReached('hmmmm')}
        duration={2000}
        text={`"${name}?" Hmmmm.... I know of ${numberOfDuplicates} "${name}s" across the ages.`}
        onFinished={sequence.next}
      />
      <Speech
        hasStarted={sequence.hasReached('doYouHaveAMoreUniqueIdentifier')}
        duration={2000}
        text="Do you have a more unique form of identification?"
        onFinished={sequence.next}
      />
      <Row>
        <Column
          flex={1}
          gap={spacing.sm}
          opacity={sequence.hasReached('emailInputIn') ? 1 : 0}
          transitions={{ opacity: timing(250).then(sequence.next) }}
        >
          <TextField.Filled
            key={sequence.hasReached('emailInputFocused') ? 'focusedInput' : 'fadeIn'}
            autoFocus={sequence.hasReached('emailInputFocused')}
            label="Email"
            value={email}
            onChangeText={email => {
              setEmail(email)
              setFailure(null)
            }}
            hasError={isAnyFailure(failure)}
            supporting={
              isFailure(failure, 'emailIsRequired') ? 'Please enter an email' :
                isFailure(failure, 'emailIsInUse') ? 'This email is already in use' :
                  undefined}
          />
          <Button.Filled
            opacity={sequence.hasReached('emailInputFocused') ? 1 : 0}
            transitions={{ opacity: timing(1000) }}
            onPress={async () => {
              if (!email) setFailure(EmailIsRequired);
              else if (await isEmailInUse(email)) setFailure(EmailIsInUse)
              else {
                Keyboard.dismiss();
                onNext(email)
              }
            }}
          >
            Next <ArrowRightIcon />
          </Button.Filled>
        </Column>
      </Row>
    </Column>
  )
}



type PasswordStepProps = Parameters<typeof Column>[0] & {
  name: string
  hasStarted: boolean
  onNext: (name: string) => any
}

const PasswordIsRequired = makeFailure('passwordIsRequired', {});

function PasswordStep({ name, hasStarted, onNext, ...props }: PasswordStepProps) {
  const { spacing } = useDesignerTheme();

  const [password, setPassword] = useState('');

  const [failure, setFailure] = useState<typeof PasswordIsRequired | null>();

  const sequence = useSequence({ hasStarted }, [
    'perfect',
    'whatMayICallYou',
    'passwordInputIn',
    'passwordInputFocused',
  ])

  return (
    <Column
      {...props}
      gap={spacing.md}
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
    >
      <Speech
        hasStarted={sequence.hasReached('perfect')}
        duration={2000}
        text={`Perfect. You have a great destiny, ${name}.`}
        onFinished={sequence.next}
      />
      <Speech
        hasStarted={sequence.hasReached('whatMayICallYou')}
        duration={4000}
        text="Could you also give me a passcode I can use to identify you?"
        onFinished={sequence.next}
      />
      <Row>
        <Column
          flex={1}
          gap={spacing.sm}
          opacity={sequence.hasReached('passwordInputIn') ? 1 : 0}
          transitions={{ opacity: timing(250).then(sequence.next) }}
        >
          <TextField.Filled
            key={sequence.hasReached('passwordInputFocused') ? 'focusedInput' : 'fadeIn'}
            autoFocus={sequence.hasReached('passwordInputFocused')}
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={password => {
              setPassword(password)
              setFailure(null)
            }}
            hasError={isFailure(failure, 'passwordIsRequired')}
            supporting={isFailure(failure, 'passwordIsRequired') ? 'Please enter a password' : undefined}
          />
          <Button.Filled
            opacity={sequence.hasReached('passwordInputFocused') ? 1 : 0}
            transitions={{ opacity: timing(1000) }}
            onPress={() => {
              if (!password) setFailure(PasswordIsRequired);
              else {
                Keyboard.dismiss();
                onNext(password)
              }
            }}
          >
            Next <ArrowRightIcon />
          </Button.Filled>
        </Column>
      </Row>
    </Column>
  )
}