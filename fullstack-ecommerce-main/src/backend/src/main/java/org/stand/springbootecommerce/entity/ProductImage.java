package org.stand.springbootecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;

/**
 *
 * @author mine
 */
@Entity
@Table(name = "product_image")
public class ProductImage  {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "image")
    private String image;
    @JsonIgnore
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @ManyToOne
    private Product productId;

    public ProductImage() {
    }

    public ProductImage(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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
        if (!(object instanceof ProductImage)) {
            return false;
        }
        ProductImage other = (ProductImage) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.stand.springbootecommerce.entity.ProductImage[ id=" + id + " ]";
    }

}