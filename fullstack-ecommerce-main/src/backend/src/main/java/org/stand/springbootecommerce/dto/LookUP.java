package org.stand.springbootecommerce.dto;

public class LookUP {

    Long id;
    String Name;
    public LookUP(){}
    public LookUP(Long id, String name) {
        this.id = id;
        Name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }
}
