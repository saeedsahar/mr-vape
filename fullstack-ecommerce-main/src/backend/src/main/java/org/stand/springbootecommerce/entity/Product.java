package org.stand.springbootecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.Objects;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Size(max = 150)
    @Column(name = "name")
    private String name;

    @NotBlank
    @Size(max = 3000)
    @Column(name = "description")
    private String description;


    @NotBlank
    @Size(max = 150)
    @Column(name = "short_description")
    private String shortDescription;

    @NotNull
    @PositiveOrZero
    @Column(name = "quantity")
    private int quantity = 0;

    @NotNull
    @Positive
    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Positive
    @Column(name = "was_price", precision = 10, scale = 2)
    private BigDecimal wasPrice;

    @NotBlank
    @Size(max = 255)
    // @Pattern(regexp = "^https?://.*\\.(png|jpg|jpeg)$")
    @Column(name = "image")
    private String image;

    @Column(name = "flavour_type")
    private String flavourType;
    @Column(name = "bottle_size")
    private String bottleSize;
    @Column(name = "nocotine_strength")
    private String nocotineStrength;
    @Column(name = "nocotine_type")
    private String nocotineType;
    @Column(name = "product_label")
    private String productLabel;
    @Column(name = "key_selling_points")
    private String keySellingPoints;
    @Column(name = "product_spec")
    private String productSpec;
    @JsonIgnore
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Brand brand;
//    @JsonIgnore
//    @JoinColumn(name = "category_id", referencedColumnName = "id")
//    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
//    private Category category;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product", fetch = FetchType.LAZY)
    private List<OrderItems> orderItemsList;


    @OneToMany(mappedBy = "productId", fetch = FetchType.LAZY)
    private List<ProductLiquidCapacity> productLiquidCapacityList;
    @OneToMany(mappedBy = "productId", fetch = FetchType.LAZY)
    private List<ProductFlavour> productFlavourList;
    @OneToMany(mappedBy = "productId", fetch = FetchType.LAZY)
    private List<ProductNicotine> productNicotineList;

    @OneToMany(mappedBy = "productId")
    private List<ProductImage> productImageList;


    @OneToMany(mappedBy = "produtId")
    private List<ProductReviews> productReviewsList;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Product product = (Product) o;
        return id != null && Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}