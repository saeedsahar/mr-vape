package org.stand.springbootecommerce.dto.request;

import java.time.LocalDateTime;

public class ReviewRequest {

    Long user_id;
    Long product_id;
    Integer rating;
    String comment;
    String title;
    String review_Date;

    public ReviewRequest() {
    }

    public ReviewRequest(Long user_id, Long product_id, Integer rating, String comment, String title,String review_Date) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.rating = rating;
        this.comment = comment;
        this.title = title;
        this.review_Date = review_Date;
    }

    public String getReview_Date() {
        return review_Date;
    }

    public void setReview_Date(String review_Date) {
        this.review_Date = review_Date;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
