
import { AUTH, GOOGLEAUTH } from '../firebase/init';
import { sendSignInLinkToEmail, signInWithPopup } from '@firebase/auth';
import { RecaptchaVerifier } from 'firebase/auth';
import { signInWithPhoneNumber } from "firebase/auth";
import Swal from 'sweetalert2';

export const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
export const handleLogin = (inputValue, nav) => {
    if (isEmail(inputValue)) {
        // Email passwordless login
        const actionCodeSettings = {
            url: window.location.origin + '/',
            handleCodeInApp: true,
        };

        sendSignInLinkToEmail(AUTH, inputValue, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', inputValue);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Login link has been sent to your email!'
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                    footer: '<a href>Why do I have this issue?</a>'
                });
            });
    } else {
        // Phone number login
        // inputValue.replace('0', '+44');
        const appVerifier = new RecaptchaVerifier(AUTH, 're-captcha');

        signInWithPhoneNumber(AUTH, inputValue, appVerifier)
            .then((confirmationResult) => {
                return Swal.fire({
                    title: 'Enter the verification code',
                    input: 'text',
                    icon: 'question',
                    inputPlaceholder: 'Enter the verification code'
                }).then(result => {
                    if (result.isConfirmed) {
                        // Confirming the code
                        return confirmationResult.confirm(result.value);
                    }
                });
            })
            .then((result) => {
                if (result) { // Ensure result exists (i.e., user didn't cancel the Swal prompt)
                    window.location.reload()
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
            });
    }
};


export const handleGoogleLogin = () => {
    signInWithPopup(AUTH, GOOGLEAUTH).then((result) => {
        // User is signed in!
        // You can access the Google user info with result.user
    }).catch((error) => {
        // Handle Errors here.
        console.error(error.message);
    });
};

