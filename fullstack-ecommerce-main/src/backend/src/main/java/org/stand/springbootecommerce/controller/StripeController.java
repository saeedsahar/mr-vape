package org.stand.springbootecommerce.controller;

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


    @PostMapping("/payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> requestBody) {
        try {
            // Retrieve the amount and currency from the request
            int amount = (int) requestBody.get("amount"); // Amount should be in cents
            String currency = (String) requestBody.getOrDefault("currency", "gbp");

            // Create a payment intent
            Map<String, Object> params = new HashMap<>();
            params.put("amount", amount);
            params.put("currency", currency);
            params.put("payment_method_types", new String[]{"card"});

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            // Respond with the client secret
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", paymentIntent.getClientSecret());
            return ResponseEntity.ok(response);

        } catch (StripeException e) {
            // Log error for debugging
            e.printStackTrace();

            // Respond with an error message
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to create payment intent: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}



