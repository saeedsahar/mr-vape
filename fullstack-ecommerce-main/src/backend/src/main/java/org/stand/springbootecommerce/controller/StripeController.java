package org.stand.springbootecommerce.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200", "https://vapeplanet.co.uk", "https://www.vapeplanet.co.uk"})

public class StripeController {

    @PostMapping("/charge")
    public Map<String, Object> createCharge(@RequestBody Map<String, Object> chargeRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            Long amount = Long.valueOf(chargeRequest.get("amount").toString());
            String currency = chargeRequest.get("currency").toString();
            String source = chargeRequest.get("source").toString();
            String description = chargeRequest.get("description").toString();

            Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("amount", amount);
            chargeParams.put("currency", currency);
            chargeParams.put("source", source);
            chargeParams.put("description", description);

            Charge charge = Charge.create(chargeParams);

            response.put("status", "success");
            response.put("chargeId", charge.getId());
            response.put("chargeStatus", charge.getStatus());
        } catch (StripeException e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }
        return response;
    }


//    @PostMapping("/payment-intent")
//    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> requestBody) {
//        try {
//            // Retrieve amount, currency, and optional PaymentIntent ID from the request
//            int amount = (int) requestBody.get("amount"); // Amount in cents
//            String currency = (String) requestBody.getOrDefault("currency", "gbp");
//            String paymentIntentId = (String) requestBody.getOrDefault("paymentIntentId", null);
//
//            PaymentIntent paymentIntent;
//
//            if (paymentIntentId != null) {
//                try {
//                    // Attempt to retrieve the existing PaymentIntent
//                    paymentIntent = PaymentIntent.retrieve(paymentIntentId);
//                    System.out.println("Retrieved existing PaymentIntent: " + paymentIntent.getId());
//                } catch (StripeException e) {
//                    // If the PaymentIntent doesn't exist, log and create a new one
//                    System.err.println("PaymentIntent does not exist or is invalid. Creating a new one...");
//                    paymentIntent = createNewPaymentIntent(amount, currency);
//                }
//            } else {
//                // Create a new PaymentIntent if no ID is provided
//                paymentIntent = createNewPaymentIntent(amount, currency);
//            }
//
//            // Respond with the client secret
//            Map<String, String> response = new HashMap<>();
//            response.put("clientSecret", paymentIntent.getClientSecret());
//            response.put("paymentIntentId", paymentIntent.getId());
//            return ResponseEntity.ok(response);
//
//        } catch (StripeException e) {
//            // Log error for debugging
//            e.printStackTrace();
//
//            // Respond with an error message
//            Map<String, String> errorResponse = new HashMap<>();
//            errorResponse.put("error", "Failed to create or retrieve payment intent: " + e.getMessage());
//            return ResponseEntity.badRequest().body(errorResponse);
//        }
//    }



//    // Helper method to create a new PaymentIntent
//    private PaymentIntent createNewPaymentIntent(int amount, String currency) throws StripeException {
//        Map<String, Object> params = new HashMap<>();
//        params.put("amount", amount); // Amount in cents
//        params.put("currency", currency); // Currency
//        params.put("payment_method_types", new String[]{"card"}); // Payment method types
//        return PaymentIntent.create(params); // Create and return the new PaymentIntent
//    }


    @PostMapping("/payment-intent")
    public ResponseEntity<Map<String, String>> createOrValidatePaymentIntent(@RequestBody Map<String, Object> requestBody) {
        Stripe.apiKey = ""; // Replace with your live secret key

        String paymentIntentId = (String) requestBody.getOrDefault("paymentIntentId", null);
        int amount = (int) requestBody.get("amount"); // Amount in cents
        String currency = (String) requestBody.getOrDefault("currency", "gbp");

        try {
            PaymentIntent paymentIntent;
            if (paymentIntentId != null) {
                try {
                    // Try to retrieve the PaymentIntent
                    paymentIntent = PaymentIntent.retrieve(paymentIntentId);
                    System.out.println("Retrieved existing PaymentIntent: " + paymentIntent.getId());
                } catch (StripeException e) {
                    // If the PaymentIntent doesn't exist, create a new one
                    System.out.println("PaymentIntent not found. Creating a new one...");
                    paymentIntent = createNewPaymentIntent(amount, currency);
                }
            } else {
                // If no PaymentIntent ID is provided, create a new one
                paymentIntent = createNewPaymentIntent(amount, currency);
            }

            // Return the client secret
            Map<String, String> response = new HashMap<>();
//            response.put("clientSecret", paymentIntent.getClientSecret());
            response.put("paymentIntentId", paymentIntent.getId());
            return ResponseEntity.ok(response);

        } catch (StripeException e) {
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to create or retrieve PaymentIntent: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    // Helper method to create a new PaymentIntent
    private PaymentIntent createNewPaymentIntent(int amount, String currency) throws StripeException {
        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);
        params.put("currency", currency);
        params.put("payment_method_types", new String[]{"card"});
        return PaymentIntent.create(params);
    }
}



