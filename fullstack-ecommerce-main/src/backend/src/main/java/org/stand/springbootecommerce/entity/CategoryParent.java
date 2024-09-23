package org.stand.springbootecommerce.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

/**
     *
     * @author mine
     */
    @Entity
    @Table(name = "category_parent")

    public class CategoryParent  {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Basic(optional = false)
        @Column(name = "id")
        private Integer id;
        @Column(name = "name")
        private String name;
        @Column(name = "desciption")
        private String desciption;
        @Column(name = "image")
        private String image;
        @Column(name = "short_description")
        private String shortDescription;
//        @OneToMany(mappedBy = "parentCategoryId")
//        private List<Category> categoryList;

        public CategoryParent() {
        }

        public CategoryParent(Integer id) {
            this.id = id;
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDesciption() {
            return desciption;
        }

        public void setDesciption(String desciption) {
            this.desciption = desciption;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }

        public String getShortDescription() {
            return shortDescription;
        }

        public void setShortDescription(String shortDescription) {
            this.shortDescription = shortDescription;
        }

//        public List<Category> getCategoryList() {
//            return categoryList;
//        }
//
//        public void setCategoryList(List<Category> categoryList) {
//            this.categoryList = categoryList;
//        }

        @Override
        public int hashCode() {
            int hash = 0;
            hash += (id != null ? id.hashCode() : 0);
            return hash;
        }

        @Override
        public boolean equals(Object object) {
            // TODO: Warning - this method won't work in the case the id fields are not set
            if (!(object instanceof CategoryParent)) {
                return false;
            }
            CategoryParent other = (CategoryParent) object;
            if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
                return false;
            }
            return true;
        }

        @Override
        public String toString() {
            return "org.stand.springbootecommerce.entity.CategoryParent[ id=" + id + " ]";
        }

    }

