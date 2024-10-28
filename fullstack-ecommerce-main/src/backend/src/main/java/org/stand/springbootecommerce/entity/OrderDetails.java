package org.stand.springbootecommerce.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 *
 * @author mine
 */
@Entity
@Table(name = "order_details")
@NamedQueries({
        @NamedQuery(name = "OrderDetails.findAll", query = "SELECT o FROM OrderDetails o")})
public class OrderDetails implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "order_detail_id")
    private Integer orderDetailId;
    @Basic(optional = false)
    @Column(name = "product_name")
    private String productName;
    @Basic(optional = false)
    @Column(name = "SKU")
    private String sku;
    @Basic(optional = false)
    @Column(name = "quantity")
    private int quantity;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic(optional = false)
    @Column(name = "unit_value")
    private BigDecimal unitValue;
    @Basic(optional = false)
    @Column(name = "unit_weight_in_grams")
    private int unitWeightInGrams;
    @Basic(optional = false)
    @Column(name = "weight_in_grams")
    private int weightInGrams;
    @Basic(optional = false)
    @Column(name = "package_format_identifier")
    private String packageFormatIdentifier;
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Orders orderId;

    public OrderDetails() {
    }

    public OrderDetails(Integer orderDetailId) {
        this.orderDetailId = orderDetailId;
    }

    public OrderDetails(Integer orderDetailId, String productName, String sku, int quantity, BigDecimal unitValue, int unitWeightInGrams, int weightInGrams, String packageFormatIdentifier) {
        this.orderDetailId = orderDetailId;
        this.productName = productName;
        this.sku = sku;
        this.quantity = quantity;
        this.unitValue = unitValue;
        this.unitWeightInGrams = unitWeightInGrams;
        this.weightInGrams = weightInGrams;
        this.packageFormatIdentifier = packageFormatIdentifier;
    }

    public Integer getOrderDetailId() {
        return orderDetailId;
    }

    public void setOrderDetailId(Integer orderDetailId) {
        this.orderDetailId = orderDetailId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitValue() {
        return unitValue;
    }

    public void setUnitValue(BigDecimal unitValue) {
        this.unitValue = unitValue;
    }

    public int getUnitWeightInGrams() {
        return unitWeightInGrams;
    }

    public void setUnitWeightInGrams(int unitWeightInGrams) {
        this.unitWeightInGrams = unitWeightInGrams;
    }

    public int getWeightInGrams() {
        return weightInGrams;
    }

    public void setWeightInGrams(int weightInGrams) {
        this.weightInGrams = weightInGrams;
    }

    public String getPackageFormatIdentifier() {
        return packageFormatIdentifier;
    }

    public void setPackageFormatIdentifier(String packageFormatIdentifier) {
        this.packageFormatIdentifier = packageFormatIdentifier;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Orders getOrderId() {
        return orderId;
    }

    public void setOrderId(Orders orderId) {
        this.orderId = orderId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (orderDetailId != null ? orderDetailId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof OrderDetails)) {
            return false;
        }
        OrderDetails other = (OrderDetails) object;
        if ((this.orderDetailId == null && other.orderDetailId != null) || (this.orderDetailId != null && !this.orderDetailId.equals(other.orderDetailId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.stand.springbootecommerce.entity.OrderDetails[ orderDetailId=" + orderDetailId + " ]";
    }

}

