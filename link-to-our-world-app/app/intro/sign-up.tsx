import { isAnyFailure, isFailure, makeFailure } from "@triframe/ambassador";
import { isLoading, useForm } from "@triframe/utils-react";
import { isEmailInUse, signUp } from "api";
import { Button, Column, Display, Headline, Label, Page, Row, TextField, timing, useDesignerTheme } from "designer-m3";
import { ArrowRightIcon } from "designer-m3/icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard } from "react-native";
import { Speech, useSequence } from "../shared";

type UserForm = {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const transition = timing(1000);
  const { spacing, motion } = useDesignerTheme();

  const sequence = useSequence({ hasStarted: true }, [
    'name',
    'nameOut',
    'email',
    'emailOut',
    'password',
    'passwordOut'
  ])

  const [ user, setUser ] = useState<UserForm>({
    name: '',
    email: '',
    password: ''
  })

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
        <NameStep
          display={sequence.has({ reached: 'name', notPassed: 'nameOut' }) ?  'flex': 'none'}
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
          display={sequence.has({ reached: 'email', notPassed: 'emailOut' }) ?  'flex': 'none'}
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
          display={sequence.has({ reached: 'password', notPassed: 'passwordOut' }) ?  'flex': 'none'}
          opacity={sequence.isAt('password') ? 1 : 0}
          transitions={{
            opacity: timing(250)
          }}
          onNext={async password => {
            sequence.next();
            const result = { ...user, password }
            await signUp(result)
            router.push('/')
          }}
        />
      </Column>
    </Page>
  );
}


type NameStepProps = Parameters<typeof Column>[0] & {
  onNext: (name: string) => any
}

const NameIsRequired = makeFailure('nameIsRequired', {});

function NameStep({ onNext, ...props }: NameStepProps) {
  const { spacing } = useDesignerTheme();

  const [ name, setName ] = useState('');

  const [ failure, setFailure ] = useState<typeof NameIsRequired | null>();

  const sequence = useSequence({ hasStarted: true }, [
    'courageAwakes',
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
      justifyContent="center"
    >
      <Speech
        hasStarted={sequence.hasReached('courageAwakes')}
        duration={2000}
        text="Courage awakes in the device of a hero."
        onFinished={sequence.next}
      />
      <Speech
        hasStarted={sequence.hasReached('whatMayICallYou')}
        duration={2000}
        text="What may I call you, master?"
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
            key={sequence.hasReached('nameInputFocused' ) ? 'focusedInput' : 'fadeIn'}
            autoFocus={sequence.hasReached('nameInputFocused' )}
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
            opacity={sequence.hasReached('nameInputFocused' ) ? 1 : 0}
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

  const [ email, setEmail ] = useState('');

  const [ failure, setFailure ] = useState<typeof EmailIsRequired | typeof EmailIsInUse | null>();

  const sequence = useSequence({ hasStarted }, [
    'hmmmm',
    'doYouHaveAMoreUniqueIdentifier',
    'emailInputIn',
    'emailInputFocused'
  ])

  const { current: numberOfDuplicates } = useRef(Math.round(Math.random()*100000));

  return (
    <Column
      {...props}
      gap={spacing.md}
      flex={1}
      alignItems="center"
      justifyContent="center"
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
            key={sequence.hasReached('emailInputFocused' ) ? 'focusedInput' : 'fadeIn'}
            autoFocus={sequence.hasReached('emailInputFocused' )}
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
            opacity={sequence.hasReached('emailInputFocused' ) ? 1 : 0}
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

  const [ password, setPassword ] = useState('');

  const [ failure, setFailure ] = useState<typeof PasswordIsRequired | null>();

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
      justifyContent="center"
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
        text="Could you give me a code, so if we become seperated and then reunite, I might ask the code of you again, to ensure it's really you?"
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
            key={sequence.hasReached('passwordInputFocused' ) ? 'focusedInput' : 'fadeIn'}
            autoFocus={sequence.hasReached('passwordInputFocused' )}
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
            opacity={sequence.hasReached('passwordInputFocused' ) ? 1 : 0}
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