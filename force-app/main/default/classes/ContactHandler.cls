public with sharing class ContactHandler {
    @AuraEnabled
    public static Contact getOrCreateContact(String email) {
        if (String.isBlank(email)) {
            throw new AuraHandledException('Email cannot be empty.');
        }

        List<Contact> contacts = [SELECT FirstName, LastName, Phone, Email FROM Contact WHERE Email = :email LIMIT 1];

        try {
            // If the contact does not exists
            if (contacts.isEmpty()) {
                Contact con = new Contact(LastName = 'TBD', Email = email);

                insert con;
                return con;
            }

            return contacts[0];
        } catch (Exception e) {
            throw new AuraHandledException('An error occurred while creating or retrieving the contact: ' + e.getMessage());
        }
    }
}
