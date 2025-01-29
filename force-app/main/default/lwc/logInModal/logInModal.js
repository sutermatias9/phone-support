import { LightningElement } from 'lwc';
import getOrCreateContact from '@salesforce/apex/ContactHandler.getOrCreateContact';

export default class LogInModal extends LightningElement {
    isLogInOpen = false;

    connectedCallback() {
        console.log('In LogIn ConnectedCallback');
        this.isLogInOpen = true;
    }

    handleLogInClick() {
        const emailInput = this.template.querySelector('lightning-input');

        if (this.isValidEmail(emailInput.value)) {
            emailInput.setCustomValidity('');
            emailInput.reportValidity();

            getOrCreateContact({ email: emailInput.value.trim() })
                .then((result) => console.log(result)) // LMS stills need to be implemented.
                .catch((err) => console.log('ERROR ' + err));
        } else {
            emailInput.setCustomValidity('You have entered an invalid format.');
            emailInput.reportValidity();
        }
    }

    handleModalClose() {
        this.isLogInOpen = false;
    }

    isValidEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
}
