import { FailuresFrom, isAnyFailure, isFailure } from "@triframe/ambassador";
import { login } from "api";
import { Headline, TextField, Button, useDesignerTheme, Column, RowReverse } from "designer-m3";
import { router } from "expo-router";
import { useState } from "react";

type LoginOptions = Parameters<typeof login>[0]

type LoginFailure = FailuresFrom<typeof login>;

export default function Login() {
    const { spacing } = useDesignerTheme();

    const [ loginForm, setLoginForm ] = useState<LoginOptions>({
        email: '',
        password: ''
    });

    const [ failure, setFailure ] = useState<LoginFailure | null>(null)

    async function handleLogin() {
        const result = await login(loginForm);
        if (isAnyFailure(result)) setFailure(result)
        else router.push('/')
    }

    return (
        <Column m="auto" px={spacing.xs} maxWidth={spacing.container.md} width='100%' gap={spacing.md}>
            <Headline.Small>
                Login
            </Headline.Small>
            <Column gap={spacing.sm}>
                <TextField.Filled
                    label="Email"
                    value={loginForm.email}
                    onChangeText={email => setLoginForm({ ...loginForm, email })}
                    hasError={isFailure(failure, 'emailIsInvalid') || isFailure(failure, 'invalidCredentials')}
                    supporting={isFailure(failure, 'emailIsInvalid') ? 'Please enter a valid email' : null}
                />
                <TextField.Filled
                    label="Password"
                    value={loginForm.password}
                    onChangeText={password => setLoginForm({ ...loginForm, password })}
                    secureTextEntry
                    hasError={isFailure(failure, 'passwordTooShort') || isFailure(failure, 'invalidCredentials')}
                    supporting={
                        isFailure(failure, 'passwordTooShort') ? 'Password must be 12 characters or longer'
                        : isFailure(failure, 'invalidCredentials') ? 'Could not find a user with the given email and password'
                        : null
                    }
                />
                <RowReverse gap={spacing.xs}>
                    <Button.Filled onPress={handleLogin}>
                        Login
                    </Button.Filled>
                    <Button.Text href="/sign-up">
                        Sign up
                    </Button.Text>
                </RowReverse>
            </Column>
        </Column>
    )
}
