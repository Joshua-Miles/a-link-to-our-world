import { FailuresFrom, isAnyFailure, isFailure } from "@triframe/ambassador";
import { signUp } from "api";
import { Headline, TextField, Button, useDesignerTheme, Column, RowReverse, Row } from "designer-m3";
import { router } from "expo-router";
import { useState } from "react";

type SignUpOptions = Parameters<typeof signUp>[0]

type SignUpFailure = FailuresFrom<typeof signUp>;

export default function SignUp() {
    const { spacing } = useDesignerTheme();

    const [ signUpForm, setSignUpForm ] = useState<SignUpOptions>({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [ failure, setFailure ] = useState<SignUpFailure | null>(null)

    async function handleSignUp() {
        const result = await signUp(signUpForm);
        if (isAnyFailure(result)) setFailure(result)
        else router.push('/')
    }

    return (
        <Column m="auto" px={spacing.xs} maxWidth={spacing.container.md} width='100%' gap={spacing.md}>
            <Headline.Small>
                Sign Up
            </Headline.Small>
            <Column gap={spacing.sm}>
                <Row gap={spacing.xs}>
                    <TextField.Filled
                        label="First Name"
                        value={signUpForm.firstName}
                        onChangeText={firstName => setSignUpForm({ ...signUpForm, firstName })}
                        hasError={isFailure(failure, 'emailIsInvalid')}
                        supporting={
                            isFailure(failure, 'firstNameIsEmpty') ? 'First name is required'
                            : null
                        }
                    />
                    <TextField.Filled
                        label="Last Name"
                        value={signUpForm.lastName}
                        onChangeText={lastName => setSignUpForm({ ...signUpForm, lastName })}
                        secureTextEntry
                        hasError={isFailure(failure, 'lastNameIsEmpty')}
                        supporting={
                            isFailure(failure, 'lastNameIsEmpty') ? 'Last name is required'
                            : null
                        }
                    />
                </Row>
                <TextField.Filled
                    label="Email"
                    value={signUpForm.email}
                    onChangeText={email => setSignUpForm({ ...signUpForm, email })}
                    hasError={isFailure(failure, 'emailIsInvalid')}
                    supporting={
                        isFailure(failure, 'emailIsInvalid') ? 'Please enter a valid email'
                        : isFailure(failure, 'emailIsInUse') ? 'This email is associated with an existing account'
                        : null
                    }
                />
                <TextField.Filled
                    label="Password"
                    value={signUpForm.password}
                    onChangeText={password => setSignUpForm({ ...signUpForm, password })}
                    secureTextEntry
                    hasError={isFailure(failure, 'passwordTooShort')}
                    supporting={
                        isFailure(failure, 'passwordTooShort') ? 'Password must be 12 characters or longer'
                        : null
                    }
                />
                <RowReverse gap={spacing.xs}>
                    <Button.Filled onPress={handleSignUp}>
                        Sign Up
                    </Button.Filled>
                    <Button.Text href="/login">
                        Login
                    </Button.Text>
                </RowReverse>
            </Column>
        </Column>
    )
}
