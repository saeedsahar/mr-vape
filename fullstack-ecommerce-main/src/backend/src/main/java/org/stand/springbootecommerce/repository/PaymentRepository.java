package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.stand.springbootecommerce.entity.Payment;

public interface PaymentRepository  extends JpaRepository<Payment,Long> {


}
