package org.stand.springbootecommerce.dto.request;

public class FlavourDTO {

    private Long id;
    private String flavour;
    private int quantity;

    public FlavourDTO() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FlavourDTO(String flavour, int quantity) {
        this.flavour = flavour;
        this.quantity = quantity;
    }


    // Getters and Setters
    public String getFlavour() {
        return flavour;
    }

    public void setFlavour(String flavour) {
        this.flavour = flavour;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}

