package com.of.web.rest;

import com.of.domain.PlayerCurrency;
import com.of.repository.PlayerCurrencyRepository;
import com.of.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.of.domain.PlayerCurrency}.
 */
@RestController
@RequestMapping("/api")
public class PlayerCurrencyResource {

    private final Logger log = LoggerFactory.getLogger(PlayerCurrencyResource.class);

    private static final String ENTITY_NAME = "playerCurrency";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlayerCurrencyRepository playerCurrencyRepository;

    public PlayerCurrencyResource(PlayerCurrencyRepository playerCurrencyRepository) {
        this.playerCurrencyRepository = playerCurrencyRepository;
    }

    /**
     * {@code POST  /player-currencies} : Create a new playerCurrency.
     *
     * @param playerCurrency the playerCurrency to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new playerCurrency, or with status {@code 400 (Bad Request)} if the playerCurrency has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/player-currencies")
    public ResponseEntity<PlayerCurrency> createPlayerCurrency(@Valid @RequestBody PlayerCurrency playerCurrency) throws URISyntaxException {
        log.debug("REST request to save PlayerCurrency : {}", playerCurrency);
        if (playerCurrency.getId() != null) {
            throw new BadRequestAlertException("A new playerCurrency cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlayerCurrency result = playerCurrencyRepository.save(playerCurrency);
        return ResponseEntity.created(new URI("/api/player-currencies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /player-currencies} : Updates an existing playerCurrency.
     *
     * @param playerCurrency the playerCurrency to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated playerCurrency,
     * or with status {@code 400 (Bad Request)} if the playerCurrency is not valid,
     * or with status {@code 500 (Internal Server Error)} if the playerCurrency couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/player-currencies")
    public ResponseEntity<PlayerCurrency> updatePlayerCurrency(@Valid @RequestBody PlayerCurrency playerCurrency) throws URISyntaxException {
        log.debug("REST request to update PlayerCurrency : {}", playerCurrency);
        if (playerCurrency.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlayerCurrency result = playerCurrencyRepository.save(playerCurrency);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, playerCurrency.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /player-currencies} : get all the playerCurrencies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of playerCurrencies in body.
     */
    @GetMapping("/player-currencies")
    public List<PlayerCurrency> getAllPlayerCurrencies() {
        log.debug("REST request to get all PlayerCurrencies");
        return playerCurrencyRepository.findAll();
    }

    /**
     * {@code GET  /player-currencies/:id} : get the "id" playerCurrency.
     *
     * @param id the id of the playerCurrency to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the playerCurrency, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/player-currencies/{id}")
    public ResponseEntity<PlayerCurrency> getPlayerCurrency(@PathVariable Long id) {
        log.debug("REST request to get PlayerCurrency : {}", id);
        Optional<PlayerCurrency> playerCurrency = playerCurrencyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(playerCurrency);
    }

    /**
     * {@code DELETE  /player-currencies/:id} : delete the "id" playerCurrency.
     *
     * @param id the id of the playerCurrency to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/player-currencies/{id}")
    public ResponseEntity<Void> deletePlayerCurrency(@PathVariable Long id) {
        log.debug("REST request to delete PlayerCurrency : {}", id);
        playerCurrencyRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
