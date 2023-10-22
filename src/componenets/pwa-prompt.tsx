import { useEffect } from 'react';
import Swal from 'sweetalert2';

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

const PwaPrompt = () => {
  
  useEffect(() => {
    // Check if the app is not running as a PWA
    const isRunningAsPwa = (window.matchMedia('(display-mode: standalone)').matches) || ((navigator as any).standalone === true);


    // Check if the user hasn't been prompted before or declined the installation
    const isPromptedBefore = localStorage.getItem('pwaPrompted');

    if (!isRunningAsPwa && !isPromptedBefore && deferredPrompt) {
      promptPwaInstallation();
    }
  }, []);

  const promptPwaInstallation = () => {
    Swal.fire({
      title: 'Install Loyalty App?',
      text: 'For a better experience, install our app on your home screen.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Install',
      cancelButtonText: 'Not now',
    }).then((result) => {
      if (result.isConfirmed && deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }

          // Store the fact that the user has been prompted
          localStorage.setItem('pwaPrompted', 'true');
        });
      } else if (result.isDismissed) {
        // If the user dismissed the prompt, also store this fact
        localStorage.setItem('pwaPrompted', 'true');
      }
    });
  };

  return null; // This component doesn't render anything visibly on its own
};

export default PwaPrompt;
