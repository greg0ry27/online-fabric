package com.of.web.rest;

import com.of.domain.ItemGroup;
import com.of.repository.ItemGroupRepository;
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
 * REST controller for managing {@link com.of.domain.ItemGroup}.
 */
@RestController
@RequestMapping("/api")
public class ItemGroupResource {

    private final Logger log = LoggerFactory.getLogger(ItemGroupResource.class);

    private static final String ENTITY_NAME = "itemGroup";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemGroupRepository itemGroupRepository;

    public ItemGroupResource(ItemGroupRepository itemGroupRepository) {
        this.itemGroupRepository = itemGroupRepository;
    }

    /**
     * {@code POST  /item-groups} : Create a new itemGroup.
     *
     * @param itemGroup the itemGroup to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemGroup, or with status {@code 400 (Bad Request)} if the itemGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-groups")
    public ResponseEntity<ItemGroup> createItemGroup(@Valid @RequestBody ItemGroup itemGroup) throws URISyntaxException {
        log.debug("REST request to save ItemGroup : {}", itemGroup);
        if (itemGroup.getId() != null) {
            throw new BadRequestAlertException("A new itemGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemGroup result = itemGroupRepository.save(itemGroup);
        return ResponseEntity.created(new URI("/api/item-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-groups} : Updates an existing itemGroup.
     *
     * @param itemGroup the itemGroup to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemGroup,
     * or with status {@code 400 (Bad Request)} if the itemGroup is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemGroup couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-groups")
    public ResponseEntity<ItemGroup> updateItemGroup(@Valid @RequestBody ItemGroup itemGroup) throws URISyntaxException {
        log.debug("REST request to update ItemGroup : {}", itemGroup);
        if (itemGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemGroup result = itemGroupRepository.save(itemGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, itemGroup.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-groups} : get all the itemGroups.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemGroups in body.
     */
    @GetMapping("/item-groups")
    public List<ItemGroup> getAllItemGroups() {
        log.debug("REST request to get all ItemGroups");
        return itemGroupRepository.findAll();
    }

    /**
     * {@code GET  /item-groups/:id} : get the "id" itemGroup.
     *
     * @param id the id of the itemGroup to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemGroup, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-groups/{id}")
    public ResponseEntity<ItemGroup> getItemGroup(@PathVariable Long id) {
        log.debug("REST request to get ItemGroup : {}", id);
        Optional<ItemGroup> itemGroup = itemGroupRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemGroup);
    }

    /**
     * {@code DELETE  /item-groups/:id} : delete the "id" itemGroup.
     *
     * @param id the id of the itemGroup to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-groups/{id}")
    public ResponseEntity<Void> deleteItemGroup(@PathVariable Long id) {
        log.debug("REST request to delete ItemGroup : {}", id);
        itemGroupRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
