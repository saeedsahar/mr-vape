package org.stand.springbootecommerce.dto.response;

public class ProductReviewResponse {

    String reviewer_name;
    String title;
    String comment;
    Integer rating;
    String Date_time;


    public ProductReviewResponse(String reviewer_name, String title, String comment, Integer rating, String date_time) {
        this.reviewer_name = reviewer_name;
        this.title = title;
        this.comment = comment;
        this.rating = rating;
        Date_time = date_time;
    }

    public ProductReviewResponse() {
    }

    public String getReviewer_name() {
        return reviewer_name;
    }

    public void setReviewer_name(String reviewer_name) {
        this.reviewer_name = reviewer_name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getDate_time() {
        return Date_time;
    }

    public void setDate_time(String date_time) {
        Date_time = date_time;
    }
}
