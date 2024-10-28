package org.stand.springbootecommerce.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class OrderRequest {
    private List<Item> items;

    // Getters and Setters


    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Item {
        private String orderReference;
        private Recipient recipient;
        private String orderDate;
        private double subtotal;
        private double shippingCostCharged;
        private double total;
        private String currencyCode;
        private List<Package> packages;

        // Getters and Setters
        @Data
        @Builder
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Recipient {
            private Address address;
            private String phoneNumber;
            private String emailAddress;

            // Getters and Setters
            @Data
            @Builder
            @AllArgsConstructor
            @NoArgsConstructor
            public static class Address {
                private String fullName;
                private String addressLine1;
                private String city;
                private String postcode;
                private String countryCode;

                // Getters and Setters
            }
        }
        @Data
        @Builder
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Package {
            private int weightInGrams;
            private String packageFormatIdentifier;
            private List<Content> contents;

            // Getters and Setters
            @Data
            @Builder
            @AllArgsConstructor
            @NoArgsConstructor
            public static class Content {
                private String name;
                private String sku;
                private int quantity;
                private double unitValue;
                private int unitWeightInGrams;

                // Getters and Setters
            }
        }
    }

    // Getters and Setters for OrderRequest class
}
