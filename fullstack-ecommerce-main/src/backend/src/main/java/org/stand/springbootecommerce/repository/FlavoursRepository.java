package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.stand.springbootecommerce.entity.Flavours;

@Repository
public interface FlavoursRepository extends JpaRepository<Flavours,Long> {


}
