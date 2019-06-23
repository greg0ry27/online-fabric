package com.of.repository;

import com.of.domain.PlayerCurrency;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PlayerCurrency entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlayerCurrencyRepository extends JpaRepository<PlayerCurrency, Long> {

}
