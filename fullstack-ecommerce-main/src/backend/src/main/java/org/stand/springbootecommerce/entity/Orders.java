package org.stand.springbootecommerce.entity;



import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 *
 * @author mine
 */
@Entity
@Table(name = "orders")

public class Orders  {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "order_reference")
    private String orderReference;
    @Basic(optional = false)
    @Column(name = "recipient_name")
    private String recipientName;
    @Basic(optional = false)
    @Column(name = "recipient_address")
    private String recipientAddress;
    @Basic(optional = false)
    @Column(name = "recipient_city")
    private String recipientCity;
    @Basic(optional = false)
    @Column(name = "recipient_postcode")
    private String recipientPostcode;
    @Basic(optional = false)
    @Column(name = "recipient_country_code")
    private String recipientCountryCode;
    @Column(name = "recipient_phone")
    private String recipientPhone;
    @Column(name = "recipient_email")
    private String recipientEmail;
    @Basic(optional = false)
    @Column(name = "order_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;
    @Column(name = "planned_despatch_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date plannedDespatchDate;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic(optional = false)
    @Column(name = "subtotal")
    private BigDecimal subtotal;
    @Basic(optional = false)
    @Column(name = "shipping_cost_charged")
    private BigDecimal shippingCostCharged;
    @Basic(optional = false)
    @Column(name = "total")
    private BigDecimal total;
    @Basic(optional = false)
    @Column(name = "currency_code")
    private String currencyCode;
    @Column(name = "contains_dangerous_goods")
    private Boolean containsDangerousGoods;
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User userId;
    @OneToMany(mappedBy = "orderId", fetch = FetchType.LAZY)
    private List<Payment> paymentList;
    @OneToMany(mappedBy = "orderId", fetch = FetchType.LAZY)
    private List<OrderDetails> orderDetailsList;

    public Orders() {
    }

    public Orders(Integer id) {
        this.id = id;
    }

    public Orders(Integer id, String orderReference, String recipientName, String recipientAddress, String recipientCity, String recipientPostcode, String recipientCountryCode, Date orderDate, BigDecimal subtotal, BigDecimal shippingCostCharged, BigDecimal total, String currencyCode) {
        this.id = id;
        this.orderReference = orderReference;
        this.recipientName = recipientName;
        this.recipientAddress = recipientAddress;
        this.recipientCity = recipientCity;
        this.recipientPostcode = recipientPostcode;
        this.recipientCountryCode = recipientCountryCode;
        this.orderDate = orderDate;
        this.subtotal = subtotal;
        this.shippingCostCharged = shippingCostCharged;
        this.total = total;
        this.currencyCode = currencyCode;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderReference() {
        return orderReference;
    }

    public void setOrderReference(String orderReference) {
        this.orderReference = orderReference;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getRecipientAddress() {
        return recipientAddress;
    }

    public void setRecipientAddress(String recipientAddress) {
        this.recipientAddress = recipientAddress;
    }

    public String getRecipientCity() {
        return recipientCity;
    }

    public void setRecipientCity(String recipientCity) {
        this.recipientCity = recipientCity;
    }

    public String getRecipientPostcode() {
        return recipientPostcode;
    }

    public void setRecipientPostcode(String recipientPostcode) {
        this.recipientPostcode = recipientPostcode;
    }

    public String getRecipientCountryCode() {
        return recipientCountryCode;
    }

    public void setRecipientCountryCode(String recipientCountryCode) {
        this.recipientCountryCode = recipientCountryCode;
    }

    public String getRecipientPhone() {
        return recipientPhone;
    }

    public void setRecipientPhone(String recipientPhone) {
        this.recipientPhone = recipientPhone;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Date getPlannedDespatchDate() {
        return plannedDespatchDate;
    }

    public void setPlannedDespatchDate(Date plannedDespatchDate) {
        this.plannedDespatchDate = plannedDespatchDate;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public BigDecimal getShippingCostCharged() {
        return shippingCostCharged;
    }

    public void setShippingCostCharged(BigDecimal shippingCostCharged) {
        this.shippingCostCharged = shippingCostCharged;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public Boolean getContainsDangerousGoods() {
        return containsDangerousGoods;
    }

    public void setContainsDangerousGoods(Boolean containsDangerousGoods) {
        this.containsDangerousGoods = containsDangerousGoods;
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

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public List<Payment> getPaymentList() {
        return paymentList;
    }

    public void setPaymentList(List<Payment> paymentList) {
        this.paymentList = paymentList;
    }

    public List<OrderDetails> getOrderDetailsList() {
        return orderDetailsList;
    }

    public void setOrderDetailsList(List<OrderDetails> orderDetailsList) {
        this.orderDetailsList = orderDetailsList;
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
        if (!(object instanceof Orders)) {
            return false;
        }
        Orders other = (Orders) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.stand.springbootecommerce.entity.Orders[ id=" + id + " ]";
    }

}


