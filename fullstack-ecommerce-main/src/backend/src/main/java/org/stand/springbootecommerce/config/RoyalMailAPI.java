package org.stand.springbootecommerce.config;

import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;

public class RoyalMailAPI {
    private static final String API_URL = "https://api.parcel.royalmail.com/api/v1/orders"; // Use HTTP
    private static final String API_KEY = "dc2cacd0-64df-4f34-83dd-e104ad413823"; // Replace with your API key

    public static Boolean createOrder(String orderJson) {
        HttpURLConnection conn = null;
        Boolean flag=false;

        try {
            URL url = new URL(API_URL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + API_KEY);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            // Write JSON payload to the output stream
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = orderJson.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            // Get the response code and handle the response
            int responseCode = conn.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            // Read the response body
            try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                flag=true;
                System.out.println("Response Body: " + response.toString());
            }
        } catch (IOException e) {
            System.err.println("Error during HTTP request: " + e.getMessage());
            if (e.getMessage().contains("Connection refused")) {
                System.err.println("The server may be down, or the URL may be incorrect.");
            }
            if (conn != null) {
                try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "utf-8"))) {
                    StringBuilder errorResponse = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        errorResponse.append(responseLine.trim());
                    }
                    System.err.println("Error Response: " + errorResponse.toString());
                } catch (IOException ioException) {
                    System.err.println("Failed to read error response: " + ioException.getMessage());
                }
            }
        } finally {
            if (conn != null) {
                conn.disconnect(); // Ensure the connection is closed
            }
        }
        return flag;
    }


    public static void main(String[] args) {
        String orderJson = "{" +
                "\"recipient\": {" +
                "\"name\": \"John Doe\"," +
                "\"address\": \"123 Main Street, London, UK\"" +
                "}," +
                "\"sender\": {" +
                "\"name\": \"Jane Smith\"," +
                "\"address\": \"456 Another St, Manchester, UK\"" +
                "}," +
                "\"items\": [{" +
                "\"itemId\": \"abc123\"," +
                "\"quantity\": 2" +
                "}]" +
                "}";

        createOrder(orderJson);
    }
}
