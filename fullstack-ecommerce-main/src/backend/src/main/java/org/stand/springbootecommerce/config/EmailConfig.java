package org.stand.springbootecommerce.config;

import java.util.Properties;
    import java.util.Properties;
import javax.mail.Session;

    public class EmailConfig {
        public static Session getSession() {
            Properties properties = new Properties();
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.starttls.enable", "true");
            properties.put("mail.smtp.host", "smtp.gmail.com"); // Change as needed
            properties.put("mail.smtp.port", "587");

            return Session.getInstance(properties, new javax.mail.Authenticator() {
                protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                    return new javax.mail.PasswordAuthentication("your_email@gmail.com", "your_password"); // Change as needed
                }
            });
        }
    }

