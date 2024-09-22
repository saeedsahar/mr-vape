//package org.stand.springbootecommerce.entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Size;
//import lombok.*;
//
//import java.util.List;
//
//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//@ToString
//@Builder
//@Entity
//@Table(name = "category")
//public class ProductCategory {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "id")
//    private Long id;
//
//    @NotBlank
//    @Size(max = 80)
//    @Column(name = "name", unique = true)
//    private String name;
//
//    @NotBlank
//    @Size(max = 255)
//    @Column(name = "description")
//    private String description;
//
//    @Column(name = "image")
//    private String image;
//
////    @JsonIgnore
//    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
//    private List<Product> productList;
//}