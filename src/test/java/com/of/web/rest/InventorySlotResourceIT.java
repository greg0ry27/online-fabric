package com.of.web.rest;

import com.of.OnlineFabricApp;
import com.of.domain.InventorySlot;
import com.of.repository.InventorySlotRepository;
import com.of.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.of.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link InventorySlotResource} REST controller.
 */
@SpringBootTest(classes = OnlineFabricApp.class)
public class InventorySlotResourceIT {

    private static final Integer DEFAULT_SLOT = 0;
    private static final Integer UPDATED_SLOT = 1;

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    @Autowired
    private InventorySlotRepository inventorySlotRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restInventorySlotMockMvc;

    private InventorySlot inventorySlot;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InventorySlotResource inventorySlotResource = new InventorySlotResource(inventorySlotRepository);
        this.restInventorySlotMockMvc = MockMvcBuilders.standaloneSetup(inventorySlotResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InventorySlot createEntity(EntityManager em) {
        InventorySlot inventorySlot = new InventorySlot()
            .slot(DEFAULT_SLOT)
            .amount(DEFAULT_AMOUNT);
        return inventorySlot;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InventorySlot createUpdatedEntity(EntityManager em) {
        InventorySlot inventorySlot = new InventorySlot()
            .slot(UPDATED_SLOT)
            .amount(UPDATED_AMOUNT);
        return inventorySlot;
    }

    @BeforeEach
    public void initTest() {
        inventorySlot = createEntity(em);
    }

    @Test
    @Transactional
    public void createInventorySlot() throws Exception {
        int databaseSizeBeforeCreate = inventorySlotRepository.findAll().size();

        // Create the InventorySlot
        restInventorySlotMockMvc.perform(post("/api/inventory-slots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventorySlot)))
            .andExpect(status().isCreated());

        // Validate the InventorySlot in the database
        List<InventorySlot> inventorySlotList = inventorySlotRepository.findAll();
        assertThat(inventorySlotList).hasSize(databaseSizeBeforeCreate + 1);
        InventorySlot testInventorySlot = inventorySlotList.get(inventorySlotList.size() - 1);
        assertThat(testInventorySlot.getSlot()).isEqualTo(DEFAULT_SLOT);
        assertThat(testInventorySlot.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createInventorySlotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inventorySlotRepository.findAll().size();

        // Create the InventorySlot with an existing ID
        inventorySlot.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInventorySlotMockMvc.perform(post("/api/inventory-slots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventorySlot)))
            .andExpect(status().isBadRequest());

        // Validate the InventorySlot in the database
        List<InventorySlot> inventorySlotList = inventorySlotRepository.findAll();
        assertThat(inventorySlotList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSlotIsRequired() throws Exception {
        int databaseSizeBeforeTest = inventorySlotRepository.findAll().size();
        // set the field null
        inventorySlot.setSlot(null);

        // Create the InventorySlot, which fails.

        restInventorySlotMockMvc.perform(post("/api/inventory-slots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventorySlot)))
            .andExpect(status().isBadRequest());

        List<InventorySlot> inventorySlotList = inventorySlotRepository.findAll();
        assertThat(inventorySlotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = inventorySlotRepository.findAll().size();
        // set the field null
        inventorySlot.setAmount(null);

        // Create the InventorySlot, which fails.

        restInventorySlotMockMvc.perform(post("/api/inventory-slots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventorySlot)))
            .andExpect(status().isBadRequest());

        List<InventorySlot> inventorySlotList = inventorySlotRepository.findAll();
        assertThat(inventorySlotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInventorySlots() throws Exception {
        // Initialize the database
        inventorySlotRepository.saveAndFlush(inventorySlot);

        // Get all the inventorySlotList
        restInventorySlotMockMvc.perform(get("/api/inventory-slots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inventorySlot.getId().intValue())))
            .andExpect(jsonPath("$.[*].slot").value(hasItem(DEFAULT_SLOT)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)));
    }
    
    @Test
    @Transactional
    public void getInventorySlot() throws Exception {
        // Initialize the database
        inventorySlotRepository.saveAndFlush(inventorySlot);

        // Get the inventorySlot
        restInventorySlotMockMvc.perform(get("/api/inventory-slots/{id}", inventorySlot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(inventorySlot.getId().intValue()))
            .andExpect(jsonPath("$.slot").value(DEFAULT_SLOT))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT));
    }

    @Test
    @Transactional
    public void getNonExistingInventorySlot() throws Exception {
        // Get the inventorySlot
        restInventorySlotMockMvc.perform(get("/api/inventory-slots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInventorySlot() throws Exception {
        // Initialize the database
        inventorySlotRepository.saveAndFlush(inventorySlot);

        int databaseSizeBeforeUpdate = inventorySlotRepository.findAll().size();

        // Update the inventorySlot
        InventorySlot updatedInventorySlot = inventorySlotRepository.findById(inventorySlot.getId()).get();
        // Disconnect from session so that the updates on updatedInventorySlot are not directly saved in db
        em.detach(updatedInventorySlot);
        updatedInventorySlot
            .slot(UPDATED_SLOT)
            .amount(UPDATED_AMOUNT);

        restInventorySlotMockMvc.perform(put("/api/inventory-slots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInventorySlot)))
            .andExpect(status().isOk());

        // Validate the InventorySlot in the database
        List<InventorySlot> inventorySlotList = inventorySlotRepository.findAll();
        assertThat(inventorySlotList).hasSize(databaseSizeBeforeUpdate);
        InventorySlot testInventorySlot = inventorySlotList.get(inventorySlotList.size() - 1);
        assertThat(testInventorySlot.getSlot()).isEqualTo(UPDATED_SLOT);
        assertThat(testInventorySlot.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingInventorySlot() throws Exception {
        int databaseSizeBeforeUpdate = inventorySlotRepository.findAll().size();

        // Create the InventorySlot

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInventorySlotMockMvc.perform(put("/api/inventory-slots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventorySlot)))
            .andExpect(status().isBadRequest());

        // Validate the InventorySlot in the database
        List<InventorySlot> inventorySlotList = inventorySlotRepository.findAll();
        assertThat(inventorySlotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInventorySlot() throws Exception {
        // Initialize the database
        inventorySlotRepository.saveAndFlush(inventorySlot);

        int databaseSizeBeforeDelete = inventorySlotRepository.findAll().size();

        // Delete the inventorySlot
        restInventorySlotMockMvc.perform(delete("/api/inventory-slots/{id}", inventorySlot.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InventorySlot> inventorySlotList = inventorySlotRepository.findAll();
        assertThat(inventorySlotList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InventorySlot.class);
        InventorySlot inventorySlot1 = new InventorySlot();
        inventorySlot1.setId(1L);
        InventorySlot inventorySlot2 = new InventorySlot();
        inventorySlot2.setId(inventorySlot1.getId());
        assertThat(inventorySlot1).isEqualTo(inventorySlot2);
        inventorySlot2.setId(2L);
        assertThat(inventorySlot1).isNotEqualTo(inventorySlot2);
        inventorySlot1.setId(null);
        assertThat(inventorySlot1).isNotEqualTo(inventorySlot2);
    }
}
