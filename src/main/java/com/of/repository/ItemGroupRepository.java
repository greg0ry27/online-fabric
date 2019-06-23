package com.of.repository;

import com.of.domain.ItemGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ItemGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemGroupRepository extends JpaRepository<ItemGroup, Long> {

}
