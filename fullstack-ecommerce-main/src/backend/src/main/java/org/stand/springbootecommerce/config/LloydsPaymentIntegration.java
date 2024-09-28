package org.stand.springbootecommerce.config;

import okhttp3.*;
import org.json.JSONObject;

import java.io.IOException;

public class LloydsPaymentIntegration {

    public static void main(String[] args) {
        // Set up the OkHttpClient
        OkHttpClient client = new OkHttpClient();

        // Replace these values with your actual credentials and data
        String apiKey = "YOUR_API_KEY"; // From Lloyds Bank/Cardnet
        String paymentUrl = "https://api.lloydsbank.com/payment/transactions"; // Hypothetical URL
        String cardNumber = "4111111111111111";  // Test card number (replace with actual data)
        String expiryDate = "12/25";  // MM/YY
        String cvv = "123";  // Card security code
        String amount = "1000";  // Amount in the smallest unit of the currency, e.g., pennies for GBP

        // Create the JSON payload for the payment
        JSONObject paymentData = new JSONObject();
        paymentData.put("amount", amount);
        paymentData.put("currency", "GBP");
        paymentData.put("cardNumber", cardNumber);
        paymentData.put("expiryDate", expiryDate);
        paymentData.put("cvv", cvv);
        paymentData.put("description", "Order #12345");  // Example order description

        // Create the request body
        RequestBody body = RequestBody.create(
                paymentData.toString(),
                MediaType.parse("application/json; charset=utf-8")
        );

        // Build the request with headers (including API key)
        Request request = new Request.Builder()
                .url(paymentUrl)
                .post(body)
                .addHeader("Authorization", "Bearer " + apiKey)
                .addHeader("Content-Type", "application/json")
                .build();

        // Execute the request
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                // Payment successful
                System.out.println("Payment Success: " + response.body().string());
            } else {
                // Handle failure
                System.out.println("Payment Failed: " + response.code());
                System.out.println("Response: " + response.body().string());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}


//String sandboxUrl = "https://sandbox.api.lloydsbank.com/payment/transactions";  // Sandbox API endpoint
//String sandboxApiKey = "YOUR_SANDBOX_API_KEY";  // Sandbox API key provided by Lloyds Bank
//
//Request request = new Request.Builder()
//        .url(sandboxUrl)
//        .post(body)  // Same request body as before
//        .addHeader("Authorization", "Bearer " + sandboxApiKey)  // Use the sandbox API key
//        .addHeader("Content-Type", "application/json")
//        .build();

// Send request to sandbox environment for testing

