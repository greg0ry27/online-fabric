package com.of.repository;

import com.of.domain.InventorySlot;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InventorySlot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InventorySlotRepository extends JpaRepository<InventorySlot, Long> {

}
