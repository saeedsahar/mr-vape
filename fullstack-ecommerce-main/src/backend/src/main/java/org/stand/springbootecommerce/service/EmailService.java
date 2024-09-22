package org.stand.springbootecommerce.service;

import org.stand.springbootecommerce.config.EmailConfig;

import javax.mail.Message;
import javax.mail.internet.MimeMessage;
import javax.mail.Transport;

public class EmailService {

    public void sendEmail(String to, String subject, String body) {
        try {
            Message message = new MimeMessage(EmailConfig.getSession());
            message.setFrom(new javax.mail.internet.InternetAddress("your_email@gmail.com")); // Change as needed
            message.setRecipients(Message.RecipientType.TO, javax.mail.internet.InternetAddress.parse(to));
            message.setSubject(subject);
            message.setText(body);

            Transport.send(message);
            System.out.println("Email sent successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
