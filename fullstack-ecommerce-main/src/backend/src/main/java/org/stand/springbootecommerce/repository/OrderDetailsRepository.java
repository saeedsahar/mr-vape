package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.stand.springbootecommerce.entity.OrderDetails;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails,Long> {
}
