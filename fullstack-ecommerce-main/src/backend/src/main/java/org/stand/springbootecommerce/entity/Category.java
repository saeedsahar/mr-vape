package org.stand.springbootecommerce.entity;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


/**
 *
 * @author mine
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString

@Entity
@Table(name = "category")

public class Category {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name = "description")
    private String description;
    @Column(name = "name")
    private String name;
    @Column(name = "image")
    private String image;

    @OneToMany(mappedBy = "category")
    private List<Brand> brandList;
//    @JsonIgnore
//    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
//    private List<Product> productList;

    @JsonIgnore
    @JoinColumn(name = "parent_category_id", referencedColumnName = "id")
    @ManyToOne
    private CategoryParent parentCategoryId;





    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (!(object instanceof Category)) {
            return false;
        }
        Category other = (Category) object;

        // Check if both IDs are null
        if (this.id == null && other.id == null) {
            // Optionally, compare other fields when both IDs are null
            return this.name.equals(other.name);  // Example field comparison
        }

        // If one of the IDs is null, they can't be equal
        if (this.id == null || other.id == null) {
            return false;
        }

        // Otherwise, compare IDs
        return this.id.equals(other.id);
    }

    @Override
    public int hashCode() {
        return (id != null ? id.hashCode() : 0);
    }







    @Override
    public String toString() {
        return "org.stand.springbootecommerce.entity.Category[ id=" + id + " ]";
    }

}

