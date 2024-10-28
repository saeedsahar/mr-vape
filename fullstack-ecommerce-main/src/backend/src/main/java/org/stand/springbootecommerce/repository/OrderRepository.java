package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.stand.springbootecommerce.entity.Orders;

public interface OrderRepository extends JpaRepository<Orders,Long> {
}
