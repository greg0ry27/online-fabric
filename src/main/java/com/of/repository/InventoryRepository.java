package com.of.repository;

import com.of.domain.Inventory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Inventory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

}
