package com.of.web.rest;

import com.of.domain.InventorySlot;
import com.of.repository.InventorySlotRepository;
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
 * REST controller for managing {@link com.of.domain.InventorySlot}.
 */
@RestController
@RequestMapping("/api")
public class InventorySlotResource {

    private final Logger log = LoggerFactory.getLogger(InventorySlotResource.class);

    private static final String ENTITY_NAME = "inventorySlot";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InventorySlotRepository inventorySlotRepository;

    public InventorySlotResource(InventorySlotRepository inventorySlotRepository) {
        this.inventorySlotRepository = inventorySlotRepository;
    }

    /**
     * {@code POST  /inventory-slots} : Create a new inventorySlot.
     *
     * @param inventorySlot the inventorySlot to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inventorySlot, or with status {@code 400 (Bad Request)} if the inventorySlot has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/inventory-slots")
    public ResponseEntity<InventorySlot> createInventorySlot(@Valid @RequestBody InventorySlot inventorySlot) throws URISyntaxException {
        log.debug("REST request to save InventorySlot : {}", inventorySlot);
        if (inventorySlot.getId() != null) {
            throw new BadRequestAlertException("A new inventorySlot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InventorySlot result = inventorySlotRepository.save(inventorySlot);
        return ResponseEntity.created(new URI("/api/inventory-slots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /inventory-slots} : Updates an existing inventorySlot.
     *
     * @param inventorySlot the inventorySlot to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inventorySlot,
     * or with status {@code 400 (Bad Request)} if the inventorySlot is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inventorySlot couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/inventory-slots")
    public ResponseEntity<InventorySlot> updateInventorySlot(@Valid @RequestBody InventorySlot inventorySlot) throws URISyntaxException {
        log.debug("REST request to update InventorySlot : {}", inventorySlot);
        if (inventorySlot.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InventorySlot result = inventorySlotRepository.save(inventorySlot);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, inventorySlot.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /inventory-slots} : get all the inventorySlots.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inventorySlots in body.
     */
    @GetMapping("/inventory-slots")
    public List<InventorySlot> getAllInventorySlots() {
        log.debug("REST request to get all InventorySlots");
        return inventorySlotRepository.findAll();
    }

    /**
     * {@code GET  /inventory-slots/:id} : get the "id" inventorySlot.
     *
     * @param id the id of the inventorySlot to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inventorySlot, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/inventory-slots/{id}")
    public ResponseEntity<InventorySlot> getInventorySlot(@PathVariable Long id) {
        log.debug("REST request to get InventorySlot : {}", id);
        Optional<InventorySlot> inventorySlot = inventorySlotRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(inventorySlot);
    }

    /**
     * {@code DELETE  /inventory-slots/:id} : delete the "id" inventorySlot.
     *
     * @param id the id of the inventorySlot to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/inventory-slots/{id}")
    public ResponseEntity<Void> deleteInventorySlot(@PathVariable Long id) {
        log.debug("REST request to delete InventorySlot : {}", id);
        inventorySlotRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
