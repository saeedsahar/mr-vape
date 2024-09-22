package org.stand.springbootecommerce.entity;

import jakarta.persistence.*;

/**
 *
 * @author mine
 */
@Entity
@Table(name = "product_nicotine")
public class ProductNicotine {

    @Id
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "nicotine_type")
    private String nicotineType;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "price")
    private Double price;
    @Column(name = "image")
    private String image;
    @Column(name = "quantity")
    private Double quantity;
    @Column(name = "description")
    private String description;
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Product productId;

    public ProductNicotine() {
    }

    public ProductNicotine(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNicotineType() {
        return nicotineType;
    }

    public void setNicotineType(String nicotineType) {
        this.nicotineType = nicotineType;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Product getProductId() {
        return productId;
    }

    public void setProductId(Product productId) {
        this.productId = productId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ProductNicotine)) {
            return false;
        }
        ProductNicotine other = (ProductNicotine) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.stand.springbootecommerce.entity.ProductNicotine[ id=" + id + " ]";
    }

}

