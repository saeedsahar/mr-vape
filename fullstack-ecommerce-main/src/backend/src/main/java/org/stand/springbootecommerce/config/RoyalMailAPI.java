package org.stand.springbootecommerce.config;

import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;

public class RoyalMailAPI {
    private static final String API_URL = "https://api.royalmail.com/clickanddrop/v1/orders";
    private static final String API_KEY = "your_api_key"; // Replace with your API key

    public static void createOrder(String orderJson) throws Exception {
        URL url = new URL(API_URL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "Bearer " + API_KEY);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = orderJson.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        int responseCode = conn.getResponseCode();
        System.out.println("Response Code: " + responseCode);
    }

    public static void main(String[] args) {
        String orderJson = "" +
                "" +
                "{\"recipient\": {...}, \"sender\": {...}, ...}"; // Replace with your order details
        try {
            createOrder(orderJson);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


//{
//        "recipient": {
//        "name": "John Doe",
//        "company": "Doe Enterprises",
//        "address1": "123 Main St",
//        "address2": "Suite 456",
//        "city": "London",
//        "postcode": "E1 1AA",
//        "country": "GB",
//        "email": "john.doe@example.com",
//        "telephone": "+441234567890"
//        },
//        "sender": {
//        "name": "Jane Smith",
//        "company": "Smith Logistics",
//        "address1": "789 Elm St",
//        "city": "Manchester",
//        "postcode": "M1 1AA",
//        "country": "GB",
//        "email": "jane.smith@example.com",
//        "telephone": "+441234567891"
//        },
//        "items": [
//        {
//        "description": "Sample Product",
//        "quantity": 1,
//        "weight": 500,  // weight in grams
//        "value": 29.99,
//        "customs": {
//        "commodityCode": "123456",
//        "originCountry": "GB"
//        }
//        }
//        ],
//        "service": {
//        "serviceCode": "1st",  // e.g., "1st", "2nd", "Next Day"
//        "serviceType": "standard" // can be "standard" or "international"
//        },
//        "reference": "ORD123456",
//        "labelFormat": "PDF"
//        }
